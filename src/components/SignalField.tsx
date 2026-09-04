import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type NodeData = {
  x: number;
  z: number;
  phase: number;
  intensity: number;
};

export function SignalField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      Math.max(mount.clientWidth, 1) / Math.max(mount.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 4.2, 10.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !coarsePointer,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarsePointer ? 1.1 : 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.x = -0.56;
    group.position.set(0, -0.15, 0);
    scene.add(group);

    const cols = coarsePointer ? 12 : 18;
    const rows = coarsePointer ? 6 : 8;
    const width = coarsePointer ? 12 : 15;
    const depth = coarsePointer ? 5.6 : 7.2;

    const darkPurple = new THREE.Color('#5A189A');
    const lightPurple = new THREE.Color('#C77DFF');

    const nodes: NodeData[] = [];

    for (let row = 0; row < rows; row++) {
      const rowProgress = row / Math.max(rows - 1, 1);

      for (let col = 0; col < cols; col++) {
        const colProgress = col / Math.max(cols - 1, 1);

        const x = (colProgress - 0.5) * width;
        const z = (rowProgress - 0.5) * depth;

        nodes.push({
          x,
          z,
          phase: row * 0.55 + col * 0.28,
          intensity: 0.9 + Math.sin(colProgress * Math.PI) * 0.35,
        });
      }
    }

    const pointPositions = new Float32Array(nodes.length * 3);
    const pointColors = new Float32Array(nodes.length * 3);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      pointPositions[i * 3] = node.x;
      pointPositions[i * 3 + 1] = 0;
      pointPositions[i * 3 + 2] = node.z;

      const rowIndex = Math.floor(i / cols);
      const rowProgress = rowIndex / Math.max(rows - 1, 1);
      const color = darkPurple.clone().lerp(lightPurple, 0.25 + rowProgress * 0.75);

      pointColors[i * 3] = color.r;
      pointColors[i * 3 + 1] = color.g;
      pointColors[i * 3 + 2] = color.b;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: coarsePointer ? 0.085 : 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    group.add(points);

    const connections: Array<[number, number]> = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;

        if (col < cols - 1) {
          connections.push([index, index + 1]);
        }

        if (row < rows - 1) {
          connections.push([index, index + cols]);
        }

        if (row < rows - 1 && col < cols - 1 && col % 2 === 0) {
          connections.push([index, index + cols + 1]);
        }
      }
    }

    const linePositions = new Float32Array(connections.length * 2 * 3);
    const lineColors = new Float32Array(connections.length * 2 * 3);

    for (let i = 0; i < connections.length; i++) {
      const [a, b] = connections[i];
      const aRow = Math.floor(a / cols);
      const bRow = Math.floor(b / cols);
      const mix = ((aRow + bRow) / 2) / Math.max(rows - 1, 1);
      const color = darkPurple.clone().lerp(lightPurple, 0.2 + mix * 0.7);

      lineColors[i * 6] = color.r;
      lineColors[i * 6 + 1] = color.g;
      lineColors[i * 6 + 2] = color.b;
      lineColors[i * 6 + 3] = color.r;
      lineColors[i * 6 + 4] = color.g;
      lineColors[i * 6 + 5] = color.b;
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    group.add(lines);

    const pulseGeometry = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(cols * 3);

    for (let i = 0; i < cols; i++) {
      pulsePositions[i * 3] = 0;
      pulsePositions[i * 3 + 1] = 0;
      pulsePositions[i * 3 + 2] = 0;
    }

    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));

    const pulseMaterial = new THREE.PointsMaterial({
      color: '#E8D8FF',
      size: coarsePointer ? 0.06 : 0.075,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial);
    group.add(pulsePoints);

    let pointerX = 0;
    let pointerY = 0;

    function handlePointerMove(event: PointerEvent) {
      if (coarsePointer || reducedMotion) return;

      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const pointAttr = pointsGeometry.getAttribute('position') as THREE.BufferAttribute;
    const lineAttr = linesGeometry.getAttribute('position') as THREE.BufferAttribute;
    const pulseAttr = pulseGeometry.getAttribute('position') as THREE.BufferAttribute;

    function updateNetwork(time: number) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        const radial = Math.exp(-(node.x * node.x + node.z * node.z) / 42);
        const waveA = Math.sin(node.x * 0.82 + time * 0.9 + node.phase) * 0.16 * node.intensity;
        const waveB = Math.cos(node.z * 1.2 - time * 0.65 + node.phase * 0.7) * 0.12;
        const neuralPulse = Math.sin((node.x + node.z) * 0.42 - time * 1.4 + node.phase) * 0.08;
        const lift = radial * 0.22;

        const y = waveA + waveB + neuralPulse + lift;

        pointAttr.setXYZ(i, node.x, y, node.z);
      }

      pointAttr.needsUpdate = true;

      for (let i = 0; i < connections.length; i++) {
        const [a, b] = connections[i];

        lineAttr.setXYZ(
          i * 2,
          pointPositions[a * 3],
          pointAttr.getY(a),
          pointPositions[a * 3 + 2]
        );

        lineAttr.setXYZ(
          i * 2 + 1,
          pointPositions[b * 3],
          pointAttr.getY(b),
          pointPositions[b * 3 + 2]
        );
      }

      lineAttr.needsUpdate = true;

      const pulseRow = Math.floor(((Math.sin(time * 0.45) + 1) / 2) * (rows - 1));

      for (let col = 0; col < cols; col++) {
        const index = pulseRow * cols + col;
        pulseAttr.setXYZ(
          col,
          pointPositions[index * 3],
          pointAttr.getY(index) + 0.035,
          pointPositions[index * 3 + 2]
        );
      }

      pulseAttr.needsUpdate = true;
    }

    function renderStatic() {
      updateNetwork(0.8);
      renderer.render(scene, camera);
    }

    const clock = new THREE.Clock();
    let animationFrame = 0;

    function animate() {
      const elapsed = clock.getElapsedTime();

      updateNetwork(elapsed);

      if (!coarsePointer) {
        group.rotation.y += (pointerX * 0.08 - group.rotation.y) * 0.03;
        group.rotation.x += (-0.56 + pointerY * 0.03 - group.rotation.x) * 0.03;
      }

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    }

    if (reducedMotion) {
      renderStatic();
    } else {
      animate();
    }

    function handleResize() {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarsePointer ? 1.1 : 1.5));

      if (reducedMotion) {
        renderer.render(scene, camera);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      pointsGeometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      aria-label="Campo neural digital"
      className="relative overflow-hidden border-y border-surface-line bg-transparent"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,24,154,0.10),transparent_58%)]" />

      <div
        ref={mountRef}
        className="relative h-[220px] w-full sm:h-[260px] lg:h-[300px]"
      />
    </section>
  );
}