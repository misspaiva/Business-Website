import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * BrasiliaField v5 — maquete arquitetônica.
 * Iluminação real, volumes sólidos, sombras suaves. Sem glow.
 */
export function BrasiliaField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#101116');
    scene.fog = new THREE.Fog('#101116', 18, 65);

    const camera = new THREE.PerspectiveCamera(
      36,
      mount.clientWidth / mount.clientHeight,
      0.1,
      300
    );
    camera.position.set(0, 10, 13);
    camera.lookAt(0, 0, -1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ── Paleta sóbria ──────────────────────────────────────
    const CONCRETE = new THREE.Color('#c9c9ce');   // concreto de Niemeyer
    CONCRETE.convertSRGBToLinear();
    const ROAD = new THREE.Color('#2e2e35');
    const LAKE = new THREE.Color('#26374d');
    const INK = new THREE.Color('#55555e');

    // ── Iluminação ─────────────────────────────────────────
    const hemi = new THREE.HemisphereLight('#8a90b8', '#1a1a20', 0.55);
    scene.add(hemi);

    const sun = new THREE.DirectionalLight('#f4e9d8', 1.6);
    sun.position.set(-14, 22, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    sun.shadow.camera.far = 60;
    sun.shadow.bias = -0.0004;
    scene.add(sun);

    const fill = new THREE.DirectionalLight('#6a7bd4', 0.35);
    fill.position.set(12, 8, -10);
    scene.add(fill);

    // ── Terreno ────────────────────────────────────────────
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(40, 64),
      new THREE.MeshStandardMaterial({
        color: '#14151a',
        roughness: 1,
        metalness: 0,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const city = new THREE.Group();
    scene.add(city);

    // ── Materiais compartilhados ───────────────────────────
    const concreteMat = new THREE.MeshStandardMaterial({
      color: CONCRETE,
      roughness: 0.85,
      metalness: 0.05,
    });
    const roadMat = new THREE.MeshStandardMaterial({
      color: ROAD,
      roughness: 0.95,
    });
    const inkMat = new THREE.MeshStandardMaterial({
      color: INK,
      roughness: 0.9,
    });

    function mark(obj: THREE.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
      return obj;
    }

    // ── Eixos viários (fita plana, não linha) ──────────────
    function roadRibbon(points: THREE.Vector3[], width: number) {
      // constrói uma fita orientada a partir de pontos de centro
      const left: THREE.Vector3[] = [];
      const right: THREE.Vector3[] = [];
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const prev = points[Math.max(i - 1, 0)];
        const next = points[Math.min(i + 1, points.length - 1)];
        const dir = new THREE.Vector3().subVectors(next, prev).normalize();
        const perp = new THREE.Vector3(-dir.z, 0, dir.x).multiplyScalar(width / 2);
        left.push(p.clone().add(perp));
        right.push(p.clone().sub(perp));
      }
      const verts: number[] = [];
      for (let i = 0; i < points.length - 1; i++) {
        const l0 = left[i], r0 = right[i], l1 = left[i + 1], r1 = right[i + 1];
        verts.push(
          l0.x, l0.y, l0.z, r0.x, r0.y, r0.z, l1.x, l1.y, l1.z,
          r0.x, r0.y, r0.z, r1.x, r1.y, r1.z, l1.x, l1.y, l1.z
        );
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
      geo.computeVertexNormals();
      return new THREE.Mesh(geo, roadMat);
    }

    // Eixo Monumental
    const axisCenter: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      axisCenter.push(new THREE.Vector3(0, 0.01, THREE.MathUtils.lerp(-14, 10, i / 40)));
    }
    const axis = roadRibbon(axisCenter, 0.55);
    axis.receiveShadow = true;
    city.add(axis);

    // Asas (Eixos Rodoviários curvos)
    function wingCenter(side: 1 | -1) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        const z = THREE.MathUtils.lerp(0.5, -6.5, t);
        const x = side * (Math.sin(t * Math.PI * 0.62) * 6.5 + 0.12);
        pts.push(new THREE.Vector3(x, 0.01, z));
      }
      return pts;
    }
    city.add(roadRibbon(wingCenter(1), 0.35));
    city.add(roadRibbon(wingCenter(-1), 0.35));

    // ── Superquadras: blocos sólidos baixos ────────────────
    const blockGeo = new THREE.BoxGeometry(0.95, 0.16, 0.95);
    for (const side of [1, -1] as const) {
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 4; col++) {
          const dist = 1.4 + col * 1.35;
          const z = 0.1 - row * 1.35;
          const block = mark(new THREE.Mesh(blockGeo, concreteMat));
          block.position.set(side * dist, 0.08, z);
          block.rotation.y = side * (col * 0.1 + row * 0.04) * -0.35;
          city.add(block);
        }
      }
    }

    // ── Congresso Nacional: volumes sólidos ────────────────
    function dome(radius: number, up: boolean) {
      const geo = new THREE.SphereGeometry(
        radius, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2
      );
      const mesh = mark(new THREE.Mesh(geo, concreteMat));
      mesh.scale.y = 0.55;
      if (!up) mesh.rotation.x = Math.PI;
      return mesh;
    }
    const domeUp = dome(0.85, true);
    domeUp.position.set(-1.3, 0.16, -4.2);
    const domeDown = dome(0.7, false);
    domeDown.position.set(1.3, 0.22, -4.2);
    city.add(domeUp, domeDown);

    // plataforma do Congresso
    const platform = mark(new THREE.Mesh(
      new THREE.BoxGeometry(4.6, 0.16, 1.1),
      concreteMat
    ));
    platform.position.set(0, 0.08, -4.2);
    city.add(platform);

    // as duas torres (27 andares)
    for (const dx of [-0.35, 0.35]) {
      const tower = mark(new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 2.6, 0.34),
        concreteMat
      ));
      tower.position.set(dx, 1.3 + 0.16, -4.2);
      city.add(tower);
    }
    // travessa entre as torres
    const bridge = mark(new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.16, 0.3),
      concreteMat
    ));
    bridge.position.set(0, 1.9, -4.2);
    city.add(bridge);

    // ── Catedral: colunas curvas inclinadas (volumétricas) ─
    const cathedral = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 10; j++) {
        const t = j / 10;
        const r = 0.55 * (1 - t * 0.85);
        const h = t * 1.1;
        pts.push(new THREE.Vector3(Math.cos(angle) * r, h, Math.sin(angle) * r));
      }
      // TubeGeometry ao longo da curva = coluna real
      const curve = new THREE.CatmullRomCurve3(pts);
      const column = mark(new THREE.Mesh(
        new THREE.TubeGeometry(curve, 16, 0.028, 6),
        concreteMat
      ));
      cathedral.add(column);
    }
    cathedral.position.set(0, 0, -1.2);
    city.add(cathedral);

    // ── Lago Paranoá: superfície real com reflexo falso ────
    const LAKE_SEGMENTS = 64;
    const lakeGeo = new THREE.BufferGeometry();
    const lakeVerts: number[] = [];
    const lakeIndices: number[] = [];
    const lakeBase: { x: number; z: number }[] = [];
    // contorno do lago -> malha radial até um centro
    for (let i = 0; i <= LAKE_SEGMENTS; i++) {
      const t = i / LAKE_SEGMENTS;
      const angle = t * Math.PI * 1.35 - 0.15;
      const wobble =
        Math.sin(angle * 3.1) * 0.9 + Math.sin(angle * 7.7) * 0.45;
      const radius = 11.5 + wobble;
      lakeBase.push({
        x: Math.cos(angle) * radius,
        z: 1.5 + Math.sin(angle) * radius * 0.75,
      });
    }
    for (let i = 0; i <= LAKE_SEGMENTS; i++) {
      lakeVerts.push(lakeBase[i].x, 0, lakeBase[i].z); // borda
      lakeVerts.push(0, 0, 1.5);                       // centro
    }
    for (let i = 0; i < LAKE_SEGMENTS; i++) {
      const a = i * 2, b = i * 2 + 1, c = (i + 1) * 2, d = (i + 1) * 2 + 1;
      lakeIndices.push(a, b, c, b, d, c);
    }
    lakeGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(lakeVerts, 3)
    );
    lakeGeo.setIndex(lakeIndices);
    lakeGeo.computeVertexNormals();
    const lakeMat = new THREE.MeshStandardMaterial({
      color: LAKE,
      roughness: 0.15,
      metalness: 0.7,
      envMapIntensity: 0.6,
    });
    const lake = new THREE.Mesh(lakeGeo, lakeMat);
    lake.receiveShadow = true;
    city.add(lake);

    // ── Interação: drag com inércia (mantido) ──────────────
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velY = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      targetRotY += dx * 0.004;
      targetRotX += dy * 0.002;
      velY = dx * 0.004;
      targetRotX = THREE.MathUtils.clamp(targetRotX, -0.3, 0.35);
    };
    const onPointerUp = () => { dragging = false; };
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let scrollProgress = 0;
    const onScroll = () => {
      const rect = mount.getBoundingClientRect();
      scrollProgress = THREE.MathUtils.clamp(
        -rect.top / window.innerHeight, 0, 1.2
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animação sóbria ────────────────────────────────────
    let raf = 0;
    const clock = new THREE.Clock();
    const lakePos = lakeGeo.attributes.position;
    function animate() {
      raf = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        if (!dragging) {
          targetRotY += velY;
          velY *= 0.94;
          targetRotY += 0.0006; // rotação de exposição bem lenta
        }
        currentRotY += (targetRotY - currentRotY) * 0.06;
        currentRotX += (targetRotX - currentRotX) * 0.06;
        city.rotation.y = currentRotY;
        city.rotation.x = currentRotX;

        // micro-ondulação do lago (sutil, só Y)
        for (let i = 0; i <= LAKE_SEGMENTS; i++) {
          const x = lakeBase[i].x;
          const z = lakeBase[i].z;
          lakePos.setY(i * 2,
            Math.sin(x * 0.8 + elapsed * 0.5) * 0.015 +
            Math.cos(z * 1.1 + elapsed * 0.35) * 0.012
          );
        }
        lakePos.needsUpdate = true;

        const camZ = 13 + scrollProgress * 3;
        const camY = 10 + scrollProgress * 2.5;
        camera.position.z += (camZ - camera.position.z) * 0.08;
        camera.position.y += (camY - camera.position.y) * 0.08;
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const m = obj.material;
          if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
          else m.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
