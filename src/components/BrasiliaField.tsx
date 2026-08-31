import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/**
 * BrasiliaField v4 — O Plano Piloto com atmosfera.
 * Bloom suave, lago vivo, céu em gradiente e estrelas.
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
    scene.fog = new THREE.FogExp2(new THREE.Color('#0a0a12'), 0.02);

    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / mount.clientHeight,
      0.1,
      300
    );
    camera.position.set(0, 9, 12);
    camera.lookAt(0, 0, -1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    const ACCENT = new THREE.Color('#a78bfa');
    const ACCENT_SOFT = new THREE.Color('#c4b5fd');
    const ACCENT_HOT = new THREE.Color('#e0d4ff');
    const INK_FAINT = new THREE.Color('#4a4a52');
    const LAKE = new THREE.Color('#5a7abf');

    const city = new THREE.Group();
    scene.add(city);

    // ── Céu: gradiente em cúpula ───────────────────────────
    const skyGeo = new THREE.SphereGeometry(120, 32, 20);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        topColor: { value: new THREE.Color('#05050c') },
        midColor: { value: new THREE.Color('#12102a') },
        bottomColor: { value: new THREE.Color('#2a1e4d') },
      },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        varying vec3 vPos;
        uniform vec3 topColor; uniform vec3 midColor; uniform vec3 bottomColor;
        void main() {
          float h = normalize(vPos).y;
          vec3 col = h > 0.15
            ? mix(midColor, topColor, smoothstep(0.15, 0.7, h))
            : mix(bottomColor, midColor, smoothstep(-0.3, 0.15, h));
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    scene.add(new THREE.Mesh(skyGeo, skyMat));

    // ── Estrelas ───────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starPos: number[] = [];
    for (let i = 0; i < 700; i++) {
      const r = 60 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.85 + 0.1); // evita horizonte
      starPos.push(
        r * Math.sin(phi) * Math.cos(theta),
        Math.abs(r * Math.cos(phi)) * 0.6 + 4,
        r * Math.sin(phi) * Math.sin(theta)
      );
    }
    starGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starPos, 3)
    );
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.22,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── Glow de horizonte (plano aditivo atrás da cidade) ──
    const horizonMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { glowColor: { value: new THREE.Color('#6d5bb8') } },
      vertexShader: `varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `varying vec2 vUv; uniform vec3 glowColor;
        void main(){
          float d = distance(vUv, vec2(0.5));
          float glow = exp(-d * 5.5) * 0.5;
          gl_FragColor = vec4(glowColor, glow);
        }`,
    });
    const horizonGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(90, 30),
      horizonMat
    );
    horizonGlow.position.set(0, 2, -45);
    scene.add(horizonGlow);

    function lineFromPoints(
      points: THREE.Vector3[],
      color: THREE.Color,
      opacity: number
    ) {
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      return new THREE.Line(geo, mat);
    }

    // ── Eixo Monumental ────────────────────────────────────
    function axisLine(offsetX: number) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 80; i++) {
        const t = i / 80;
        const z = THREE.MathUtils.lerp(-14, 10, t);
        pts.push(new THREE.Vector3(offsetX, 0.02, z));
      }
      return pts;
    }
    city.add(lineFromPoints(axisLine(-0.12), ACCENT, 0.9));
    city.add(lineFromPoints(axisLine(0.12), ACCENT, 0.9));

    // "Faróis" correndo pelo eixo (faixas de luz em movimento)
    const axisGlow: THREE.Mesh[] = [];
    for (const offset of [-0.12, 0.12]) {
      const glowMat = new THREE.MeshBasicMaterial({
        color: ACCENT_HOT,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const beam = new THREE.Mesh(
        new THREE.PlaneGeometry(0.05, 1.6),
        glowMat
      );
      beam.rotation.x = -Math.PI / 2;
      beam.position.set(offset, 0.03, 0);
      city.add(beam);
      axisGlow.push(beam);
    }

    function wingPoints(side: 1 | -1) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 60; i++) {
        const t = i / 60;
        const z = THREE.MathUtils.lerp(0.5, -6.5, t);
        const x = side * (Math.sin(t * Math.PI * 0.62) * 6.5 + 0.12);
        pts.push(new THREE.Vector3(x, 0.02, z));
      }
      return pts;
    }
    city.add(lineFromPoints(wingPoints(1), ACCENT, 0.7));
    city.add(lineFromPoints(wingPoints(-1), ACCENT, 0.7));

    // ── Eixo Rodoviário ────────────────────────────────────
    function highwayArc(side: 1 | -1) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 60; i++) {
        const t = i / 60;
        const angle = THREE.MathUtils.lerp(-0.35, Math.PI + 0.35, t);
        pts.push(
          new THREE.Vector3(
            side * Math.sin(angle) * 7.2,
            0.02,
            -3 - Math.cos(angle) * 4.8
          )
        );
      }
      return pts;
    }
    city.add(lineFromPoints(highwayArc(1), INK_FAINT, 0.5));
    city.add(lineFromPoints(highwayArc(-1), INK_FAINT, 0.5));

    // ── Superquadras ───────────────────────────────────────
    const blockMat = new THREE.LineBasicMaterial({
      color: INK_FAINT,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    function addBlock(x: number, z: number, rotation: number) {
      const w = 0.95;
      const pts = [
        new THREE.Vector3(-w / 2, 0, -w / 2),
        new THREE.Vector3(w / 2, 0, -w / 2),
        new THREE.Vector3(w / 2, 0, w / 2),
        new THREE.Vector3(-w / 2, 0, w / 2),
        new THREE.Vector3(-w / 2, 0, -w / 2),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const block = new THREE.Line(geo, blockMat);
      block.position.set(x, 0, z);
      block.rotation.y = rotation;
      city.add(block);
    }
    for (const side of [1, -1] as const) {
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 4; col++) {
          const dist = 1.4 + col * 1.35;
          const z = 0.1 - row * 1.35;
          addBlock(side * dist, z, side * (col * 0.1 + row * 0.04) * -0.35);
        }
      }
    }

    // ── Congresso Nacional ─────────────────────────────────
    const congressMat = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    function dome(radius: number, up: boolean) {
      const geo = new THREE.SphereGeometry(
        radius,
        18,
        10,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      );
      const wire = new THREE.WireframeGeometry(geo);
      const line = new THREE.LineSegments(wire, congressMat);
      line.scale.y = 0.55;
      if (!up) line.rotation.x = Math.PI;
      return line;
    }
    const domeUp = dome(0.85, true);
    domeUp.position.set(-1.3, 0.28, -4.2);
    const domeDown = dome(0.7, false);
    domeDown.position.set(1.3, 0.35, -4.2);
    city.add(domeUp, domeDown);

    // halo tênue sobre o Congresso
    const congressHaloMat = new THREE.SpriteMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const congressHalo = new THREE.Sprite(congressHaloMat);
    congressHalo.scale.set(4.5, 2.2, 1);
    congressHalo.position.set(0, 1.2, -4.2);
    city.add(congressHalo);

    for (const dx of [-0.18, 0.18]) {
      city.add(
        lineFromPoints(
          [
            new THREE.Vector3(dx, 0, -4.26),
            new THREE.Vector3(dx, 2.6, -4.26),
            new THREE.Vector3(dx, 2.6, -4.14),
            new THREE.Vector3(dx, 0, -4.14),
          ],
          ACCENT,
          0.9
        )
      );
    }
    city.add(
      lineFromPoints(
        [
          new THREE.Vector3(-0.18, 1.7, -4.2),
          new THREE.Vector3(0.18, 1.7, -4.2),
        ],
        ACCENT,
        0.9
      )
    );

    // ── Catedral (agora com brilho pulsante suave) ─────────
    const cathedral = new THREE.Group();
    const cathedralMats: THREE.LineBasicMaterial[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 0.55;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 16; j++) {
        const t = j / 16;
        const r = radius * (1 - t * 0.85);
        const h = t * 1.1;
        pts.push(new THREE.Vector3(Math.cos(angle) * r, h, Math.sin(angle) * r));
      }
      const mat = new THREE.LineBasicMaterial({
        color: ACCENT_SOFT,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      cathedralMats.push(mat);
      cathedral.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts), mat
      ));
    }
    cathedral.position.set(0, 0, -1.2);
    city.add(cathedral);

    // ── Lago Paranoá (agora vivo — malha ondulante) ────────
    const LAKE_SEGS = 90;
    const lakeGeo = new THREE.BufferGeometry();
    const lakeBase: number[] = [];
    for (let i = 0; i <= LAKE_SEGS; i++) {
      const t = i / LAKE_SEGS;
      const angle = t * Math.PI * 1.35 - 0.15;
      const wobble =
        Math.sin(angle * 3.1) * 0.9 + Math.sin(angle * 7.7) * 0.45;
      const radius = 11.5 + wobble;
      lakeBase.push(
        Math.cos(angle) * radius, 0, 1.5 + Math.sin(angle) * radius * 0.75
      );
    }
    lakeGeo.setAttribute('position', new THREE.Float32BufferAttribute(lakeBase, 3));
    const lakeMat = new THREE.LineBasicMaterial({
      color: LAKE,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lakeLine = new THREE.Line(lakeGeo, lakeMat);
    city.add(lakeLine);

    // anel secundário (reflexo)
    const lakeGeo2 = new THREE.BufferGeometry();
    const lakeBase2 = lakeBase.map((v, i) =>
      i % 3 === 0 ? v * 1.06 : i % 3 === 2 ? 1.5 + (v - 1.5) * 1.06 : v
    );
    lakeGeo2.setAttribute('position', new THREE.Float32BufferAttribute(lakeBase2, 3));
    const lakeMat2 = lakeMat.clone();
    lakeMat2.opacity = 0.3;
    const lakeLine2 = new THREE.Line(lakeGeo2, lakeMat2);
    city.add(lakeLine2);

    // ── Reflexo espelhado dos marcos no lago ───────────────
    const reflection = city.clone();
    reflection.scale.y = -0.35;
    reflection.traverse((obj) => {
      const l = obj as THREE.Line;
      if (l.material && (l.material as THREE.LineBasicMaterial).opacity) {
        const m = (l.material as THREE.LineBasicMaterial).clone();
        m.opacity *= 0.25;
        l.material = m;
      }
    });
    city.add(reflection);

    // ── Nós tênues ─────────────────────────────────────────
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions: number[] = [];
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 8;
      nodePositions.push(
        Math.cos(angle) * radius,
        0.03,
        -3 + Math.sin(angle) * radius * 0.65
      );
    }
    nodeGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(nodePositions, 3)
    );
    const nodeMat = new THREE.PointsMaterial({
      color: INK_FAINT,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    city.add(new THREE.Points(nodeGeo, nodeMat));

    // ── Pós-processamento: bloom ───────────────────────────
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(mount.clientWidth, mount.clientHeight),
      0.55,  // strength — sutil, não "neon signage"
      0.6,   // radius
      0.2    // threshold — só o que já brilha brilha mais
    );
    composer.addPass(bloomPass);

    // ── Interação: drag com inércia ────────────────────────
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
      targetRotX = THREE.MathUtils.clamp(targetRotX, -0.35, 0.35);
    };
    const onPointerUp = () => {
      dragging = false;
    };
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let scrollProgress = 0;
    const onScroll = () => {
      const rect = mount.getBoundingClientRect();
      scrollProgress = THREE.MathUtils.clamp(
        -rect.top / window.innerHeight,
        0,
        1.2
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      composer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // fade-in cinematográfico
    let intro = 0;

    let raf = 0;
    const clock = new THREE.Clock();
    function animate() {
      raf = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      intro = Math.min(intro + 0.008, 1);
      city.scale.setScalar(0.92 + intro * 0.08);
      (city.rotation.y = currentRotY); // placeholder to keep ordering

      if (!reducedMotion) {
        if (!dragging) {
          targetRotY += velY;
          velY *= 0.94;
          targetRotY += 0.0008;
        }
        currentRotY += (targetRotY - currentRotY) * 0.06;
        currentRotX += (targetRotX - currentRotX) * 0.06;
        city.rotation.y = currentRotY + Math.sin(elapsed * 0.3) * 0.03;
        city.rotation.x = currentRotX;
        city.position.y = Math.sin(elapsed * 0.6) * 0.06;

        // ondas vivas no lago
        const lakePos = lakeGeo.attributes.position;
        for (let i = 0; i <= LAKE_SEGS; i++) {
          const x = lakeBase[i * 3];
          const z = lakeBase[i * 3 + 2];
          lakePos.setY(
            i,
            Math.sin(x * 1.2 + elapsed * 0.9) * 0.04 +
              Math.cos(z * 1.5 + elapsed * 0.6) * 0.03
          );
        }
        lakePos.needsUpdate = true;
        const lakePos2 = lakeGeo2.attributes.position;
        for (let i = 0; i <= LAKE_SEGS; i++) {
          const x = lakeBase2[i * 3];
          const z = lakeBase2[i * 3 + 2];
          lakePos2.setY(
            i,
            Math.sin(x * 1.2 + elapsed * 0.9 + 1.3) * 0.04 +
              Math.cos(z * 1.5 + elapsed * 0.6) * 0.03
          );
        }
        lakePos2.needsUpdate = true;

        // faróis do Eixo correndo
        for (let i = 0; i < axisGlow.length; i++) {
          const t = (elapsed * 0.35 + i * 0.5) % 1;
          axisGlow[i].position.z = THREE.MathUtils.lerp(-14, 10, t);
          axisGlow[i].material.opacity =
            0.45 * Math.sin(t * Math.PI) * intro;
        }

        // catedral respirando
        const breathe = 0.55 + Math.sin(elapsed * 1.4) * 0.18;
        for (const m of cathedralMats) m.opacity = breathe * intro;

        // halo do congresso pulsando devagar
        congressHaloMat.opacity = (0.14 + Math.sin(elapsed * 0.8) * 0.05) * intro;

        // estrelas cintilando
        starMat.opacity = (0.6 + Math.sin(elapsed * 2.2) * 0.15) * intro;

        const camZ = 12 + scrollProgress * 4;
        const camY = 9 + scrollProgress * 3;
        camera.position.z += (camZ - camera.position.z) * 0.08;
        camera.position.y += (camY - camera.position.y) * 0.08;
      }

      // fade-in global
      bloomPass.strength = 0.55 * intro;
      composer.render();
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
        if (
          obj instanceof THREE.Mesh ||
          obj instanceof THREE.Line ||
          obj instanceof THREE.LineSegments ||
          obj instanceof THREE.Points
        ) {
          obj.geometry.dispose();
        }
      });
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
