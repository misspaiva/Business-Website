import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Brasília Field — premium architectural miniature for the PAIVA hero.
 * Solid geometry + restrained wire accents + cinematic light + cursor orbit.
 * No external models/assets are required, so the hero remains fast and portable.
 */
export function BrasiliaField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080d, 0.0105);

    const camera = new THREE.PerspectiveCamera(
      34,
      Math.max(mount.clientWidth, 1) / Math.max(mount.clientHeight, 1),
      0.1,
      180
    );
    camera.position.set(-0.3, 7.6, 13.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarsePointer ? 1.4 : 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.42;
    renderer.shadowMap.enabled = !coarsePointer;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    const PALETTE = {
      accent: new THREE.Color('#9f8cff'),
      accentSoft: new THREE.Color('#cfc4ff'),
      stone: new THREE.Color('#5f5d6d'),
      stoneLight: new THREE.Color('#9692a8'),
      stoneDark: new THREE.Color('#464451'),
      glass: new THREE.Color('#9b99ad'),
      road: new THREE.Color('#8b84a2'),
      lake: new THREE.Color('#151b29'),
    };

    const architectureMat = new THREE.MeshStandardMaterial({
      color: PALETTE.stone,
      emissive: new THREE.Color('#171722'),
      emissiveIntensity: 0.34,
      roughness: 0.56,
      metalness: 0.24,
    });
    const architectureLightMat = new THREE.MeshStandardMaterial({
      color: PALETTE.stoneLight,
      emissive: new THREE.Color('#222231'),
      emissiveIntensity: 0.32,
      roughness: 0.43,
      metalness: 0.32,
    });
    const architectureDarkMat = new THREE.MeshStandardMaterial({
      color: PALETTE.stoneDark,
      emissive: new THREE.Color('#111119'),
      emissiveIntensity: 0.28,
      roughness: 0.68,
      metalness: 0.12,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: PALETTE.accent,
      emissive: PALETTE.accent,
      emissiveIntensity: 0.22,
      roughness: 0.34,
      metalness: 0.46,
    });
    const roadMat = new THREE.MeshBasicMaterial({
      color: PALETTE.road,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    const lakeMat = new THREE.MeshStandardMaterial({
      color: PALETTE.lake,
      roughness: 0.52,
      metalness: 0.06,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
    });

    const world = new THREE.Group();
    world.position.set(2.0, -0.40, -1.8);
    world.rotation.x = -0.035;
    scene.add(world);

    const groundLayer = new THREE.Group();
    const cityLayer = new THREE.Group();
    const landmarkLayer = new THREE.Group();
    world.add(groundLayer, cityLayer, landmarkLayer);

    // Cinematic light: cool ambient, directional key, subtle violet rim.
    scene.add(new THREE.HemisphereLight(0xe8e4f5, 0x0a0a10, 2.15));

    const key = new THREE.DirectionalLight(0xf3f0ff, 3.2);
    key.position.set(-4.8, 10.5, 7.5);
    key.castShadow = !coarsePointer;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -15;
    key.shadow.camera.right = 15;
    key.shadow.camera.top = 15;
    key.shadow.camera.bottom = -15;
    scene.add(key);

    const rim = new THREE.PointLight(PALETTE.accent, 13, 24, 2.84);
    rim.position.set(2.5, 2.8, -5.5);
    scene.add(rim);

    const fill = new THREE.PointLight(0xd6d1eb, 5.6, 24, 2.2);
    fill.position.set(-7, 2.4, 2.5);
    scene.add(fill);

    // Broad frontal fill keeps graphite architecture separated from the black hero background.
    const frontFill = new THREE.DirectionalLight(0xc9c3dd, 1.45);
    frontFill.position.set(4.5, 5.5, 11);
    scene.add(frontFill);

    // No ground plane: the architecture floats directly against the black hero background.

    function addEdge(mesh: THREE.Mesh, opacity = 0.18, color = PALETTE.accentSoft) {
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(mesh.geometry, 28),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity })
      );
      edges.position.copy(mesh.position);
      edges.rotation.copy(mesh.rotation);
      edges.scale.copy(mesh.scale);
      mesh.parent?.add(edges);
      return edges;
    }

    function box(
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      d: number,
      material = architectureMat,
      ry = 0,
      edgeOpacity = 0.12
    ) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
      mesh.position.set(x, y + h / 2, z);
      mesh.rotation.y = ry;
      mesh.castShadow = !coarsePointer;
      mesh.receiveShadow = true;
      cityLayer.add(mesh);
      if (edgeOpacity > 0) addEdge(mesh, edgeOpacity, new THREE.Color('#b5acd8'));
      return mesh;
    }

    function line(points: THREE.Vector3[], opacity: number, color = PALETTE.accent) {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      const result = new THREE.Line(geometry, material);
      groundLayer.add(result);
      return result;
    }

    // Monumental Axis: a single restrained luminous spine, without a colored floor plane.
    const axisGlow = line([
      new THREE.Vector3(0, 0.004, 9.2),
      new THREE.Vector3(0, 0.004, -12.8),
    ], 0.32, PALETTE.accent);
    axisGlow.renderOrder = 3;

    // Curved residential wings: elegant paired splines.
    for (const side of [-1, 1] as const) {
      for (const spread of [1, 0.88]) {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 72; i++) {
          const t = i / 72;
          pts.push(new THREE.Vector3(
            side * (0.75 + Math.sin(t * Math.PI * 0.93) * 7.0 * spread),
            0.01,
            0.9 - t * 8.4
          ));
        }
        line(pts, spread === 1 ? 0.25 : 0.09, spread === 1 ? PALETTE.accent : PALETTE.road);
      }
    }

    // Residential blocks removed deliberately: the hero focuses on Brasília's iconic civic architecture.

    // Ministries — recognizable rhythm along the Esplanade.
    for (const side of [-1, 1] as const) {
      for (let i = 0; i < 7; i++) {
        const z = -1.65 - i * 0.43;
        const depth = 0.74 + (i % 2) * 0.08;
        box(side * 0.78, 0, z, 0.40, 0.52, depth, architectureLightMat, side * 0.015, 0.09);
      }
    }

    // Congresso Nacional: two towers + sculptural hemispheres.
    const congress = new THREE.Group();
    congress.position.set(0, 0, -5.15);
    landmarkLayer.add(congress);

    for (const x of [-0.2, 0.2]) {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.95, 0.32), architectureLightMat);
      tower.position.set(x, 1.475, 0);
      tower.castShadow = !coarsePointer;
      congress.add(tower);
      addEdge(tower, 0.28, PALETTE.accentSoft);
    }

    const makeDome = (x: number, radius: number, inverted: boolean) => {
      const geometry = new THREE.SphereGeometry(radius, 40, 18, 0, Math.PI * 2, 0, Math.PI / 2);
      const dome = new THREE.Mesh(geometry, architectureLightMat);
      dome.position.set(x, inverted ? 0.54 : 0.18, 0.05);
      dome.scale.y = 0.42;
      if (inverted) dome.rotation.x = Math.PI;
      dome.castShadow = !coarsePointer;
      congress.add(dome);
      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry, 24),
        new THREE.LineBasicMaterial({ color: PALETTE.accentSoft, transparent: true, opacity: 0.16 })
      );
      edge.position.copy(dome.position);
      edge.rotation.copy(dome.rotation);
      edge.scale.copy(dome.scale);
      congress.add(edge);
    };
    makeDome(-1.22, 0.78, false);
    makeDome(1.2, 0.69, true);

    // Cathedral — sculptural ribs with real depth.
    const cathedral = new THREE.Group();
    cathedral.position.set(-0.05, 0, -1.05);
    landmarkLayer.add(cathedral);
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(angle) * 0.56, 0, Math.sin(angle) * 0.56),
        new THREE.Vector3(Math.cos(angle) * 0.40, 0.6, Math.sin(angle) * 0.40),
        new THREE.Vector3(Math.cos(angle) * 0.20, 1.22, Math.sin(angle) * 0.20),
        new THREE.Vector3(Math.cos(angle) * 0.07, 1.5, Math.sin(angle) * 0.07),
      ]);
      const rib = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 24, 0.022, 6, false),
        i % 4 === 0 ? accentMat : architectureLightMat
      );
      rib.castShadow = !coarsePointer;
      cathedral.add(rib);
    }

    // Palácio/Tribunal abstractions around Praça dos Três Poderes.
    box(-1.65, 0, -6.2, 1.58, 0.28, 0.58, architectureLightMat, 0.08, 0.12);
    box(1.55, 0, -6.15, 1.45, 0.26, 0.58, architectureLightMat, -0.08, 0.12);

    // TV tower as a simple elegant silhouette.
    const towerGroup = new THREE.Group();
    towerGroup.position.set(0, 0, 3.25);
    landmarkLayer.add(towerGroup);
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.05, 2.55, 10), architectureLightMat);
    mast.position.y = 1.275;
    mast.castShadow = !coarsePointer;
    towerGroup.add(mast);
    const deck = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.2, 0.11, 24), accentMat);
    deck.position.y = 1.5;
    towerGroup.add(deck);
    const tripod = new THREE.Group();
    for (const x of [-0.16, 0.16]) {
      const strut = new THREE.Mesh(new THREE.BoxGeometry(0.035, 1.5, 0.035), architectureLightMat);
      strut.position.set(x / 2, 0.72, 0);
      strut.rotation.z = x > 0 ? -0.11 : 0.11;
      tripod.add(strut);
    }
    towerGroup.add(tripod);

    // Lake Paranoá — an organic, translucent perimeter rather than a colored floor.
    // The shape sits mostly behind and to the right of the monuments, framing the composition.
    const lakeShape = new THREE.Shape();
    lakeShape.moveTo(4.7, 6.8);
    lakeShape.bezierCurveTo(8.5, 6.3, 12.8, 4.2, 13.7, 1.1);
    lakeShape.bezierCurveTo(14.8, -2.4, 12.4, -5.4, 8.8, -6.8);
    lakeShape.bezierCurveTo(6.1, -7.8, 4.5, -6.2, 4.9, -4.5);
    lakeShape.bezierCurveTo(5.4, -2.6, 7.4, -1.8, 7.9, 0.1);
    lakeShape.bezierCurveTo(8.4, 2.1, 6.5, 3.3, 5.0, 4.5);
    lakeShape.bezierCurveTo(4.4, 5.1, 4.35, 6.1, 4.7, 6.8);

    const lakeGeometry = new THREE.ShapeGeometry(lakeShape, 64);
    const lake = new THREE.Mesh(lakeGeometry, lakeMat);
    lake.rotation.x = -Math.PI / 2;
    lake.position.set(0.3, -0.035, -1.2);
    groundLayer.add(lake);

    const lakeOutline = new THREE.LineSegments(
      new THREE.EdgesGeometry(lakeGeometry, 10),
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#665f82'),
        transparent: true,
        opacity: 0.22,
      })
    );
    lakeOutline.rotation.copy(lake.rotation);
    lakeOutline.position.copy(lake.position);
    groundLayer.add(lakeOutline);

    // Sparse illuminated nodes — architectural, not particle-heavy.
    const nodes: number[] = [];
    let seed = 7193;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 18; i++) {
      nodes.push((rand() - 0.5) * 15, 0.08 + rand() * 0.25, -1.4 + (rand() - 0.5) * 11);
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodes, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: PALETTE.accentSoft,
      size: 0.026,
      transparent: true,
      opacity: 0.18,
      sizeAttenuation: true,
    });
    groundLayer.add(new THREE.Points(nodeGeo, nodeMat));

    // Interaction state. Cursor controls the camera orbit; drag gives an extra deliberate orbit.
    const pointer = new THREE.Vector2(0, 0);
    const smoothPointer = new THREE.Vector2(0, 0);
    let dragYaw = 0;
    let dragPitch = 0;
    let targetDragYaw = 0;
    let targetDragPitch = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let scrollProgress = 0;

    const updatePointer = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
      pointer.set(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1));
    };

    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event);
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      targetDragYaw = THREE.MathUtils.clamp(targetDragYaw - dx * 0.004, -0.5, 0.5);
      targetDragPitch = THREE.MathUtils.clamp(targetDragPitch + dy * 0.0024, -0.18, 0.16);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const onPointerUp = () => {
      dragging = false;
      renderer.domElement.style.cursor = coarsePointer ? 'default' : 'grab';
    };

    const onPointerLeave = () => {
      if (!dragging) pointer.set(0, 0);
    };

    const onScroll = () => {
      const rect = mount.getBoundingClientRect();
      scrollProgress = THREE.MathUtils.clamp(-rect.top / Math.max(window.innerHeight, 1), 0, 1);
    };

    // Listen on window for movement, so the hero text never blocks the 3D response.
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    mount.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    renderer.domElement.style.cursor = coarsePointer ? 'default' : 'grab';
    renderer.domElement.style.touchAction = 'pan-y';

    const onResize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarsePointer ? 1.4 : 1.8));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        smoothPointer.lerp(pointer, 0.065);
        dragYaw += (targetDragYaw - dragYaw) * 0.08;
        dragPitch += (targetDragPitch - dragPitch) * 0.08;

        if (!dragging) {
          // Slowly return from manual drag so the composition always recovers.
          targetDragYaw *= 0.992;
          targetDragPitch *= 0.992;
        }

        const baseYaw = -0.055;
        const orbitYaw = smoothPointer.x * 0.22 + dragYaw;
        const orbitPitch = -smoothPointer.y * 0.09 + dragPitch;
        const radius = 14.35 + scrollProgress * 2.9;
        const theta = baseYaw + orbitYaw;

        const desiredX = Math.sin(theta) * radius - 0.7;
        const desiredZ = Math.cos(theta) * radius;
        const desiredY = 7.7 + orbitPitch * 8.2 + scrollProgress * 2.1;

        camera.position.x += (desiredX - camera.position.x) * 0.065;
        camera.position.y += (desiredY - camera.position.y) * 0.065;
        camera.position.z += (desiredZ - camera.position.z) * 0.065;

        const lookX = 1.55 + smoothPointer.x * 0.9;
        const lookY = 0.18 - smoothPointer.y * 0.24;
        const lookZ = -2.65;
        camera.lookAt(lookX, lookY, lookZ);

        // Real depth: different layers lag behind the camera movement.
        groundLayer.position.x += (-smoothPointer.x * 0.12 - groundLayer.position.x) * 0.045;
        cityLayer.position.x += (-smoothPointer.x * 0.035 - cityLayer.position.x) * 0.045;
        landmarkLayer.position.x += (smoothPointer.x * 0.08 - landmarkLayer.position.x) * 0.045;
        landmarkLayer.position.y = Math.sin(elapsed * 0.42) * 0.012;

        rim.position.x = 2.5 + smoothPointer.x * 1.7;
        rim.position.z = -5.5 + smoothPointer.y * 0.8;
      } else {
        camera.lookAt(1.55, 0.18, -2.65);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      mount.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.LineSegments ||
          object instanceof THREE.Points
        ) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
          else material.dispose();
        }
      });

      architectureMat.dispose();
      architectureLightMat.dispose();
      architectureDarkMat.dispose();
      accentMat.dispose();
      roadMat.dispose();
      lakeMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
