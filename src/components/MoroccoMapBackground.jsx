import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export const MoroccoMapBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0B0B0F');
    scene.fog = new THREE.FogExp2('#0B0B0F', 0.025);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-2.5, -14, 24);
    camera.lookAt(-2.5, -4.5, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 4. Post-processing (Bloom)
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.1;
    bloomPass.strength = 1.8;
    bloomPass.radius = 0.8;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Group for map and nodes
    const mapGroup = new THREE.Group();
    scene.add(mapGroup);

    // 5. Morocco Shape (Simplified Polygon)
    const shapePoints = [
      [0, 3], [2, 2.5], [4, 2], [3, 0], [1, -2], [-1, -4], [-3, -6], [-5, -7],
      [-7, -10], [-8, -12], [-9, -11], [-8, -9], [-6, -6], [-4, -4], [-2.5, -3],
      [-2, -1], [-1, 1], [-0.5, 1.5], [0, 3]
    ];

    const shape = new THREE.Shape();
    shape.moveTo(shapePoints[0][0], shapePoints[0][1]);
    for (let i = 1; i < shapePoints.length; i++) {
      shape.lineTo(shapePoints[i][0], shapePoints[i][1]);
    }

    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05
    };

    const mapGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const mapMaterial = new THREE.MeshStandardMaterial({
      color: 0x111118,
      roughness: 0.9,
      metalness: 0.1,
    });
    const mapMesh = new THREE.Mesh(mapGeometry, mapMaterial);
    mapGroup.add(mapMesh);

    // Subtle wireframe on top of map for tech feel
    const edges = new THREE.EdgesGeometry(mapGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x222233, transparent: true, opacity: 0.3 });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    mapGroup.add(wireframe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // 6. Cities & Nodes
    const CITIES = {
      Tangier: { x: 0, y: 3, isMain: false },
      Rabat: { x: -0.5, y: 1.5, isMain: false },
      Casablanca: { x: -1, y: 1, isMain: true },
      Fes: { x: 1, y: 1, isMain: false },
      Marrakech: { x: -1.5, y: -1, isMain: false },
      Agadir: { x: -2.5, y: -3, isMain: false },
      Oujda: { x: 4, y: 2, isMain: false },
      Laayoune: { x: -5, y: -7, isMain: false },
      Dakhla: { x: -7, y: -10, isMain: false }
    };

    const cityMeshes = [];
    const cityGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const mainCityGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const cityMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mainCityMat = new THREE.MeshBasicMaterial({ color: 0xff3333 });

    Object.values(CITIES).forEach(city => {
      const mesh = new THREE.Mesh(city.isMain ? mainCityGeo : cityGeo, city.isMain ? mainCityMat : cityMat);
      mesh.position.set(city.x, city.y, 0.45);
      mapGroup.add(mesh);
      cityMeshes.push({ mesh, isMain: city.isMain, baseScale: 1 });
    });

    // 7. Fiber Network Lines & Pulses
    const connections = [
      ['Casablanca', 'Rabat'],
      ['Casablanca', 'Marrakech'],
      ['Casablanca', 'Agadir'],
      ['Casablanca', 'Fes'],
      ['Casablanca', 'Tangier'],
      ['Rabat', 'Tangier'],
      ['Rabat', 'Fes'],
      ['Fes', 'Oujda'],
      ['Marrakech', 'Agadir'],
      ['Agadir', 'Laayoune'],
      ['Laayoune', 'Dakhla']
    ];

    const pulses = [];
    const fiberMat = new THREE.LineBasicMaterial({ color: 0xe10600, transparent: true, opacity: 0.3 });
    const pulseGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xff5555 });

    connections.forEach(([c1, c2]) => {
      const p1 = CITIES[c1];
      const p2 = CITIES[c2];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(p1.x, p1.y, 0.45),
        new THREE.Vector3((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, 0.45 + dist * 0.25),
        new THREE.Vector3(p2.x, p2.y, 0.45)
      );

      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, fiberMat);
      mapGroup.add(line);

      // Add pulses along the line
      const numPulses = dist > 4 ? 2 : 1;
      for (let i = 0; i < numPulses; i++) {
        const pulse = new THREE.Mesh(pulseGeo, pulseMat);
        mapGroup.add(pulse);
        pulses.push({
          mesh: pulse,
          curve: curve,
          progress: i * (1 / numPulses),
          speed: 0.0015 + Math.random() * 0.001
        });
      }
    });

    // 8. Background Particles (Subtle)
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 600;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    particlesMesh.position.z = -10;
    scene.add(particlesMesh);

    // Tilt the map slightly for better perspective
    mapGroup.rotation.x = -Math.PI / 6; // Tilt back 30 degrees

    // 9. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Camera breathing effect
      camera.position.x = -2.5 + Math.sin(elapsedTime * 0.2) * 0.5;
      camera.position.y = -14 + Math.cos(elapsedTime * 0.15) * 0.5;
      camera.lookAt(-2.5, -4.5, 0);

      // Node pulsing
      cityMeshes.forEach(({ mesh, isMain }) => {
        const scale = 1 + Math.sin(elapsedTime * 3 + mesh.position.x) * (isMain ? 0.3 : 0.2);
        mesh.scale.set(scale, scale, scale);
      });

      // Pulses moving along lines
      pulses.forEach(pulse => {
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) pulse.progress = 0;
        const point = pulse.curve.getPointAt(pulse.progress);
        pulse.mesh.position.copy(point);
      });

      // Slowly rotate background particles
      particlesMesh.rotation.y = elapsedTime * 0.02;

      composer.render();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 10. Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 11. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      mapGeometry.dispose();
      mapMaterial.dispose();
      edges.dispose();
      lineMaterial.dispose();
      cityGeo.dispose();
      mainCityGeo.dispose();
      cityMat.dispose();
      mainCityMat.dispose();
      fiberMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full z-0"
      style={{ background: '#0B0B0F' }}
    />
  );
};
