import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

/**
 * MTMAP-FO Futuristic Morocco Map Background
 * A high-performance WebGL scene using Three.js
 */
const ThreeMapBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Configuration ---
    const COLORS = {
      bg: 0x0B0B0F,
      fiber: 0xE10600,
      node: 0xFF1A1A,
      pulse: 0xFFFFFF,
      map: 0x15151A
    };

    const CITIES = [
      { name: 'Casablanca', pos: [0.2, 0.65, 0], size: 0.15, brightness: 1.5 },
      { name: 'Rabat', pos: [0.3, 0.75, 0], size: 0.1, brightness: 1.0 },
      { name: 'Tangier', pos: [0.5, 0.9, 0], size: 0.1, brightness: 1.0 },
      { name: 'Marrakech', pos: [0.1, 0.45, 0], size: 0.12, brightness: 1.2 },
      { name: 'Fes', pos: [0.6, 0.7, 0], size: 0.1, brightness: 1.0 },
      { name: 'Agadir', pos: [-0.1, 0.2, 0], size: 0.1, brightness: 1.0 },
      { name: 'Laayoune', pos: [-0.5, -0.3, 0], size: 0.08, brightness: 0.8 },
      { name: 'Dakhla', pos: [-0.8, -0.7, 0], size: 0.08, brightness: 0.8 }
    ];

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.bg);
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -2, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    containerRef.current.appendChild(renderer.domElement);

    // --- Post Processing (Bloom) ---
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // strength
      0.4, // radius
      0.85 // threshold
    );
    
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // --- Morocco Shape ---
    // Simplified Morocco border coordinates
    const moroccoShape = new THREE.Shape();
    moroccoShape.moveTo(0.6, 1.0);
    moroccoShape.lineTo(0.8, 0.9);
    moroccoShape.lineTo(1.0, 0.7);
    moroccoShape.lineTo(0.9, 0.5);
    moroccoShape.lineTo(0.7, 0.3);
    moroccoShape.lineTo(0.4, 0.1);
    moroccoShape.lineTo(0.1, -0.2);
    moroccoShape.lineTo(-0.3, -0.5);
    moroccoShape.lineTo(-0.8, -0.9);
    moroccoShape.lineTo(-1.2, -1.2);
    moroccoShape.lineTo(-1.5, -1.0);
    moroccoShape.lineTo(-1.3, -0.6);
    moroccoShape.lineTo(-1.0, -0.2);
    moroccoShape.lineTo(-0.6, 0.2);
    moroccoShape.lineTo(-0.3, 0.5);
    moroccoShape.lineTo(0.1, 0.8);
    moroccoShape.lineTo(0.4, 1.1);
    moroccoShape.closePath();

    const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05 };
    const geometry = new THREE.ExtrudeGeometry(moroccoShape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({ 
      color: COLORS.map, 
      shininess: 100, 
      specular: 0x222222,
      transparent: true,
      opacity: 0.9
    });
    const mapMesh = new THREE.Mesh(geometry, material);
    mapMesh.rotation.x = -Math.PI * 0.1; // Slight tilt
    mapMesh.scale.set(4, 4, 4);
    scene.add(mapMesh);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(COLORS.fiber, 5, 50);
    pointLight.position.set(0, 5, 10);
    scene.add(pointLight);

    // --- City Nodes & Fiber Lines ---
    const nodeGroup = new THREE.Group();
    const fiberGroup = new THREE.Group();
    const pulseGroup = new THREE.Group();
    scene.add(nodeGroup, fiberGroup, pulseGroup);

    const cityMeshes = [];
    const fiberCurves = [];

    // Shared node geometry and material
    const nodeGeo = new THREE.SphereGeometry(1, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: COLORS.node });

    CITIES.forEach(city => {
      // Node
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      const baseScale = city.size * 0.5;
      nodeMesh.scale.set(baseScale, baseScale, baseScale);
      
      const worldPos = new THREE.Vector3(city.pos[0] * 4, city.pos[1] * 4, 0.2);
      nodeMesh.position.copy(worldPos);
      nodeGroup.add(nodeMesh);
      cityMeshes.push({ mesh: nodeMesh, baseScale, brightness: city.brightness });

      // Connections to Casablanca (Main Hub)
      if (city.name !== 'Casablanca') {
        const casa = CITIES.find(c => c.name === 'Casablanca');
        const start = new THREE.Vector3(city.pos[0] * 4, city.pos[1] * 4, 0.2);
        const end = new THREE.Vector3(casa.pos[0] * 4, casa.pos[1] * 4, 0.2);
        
        // Quadratic Bezier for natural curve
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        mid.z += 1.5; // Curve outwards
        
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(50);
        const fiberGeo = new THREE.BufferGeometry().setFromPoints(points);
        const fiberMat = new THREE.LineBasicMaterial({ color: COLORS.fiber, transparent: true, opacity: 0.4 });
        const fiberLine = new THREE.Line(fiberGeo, fiberMat);
        fiberGroup.add(fiberLine);
        fiberCurves.push({ curve, speed: 0.005 + Math.random() * 0.005 });
      }
    });

    // --- Data Pulses ---
    const pulses = [];
    const pulseGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    fiberCurves.forEach(fiber => {
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseGroup.add(pulseMesh);
      pulses.push({ mesh: pulseMesh, curve: fiber.curve, progress: Math.random(), speed: fiber.speed });
    });

    // --- Particle Field ---
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 40;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({ size: 0.02, color: 0x888888, transparent: true, opacity: 0.5 });
    const particleField = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleField);

    // --- Animation Loop ---
    let time = 0;
    const animate = () => {
      time += 0.01;
      animationFrameId = requestAnimationFrame(animate);

      // Camera Breathing
      camera.position.x = Math.sin(time * 0.5) * 0.5;
      camera.position.y = -2 + Math.cos(time * 0.3) * 0.3;
      camera.lookAt(0, 0, 0);

      // Node Pulsing
      cityMeshes.forEach(city => {
        const pulse = city.baseScale * (1 + Math.sin(time * 3) * 0.1 * city.brightness);
        city.mesh.scale.set(pulse, pulse, pulse);
      });

      // Data Pulses Movement
      pulses.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const pos = p.curve.getPointAt(p.progress);
        p.mesh.position.copy(pos);
      });

      // Particle Field Rotation
      particleField.rotation.y += 0.0005;

      composer.render();
    };

    let animationFrameId = requestAnimationFrame(animate);

    // --- Resize Handling ---
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      // Dispose geometries and materials
      geometry.dispose();
      material.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      
      fiberGroup.children.forEach(child => {
        child.geometry.dispose();
        child.material.dispose();
      });

      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ background: '#0B0B0F' }}
    />
  );
};

export default ThreeMapBackground;
