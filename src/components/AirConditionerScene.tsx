import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Thermometer, Wind, Zap, Shield, RotateCcw } from 'lucide-react';

interface AirConditionerSceneProps {
  className?: string;
  onTempChange?: (temp: number) => void;
}

export const AirConditionerScene: React.FC<AirConditionerSceneProps> = ({
  className = '',
  onTempChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [temperature, setTemperature] = useState<number>(21);
  const [activeMode, setActiveMode] = useState<'cool' | 'eco' | 'turbo'>('cool');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // References to communicate with Three.js animation loop without re-instantiating
  const sceneStateRef = useRef({
    temperature: 21,
    mode: 'cool',
    targetRotationY: 0,
    targetRotationX: 0,
    currentRotationY: 0,
    currentRotationX: 0,
    mousePos: { x: 0, y: 0 },
    isInteracting: false,
  });

  const handleTempAdjust = (delta: number) => {
    setTemperature((prev) => {
      const next = Math.min(28, Math.max(16, prev + delta));
      sceneStateRef.current.temperature = next;
      if (onTempChange) onTempChange(next);
      return next;
    });
  };

  const handleModeChange = (mode: 'cool' | 'eco' | 'turbo') => {
    setActiveMode(mode);
    sceneStateRef.current.mode = mode;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070b, 0.045);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 4.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // ROOT GROUP FOR AC UNIT
    const acGroup = new THREE.Group();
    scene.add(acGroup);

    // MATERIALS
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xeeeeee,
      roughness: 0.25,
      metalness: 0.08,
      clearcoat: 0.35,
      clearcoatRoughness: 0.15,
    });

    const frontPanelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfafcff,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });

    const trimMaterial = new THREE.MeshStandardMaterial({
      color: 0x078bd0,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x078bd0,
      emissiveIntensity: 0.2,
    });

    const ventInteriorMaterial = new THREE.MeshBasicMaterial({
      color: 0x08101a,
    });

    const flapMaterial = new THREE.MeshStandardMaterial({
      color: 0xdde4ec,
      metalness: 0.15,
      roughness: 0.3,
    });

    // 1. MAIN CASING (Split Indoor Unit Body)
    // Scaled dimensions approx 2.4 width x 0.75 height x 0.55 depth
    const casingGeo = new THREE.BoxGeometry(2.3, 0.72, 0.52);
    const casingMesh = new THREE.Mesh(casingGeo, bodyMaterial);
    casingMesh.castShadow = true;
    casingMesh.receiveShadow = true;
    acGroup.add(casingMesh);

    // 2. FRONT BEVELED PANEL
    const panelGeo = new THREE.BoxGeometry(2.26, 0.68, 0.06);
    const panelMesh = new THREE.Mesh(panelGeo, frontPanelMaterial);
    panelMesh.position.set(0, 0.01, 0.27);
    panelMesh.castShadow = true;
    acGroup.add(panelMesh);

    // 3. ELECTRIC BLUE ACCENT TRIM LINE (Termac brand accent)
    const trimGeo = new THREE.BoxGeometry(2.28, 0.015, 0.02);
    const trimMesh = new THREE.Mesh(trimGeo, trimMaterial);
    trimMesh.position.set(0, -0.26, 0.29);
    acGroup.add(trimMesh);

    // 4. TOP INTAKE GRILLE (Subtle horizontal ridges)
    const grilleGroup = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const slatGeo = new THREE.BoxGeometry(2.1, 0.01, 0.32);
      const slatMat = new THREE.MeshStandardMaterial({
        color: 0x162232,
        roughness: 0.5,
      });
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.set(0, 0.36, -0.15 + i * 0.05);
      grilleGroup.add(slat);
    }
    acGroup.add(grilleGroup);

    // 5. LOWER AIR DISCHARGE CAVITY & ADJUSTABLE FLAP / LOUVER
    const ventVoidGeo = new THREE.BoxGeometry(2.1, 0.14, 0.18);
    const ventVoid = new THREE.Mesh(ventVoidGeo, ventInteriorMaterial);
    ventVoid.position.set(0, -0.3, 0.2);
    acGroup.add(ventVoid);

    // Louver / Flap that can articulate
    const flapGeo = new THREE.BoxGeometry(2.08, 0.025, 0.15);
    const flapMesh = new THREE.Mesh(flapGeo, flapMaterial);
    flapMesh.position.set(0, -0.32, 0.24);
    flapMesh.rotation.x = 0.35; // Open angle
    acGroup.add(flapMesh);

    // 6. EMBEDDED LED DISPLAY (Canvas Texture for real-time temperature readout)
    const displayCanvas = document.createElement('canvas');
    displayCanvas.width = 256;
    displayCanvas.height = 128;
    const displayCtx = displayCanvas.getContext('2d');

    const updateDisplayTexture = (temp: number, mode: string) => {
      if (!displayCtx) return;
      displayCtx.fillStyle = '#050a12';
      displayCtx.fillRect(0, 0, 256, 128);

      // Subtle cyan border
      displayCtx.strokeStyle = 'rgba(7, 139, 208, 0.4)';
      displayCtx.lineWidth = 4;
      displayCtx.strokeRect(4, 4, 248, 120);

      // Glow effect
      displayCtx.shadowColor = '#19b8ff';
      displayCtx.shadowBlur = 12;

      // Mode label
      displayCtx.fillStyle = '#078bd0';
      displayCtx.font = 'bold 20px monospace';
      displayCtx.textAlign = 'left';
      displayCtx.fillText(mode.toUpperCase(), 24, 38);

      // Temperature number
      displayCtx.fillStyle = '#ffffff';
      displayCtx.font = 'bold 64px sans-serif';
      displayCtx.textAlign = 'center';
      displayCtx.fillText(`${temp}°C`, 128, 96);
    };

    updateDisplayTexture(sceneStateRef.current.temperature, sceneStateRef.current.mode);

    const displayTexture = new THREE.CanvasTexture(displayCanvas);
    const displayMaterial = new THREE.MeshBasicMaterial({
      map: displayTexture,
      transparent: true,
      opacity: 0.95,
    });
    const displayGeo = new THREE.PlaneGeometry(0.32, 0.16);
    const displayMesh = new THREE.Mesh(displayGeo, displayMaterial);
    displayMesh.position.set(0.74, 0.05, 0.302);
    acGroup.add(displayMesh);

    // 7. TERMAC CIRCULAR BADGE ON FRONT (Minimal subtle branding on machine)
    const badgeGeo = new THREE.CircleGeometry(0.045, 32);
    const badgeMat = new THREE.MeshStandardMaterial({
      color: 0x078bd0,
      metalness: 0.5,
      roughness: 0.2,
      emissive: 0x078bd0,
      emissiveIntensity: 0.3,
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(-0.9, -0.15, 0.302);
    acGroup.add(badgeMesh);

    // 8. FLOWING AIR PARTICLES (4 streams matching Termac logo motif)
    // Stream 1 (outer left), Stream 2 (mid left), Stream 3 (mid right), Stream 4 (outer right)
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const alphas = new Float32Array(particleCount);
    const streamIds = new Float32Array(particleCount);

    const streamXCenters = [-0.75, -0.25, 0.25, 0.75];

    for (let i = 0; i < particleCount; i++) {
      const streamIndex = i % 4;
      const baseX = streamXCenters[streamIndex] + (Math.random() - 0.5) * 0.12;
      const baseY = -0.35 - Math.random() * 1.5;
      const baseZ = 0.28 + Math.random() * 0.3;

      positions[i * 3] = baseX;
      positions[i * 3 + 1] = baseY;
      positions[i * 3 + 2] = baseZ;

      velocities[i * 3] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = -0.012 - Math.random() * 0.015;
      velocities[i * 3 + 2] = 0.004 + Math.random() * 0.008;

      alphas[i] = Math.random();
      streamIds[i] = streamIndex;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom Particle Texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const pCtx = particleCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(25, 184, 255, 1)');
      grad.addColorStop(0.3, 'rgba(7, 139, 208, 0.7)');
      grad.addColorStop(1, 'rgba(5, 7, 11, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    acGroup.add(particles);

    // 9. LIGHTING
    // Key Blue Spot/Point Light
    const blueKeyLight = new THREE.PointLight(0x078bd0, 4.5, 8);
    blueKeyLight.position.set(0, -1.2, 1.8);
    scene.add(blueKeyLight);

    // Electric Cyan Rim Light
    const cyanRimLight = new THREE.PointLight(0x19b8ff, 3.2, 7);
    cyanRimLight.position.set(2, 1.5, 1.2);
    scene.add(cyanRimLight);

    // Soft Studio Overhead Light
    const overheadLight = new THREE.DirectionalLight(0xffffff, 1.4);
    overheadLight.position.set(-1, 3, 2);
    overheadLight.castShadow = true;
    scene.add(overheadLight);

    // Ambient Cool Fill
    const ambientLight = new THREE.AmbientLight(0x0b1726, 1.8);
    scene.add(ambientLight);

    // Backstage subtle glow
    const backGlow = new THREE.PointLight(0x078bd0, 2.0, 5);
    backGlow.position.set(0, 0, -0.6);
    scene.add(backGlow);

    // MOUSE / TOUCH INTERACTION HANDLERS
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      sceneStateRef.current.mousePos = { x, y };
      sceneStateRef.current.targetRotationY = x * 0.28;
      sceneStateRef.current.targetRotationX = -y * 0.16;
    };

    container.addEventListener('mousemove', onPointerMove);

    // TOUCH HANDLER FOR MOBILE
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        sceneStateRef.current.targetRotationY = x * 0.22;
        sceneStateRef.current.targetRotationX = -y * 0.12;
      }
    };
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let lastRenderedTemp = sceneStateRef.current.temperature;
    let lastRenderedMode = sceneStateRef.current.mode;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const state = sceneStateRef.current;

      // Check if temperature or mode was updated via UI
      if (lastRenderedTemp !== state.temperature || lastRenderedMode !== state.mode) {
        updateDisplayTexture(state.temperature, state.mode);
        displayTexture.needsUpdate = true;
        lastRenderedTemp = state.temperature;
        lastRenderedMode = state.mode;

        // Dynamic light adjustment
        if (state.mode === 'turbo') {
          blueKeyLight.intensity = 6.0;
          particleMat.size = 0.1;
        } else if (state.mode === 'eco') {
          blueKeyLight.intensity = 3.2;
          particleMat.size = 0.065;
        } else {
          blueKeyLight.intensity = 4.5;
          particleMat.size = 0.08;
        }
      }

      // Smooth floating and rotation lerping
      state.currentRotationY += (state.targetRotationY - state.currentRotationY) * 0.05;
      state.currentRotationX += (state.targetRotationX - state.currentRotationX) * 0.05;

      acGroup.rotation.y = state.currentRotationY + Math.sin(elapsedTime * 0.6) * 0.04;
      acGroup.rotation.x = state.currentRotationX + Math.cos(elapsedTime * 0.8) * 0.02;
      acGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.04;

      // Louver gentle breathing animation
      flapMesh.rotation.x = 0.35 + Math.sin(elapsedTime * 1.5) * 0.06;

      // Update Airflow Particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      const speedMultiplier = state.mode === 'turbo' ? 1.7 : state.mode === 'eco' ? 0.75 : 1.0;

      for (let i = 0; i < particleCount; i++) {
        const streamIdx = streamIds[i];
        
        // Move downwards
        posArray[i * 3 + 1] += velocities[i * 3 + 1] * speedMultiplier;
        posArray[i * 3 + 2] += velocities[i * 3 + 2] * speedMultiplier;

        // Curve stream outward at the bottom like the Termac emblem
        if (streamIdx === 0) {
          // outer left curves to left
          posArray[i * 3] -= 0.003 * speedMultiplier;
        } else if (streamIdx === 3) {
          // outer right curves to right
          posArray[i * 3] += 0.003 * speedMultiplier;
        }

        // Reset particle when it drops below threshold
        if (posArray[i * 3 + 1] < -2.2) {
          posArray[i * 3] = streamXCenters[streamIdx] + (Math.random() - 0.5) * 0.12;
          posArray[i * 3 + 1] = -0.35;
          posArray[i * 3 + 2] = 0.28 + Math.random() * 0.1;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('touchmove', onTouchMove);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      casingGeo.dispose();
      panelGeo.dispose();
      trimGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      bodyMaterial.dispose();
      frontPanelMaterial.dispose();
      trimMaterial.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-full flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[380px] sm:h-[460px] md:h-[520px] cursor-grab active:cursor-grabbing relative z-10"
        title="Ar-Condicionado 3D Interativo Termac. Mova o cursor para inspecionar os ângulos."
      />

      {/* Atmospheric Radial Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] bg-[#078BD0]/20 rounded-full blur-[100px] pointer-events-none -z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-[#19B8FF]/25 rounded-full blur-[60px] pointer-events-none -z-0" />

      {/* Interactive HUD / Unit Controls Bar */}
      <div className="relative z-20 -mt-6 sm:-mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 p-2 sm:p-2.5 rounded-2xl bg-[#0A111C]/90 border border-[#078BD0]/30 shadow-2xl backdrop-blur-xl max-w-xl mx-auto">
        {/* Temperature adjust controls */}
        <div className="flex items-center bg-[#05070B] rounded-xl px-2 py-1 border border-[#078BD0]/20">
          <button
            onClick={() => handleTempAdjust(-1)}
            aria-label="Diminuir temperatura"
            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#19B8FF] hover:bg-[#078BD0]/20 rounded-lg transition-colors font-bold text-lg active:scale-95"
          >
            -
          </button>
          <div className="flex items-center gap-1.5 px-3 min-w-[76px] justify-center">
            <Thermometer className="w-4 h-4 text-[#19B8FF]" />
            <span className="font-mono font-bold text-white text-base">{temperature}°C</span>
          </div>
          <button
            onClick={() => handleTempAdjust(1)}
            aria-label="Aumentar temperatura"
            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#19B8FF] hover:bg-[#078BD0]/20 rounded-lg transition-colors font-bold text-lg active:scale-95"
          >
            +
          </button>
        </div>

        {/* Climate Modes */}
        <div className="flex items-center gap-1 bg-[#05070B] p-1 rounded-xl border border-[#078BD0]/20">
          <button
            onClick={() => handleModeChange('cool')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'cool'
                ? 'bg-[#078BD0] text-white shadow-[0_0_12px_rgba(7,139,208,0.5)]'
                : 'text-[#A7B4C4] hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Cool</span>
          </button>

          <button
            onClick={() => handleModeChange('eco')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'eco'
                ? 'bg-[#078BD0] text-white shadow-[0_0_12px_rgba(7,139,208,0.5)]'
                : 'text-[#A7B4C4] hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Eco</span>
          </button>

          <button
            onClick={() => handleModeChange('turbo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'turbo'
                ? 'bg-[#078BD0] text-white shadow-[0_0_12px_rgba(7,139,208,0.5)]'
                : 'text-[#A7B4C4] hover:text-white'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#19B8FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>Turbo</span>
          </button>
        </div>

        {/* Reset / Hint badge */}
        <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#A7B4C4] font-mono px-2">
          <RotateCcw className="w-3 h-3 text-[#078BD0]" />
          <span>Arraste para rotacionar</span>
        </div>
      </div>
    </div>
  );
};
