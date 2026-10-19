import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  temperature: number;
  activeMode: 'cool' | 'eco' | 'turbo';
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ temperature, activeMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    temperature,
    activeMode,
    targetRotationY: 0,
    targetRotationX: 0,
    currentRotationY: 0,
    currentRotationX: 0,
    isVisible: true,
  });

  // Keep state updated without re-creating scene
  useEffect(() => {
    stateRef.current.temperature = temperature;
    stateRef.current.activeMode = activeMode;
  }, [temperature, activeMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070b, 0.045);

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 80);
    camera.position.set(0, 0.25, 4.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Disable MSAA on mobile for instant FPS
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Only enable expensive shadow maps on desktop
    if (!isMobile) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    container.appendChild(renderer.domElement);

    // ROOT AC GROUP
    const acGroup = new THREE.Group();
    scene.add(acGroup);

    // MATERIALS
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xeeeeee,
      roughness: 0.28,
      metalness: 0.08,
      clearcoat: isMobile ? 0 : 0.35,
    });

    const frontPanelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfafcff,
      roughness: 0.16,
      metalness: 0.05,
      clearcoat: isMobile ? 0 : 0.8,
    });

    const trimMaterial = new THREE.MeshStandardMaterial({
      color: 0x078bd0,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x078bd0,
      emissiveIntensity: 0.25,
    });

    const ventInteriorMaterial = new THREE.MeshBasicMaterial({ color: 0x08101a });
    const flapMaterial = new THREE.MeshStandardMaterial({ color: 0xdde4ec, metalness: 0.2, roughness: 0.3 });

    // 1. CASING
    const casingGeo = new THREE.BoxGeometry(2.3, 0.72, 0.52);
    const casingMesh = new THREE.Mesh(casingGeo, bodyMaterial);
    if (!isMobile) casingMesh.castShadow = true;
    acGroup.add(casingMesh);

    // 2. FRONT PANEL
    const panelGeo = new THREE.BoxGeometry(2.26, 0.68, 0.06);
    const panelMesh = new THREE.Mesh(panelGeo, frontPanelMaterial);
    panelMesh.position.set(0, 0.01, 0.27);
    acGroup.add(panelMesh);

    // 3. ELECTRIC BLUE TRIM LINE
    const trimGeo = new THREE.BoxGeometry(2.28, 0.015, 0.02);
    const trimMesh = new THREE.Mesh(trimGeo, trimMaterial);
    trimMesh.position.set(0, -0.26, 0.29);
    acGroup.add(trimMesh);

    // 4. TOP GRILLE SLATS
    const grilleGroup = new THREE.Group();
    const slatMat = new THREE.MeshBasicMaterial({ color: 0x162232 });
    const slatGeo = new THREE.BoxGeometry(2.1, 0.01, 0.32);
    for (let i = 0; i < (isMobile ? 4 : 7); i++) {
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.set(0, 0.36, -0.15 + i * 0.05);
      grilleGroup.add(slat);
    }
    acGroup.add(grilleGroup);

    // 5. LOWER VENT & LOUVER
    const ventVoidGeo = new THREE.BoxGeometry(2.1, 0.14, 0.18);
    const ventVoid = new THREE.Mesh(ventVoidGeo, ventInteriorMaterial);
    ventVoid.position.set(0, -0.3, 0.2);
    acGroup.add(ventVoid);

    const flapGeo = new THREE.BoxGeometry(2.08, 0.025, 0.15);
    const flapMesh = new THREE.Mesh(flapGeo, flapMaterial);
    flapMesh.position.set(0, -0.32, 0.24);
    flapMesh.rotation.x = 0.35;
    acGroup.add(flapMesh);

    // 6. LED DISPLAY TEXTURE
    const displayCanvas = document.createElement('canvas');
    displayCanvas.width = 256;
    displayCanvas.height = 128;
    const displayCtx = displayCanvas.getContext('2d');

    const updateDisplay = (temp: number, mode: string) => {
      if (!displayCtx) return;
      displayCtx.fillStyle = '#050a12';
      displayCtx.fillRect(0, 0, 256, 128);

      displayCtx.strokeStyle = 'rgba(7, 139, 208, 0.5)';
      displayCtx.lineWidth = 4;
      displayCtx.strokeRect(4, 4, 248, 120);

      displayCtx.shadowColor = '#19b8ff';
      displayCtx.shadowBlur = 10;

      displayCtx.fillStyle = '#078bd0';
      displayCtx.font = 'bold 20px monospace';
      displayCtx.textAlign = 'left';
      displayCtx.fillText(mode.toUpperCase(), 24, 38);

      displayCtx.fillStyle = '#ffffff';
      displayCtx.font = 'bold 64px sans-serif';
      displayCtx.textAlign = 'center';
      displayCtx.fillText(`${temp}°C`, 128, 96);
    };

    updateDisplay(stateRef.current.temperature, stateRef.current.activeMode);

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

    // 7. TERMAC CIRCLE EMBLEM BADGE
    const badgeGeo = new THREE.CircleGeometry(0.045, 24);
    const badgeMat = new THREE.MeshStandardMaterial({
      color: 0x078bd0,
      emissive: 0x078bd0,
      emissiveIntensity: 0.3,
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(-0.9, -0.15, 0.302);
    acGroup.add(badgeMesh);

    // 8. AIRFLOW PARTICLES (Optimized count for mobile)
    const particleCount = isMobile ? 80 : 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const streamIds = new Float32Array(particleCount);
    const streamXCenters = [-0.75, -0.25, 0.25, 0.75];

    for (let i = 0; i < particleCount; i++) {
      const streamIdx = i % 4;
      positions[i * 3] = streamXCenters[streamIdx] + (Math.random() - 0.5) * 0.12;
      positions[i * 3 + 1] = -0.35 - Math.random() * 1.5;
      positions[i * 3 + 2] = 0.28 + Math.random() * 0.3;

      velocities[i * 3 + 1] = -0.012 - Math.random() * 0.015;
      velocities[i * 3 + 2] = 0.004 + Math.random() * 0.008;
      streamIds[i] = streamIdx;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pCtx = particleCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(25, 184, 255, 1)');
      grad.addColorStop(0.35, 'rgba(7, 139, 208, 0.7)');
      grad.addColorStop(1, 'rgba(5, 7, 11, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.09 : 0.08,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    acGroup.add(particles);

    // 9. LIGHTS
    const blueKeyLight = new THREE.PointLight(0x078bd0, 3.8, 8);
    blueKeyLight.position.set(0, -1.2, 1.8);
    scene.add(blueKeyLight);

    const cyanRimLight = new THREE.PointLight(0x19b8ff, 2.6, 7);
    cyanRimLight.position.set(2, 1.5, 1.2);
    scene.add(cyanRimLight);

    const overheadLight = new THREE.DirectionalLight(0xffffff, 1.3);
    overheadLight.position.set(-1, 3, 2);
    scene.add(overheadLight);

    const ambientLight = new THREE.AmbientLight(0x0b1726, 1.8);
    scene.add(ambientLight);

    // MOUSE & TOUCH TRACKING
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.targetRotationY = x * 0.28;
      stateRef.current.targetRotationX = -y * 0.16;
    };
    container.addEventListener('mousemove', onPointerMove);

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        stateRef.current.targetRotationY = x * 0.2;
        stateRef.current.targetRotationX = -y * 0.1;
      }
    };
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    // INTERSECTION OBSERVER: Pause rendering when scrolled out of view!
    // This is a huge mobile performance boost.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          stateRef.current.isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

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
    const clock = new THREE.Clock();
    let lastRenderedTemp = stateRef.current.temperature;
    let lastRenderedMode = stateRef.current.activeMode;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip render calculations if out of screen view!
      if (!stateRef.current.isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const state = stateRef.current;

      if (lastRenderedTemp !== state.temperature || lastRenderedMode !== state.activeMode) {
        updateDisplay(state.temperature, state.activeMode);
        displayTexture.needsUpdate = true;
        lastRenderedTemp = state.temperature;
        lastRenderedMode = state.activeMode;
      }

      state.currentRotationY += (state.targetRotationY - state.currentRotationY) * 0.05;
      state.currentRotationX += (state.targetRotationX - state.currentRotationX) * 0.05;

      acGroup.rotation.y = state.currentRotationY + Math.sin(elapsedTime * 0.6) * 0.03;
      acGroup.rotation.x = state.currentRotationX + Math.cos(elapsedTime * 0.8) * 0.015;
      acGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.03;

      flapMesh.rotation.x = 0.35 + Math.sin(elapsedTime * 1.5) * 0.05;

      // Particle update
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const speedMultiplier = state.activeMode === 'turbo' ? 1.5 : state.activeMode === 'eco' ? 0.8 : 1.0;

      for (let i = 0; i < particleCount; i++) {
        const streamIdx = streamIds[i];
        posArray[i * 3 + 1] += velocities[i * 3 + 1] * speedMultiplier;
        posArray[i * 3 + 2] += velocities[i * 3 + 2] * speedMultiplier;

        if (streamIdx === 0) {
          posArray[i * 3] -= 0.003 * speedMultiplier;
        } else if (streamIdx === 3) {
          posArray[i * 3] += 0.003 * speedMultiplier;
        }

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

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
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
      slatGeo.dispose();
      ventVoidGeo.dispose();
      flapGeo.dispose();
      displayGeo.dispose();
      badgeGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      bodyMaterial.dispose();
      frontPanelMaterial.dispose();
      trimMaterial.dispose();
      ventInteriorMaterial.dispose();
      flapMaterial.dispose();
      displayMaterial.dispose();
      badgeMat.dispose();
      slatMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};
export default ThreeCanvas;
