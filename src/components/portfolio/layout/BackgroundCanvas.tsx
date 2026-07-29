import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Constellation Plexus Graph representing software systems & nodes
const PlexusNetwork: React.FC<{ count: number }> = ({ count = 65 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();

  // Create randomized particle data
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
      });
    }
    return data;
  }, [count]);

  // Buffer arrays
  const pointsPositions = useMemo(() => new Float32Array(count * 3), [count]);
  
  // Max possible line connections: count * (count - 1) / 2
  // We allocate buffer for up to 600 lines (1200 vertices)
  const maxLineVertices = 1200;
  const linePositions = useMemo(() => new Float32Array(maxLineVertices * 3), []);
  const lineColors = useMemo(() => new Float32Array(maxLineVertices * 3), []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    // Read the scroll position from window if available
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const maxScroll = typeof window !== 'undefined' ? document.body.scrollHeight - window.innerHeight : 1;
    const scrollPercent = scrollY / (maxScroll || 1);

    const time = state.clock.getElapsedTime();
    const scrollOffset = scrollPercent * (viewport.height * 0.8);

    // Apply interactive mouse tracking & scroll movement
    const mouseX = state.mouse.x * 1.5;
    const mouseY = state.mouse.y * 1.5;

    // Gentle global rotations
    const rotY = time * 0.02 + scrollPercent * 0.4;
    const rotX = time * 0.01;

    pointsRef.current.rotation.y = rotY;
    pointsRef.current.rotation.x = rotX;
    linesRef.current.rotation.y = rotY;
    linesRef.current.rotation.x = rotX;

    // Parallax on translation
    const targetY = -scrollOffset;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.08;
    linesRef.current.position.y += (targetY - linesRef.current.position.y) * 0.08;

    // Mouse parallax tracking
    pointsRef.current.position.x += (mouseX - pointsRef.current.position.x) * 0.03;
    linesRef.current.position.x += (mouseX - linesRef.current.position.x) * 0.03;

    // Update positions and bounce particles inside boundaries
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.position.add(p.velocity);

      // Boundary check
      if (Math.abs(p.position.x) > 9) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > 7) p.velocity.y *= -1;
      if (Math.abs(p.position.z) > 5) p.velocity.z *= -1;

      pointsPositions[i * 3] = p.position.x;
      pointsPositions[i * 3 + 1] = p.position.y;
      pointsPositions[i * 3 + 2] = p.position.z;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Calculate dynamic connections
    let vertexCount = 0;
    const connectionThreshold = 2.4;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = particles[i].position.distanceTo(particles[j].position);
        
        if (dist < connectionThreshold && vertexCount < maxLineVertices - 2) {
          // Fade color opacity as points get farther apart
          const opacity = 1.0 - (dist / connectionThreshold);
          
          // Indigo tone color components
          const r = 0.5 * opacity; // 129 in hex
          const g = 0.55 * opacity; // 140 in hex
          const b = 0.97 * opacity; // 248 in hex

          // Write point 1
          linePositions[vertexCount * 3] = particles[i].position.x;
          linePositions[vertexCount * 3 + 1] = particles[i].position.y;
          linePositions[vertexCount * 3 + 2] = particles[i].position.z;

          lineColors[vertexCount * 3] = r;
          lineColors[vertexCount * 3 + 1] = g;
          lineColors[vertexCount * 3 + 2] = b;

          // Write point 2
          linePositions[(vertexCount + 1) * 3] = particles[j].position.x;
          linePositions[(vertexCount + 1) * 3 + 1] = particles[j].position.y;
          linePositions[(vertexCount + 1) * 3 + 2] = particles[j].position.z;

          lineColors[(vertexCount + 1) * 3] = r;
          lineColors[(vertexCount + 1) * 3 + 1] = g;
          lineColors[(vertexCount + 1) * 3 + 2] = b;

          vertexCount += 2;
        }
      }
    }

    // Zero out unused coordinates in buffer to hide leftover segments
    for (let i = vertexCount * 3; i < linePositions.length; i++) {
      linePositions[i] = 0;
      lineColors[i] = 0;
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <group>
      {/* Node Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#818cf8"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Connection Lines (dynamic gradient plexus network) */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

export const BackgroundCanvas: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof window === 'undefined') return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-bg-primary transition-colors duration-300">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient & dynamic lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[-10, 5, -5]} intensity={1.5} color="#6366f1" />
        <pointLight position={[10, -5, 5]} intensity={1.5} color="#a855f7" />

        {/* 3D Plexus Constellation */}
        <PlexusNetwork count={70} />
      </Canvas>
    </div>
  );
};

export default BackgroundCanvas;
