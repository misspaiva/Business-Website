import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/**
 * BrasiliaField v4 — O Plano Piloto como fundo de cena.
 * Mesma geometria, mesma paleta, mesma composição do v3.
 * O que muda é só a "física" do render: bloom sutil nas linhas,
 * tone mapping cinematográfico, pontos de luz suaves (não quadrados)
 * e um leve brilho de água no Lago Paranoá.
 *
 * NOTA: se o seu three.js for >= r150, talvez seja necessário trocar
 * os imports de 'three/examples/jsm/...' para 'three/addons/...'.
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
    scene.fog = new THREE.FogExp2(new THREE.Color('#0a0a0b'), 0.026);

    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 9, 12);
    camera.lookAt(0, 0, -1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);

    // ── Realismo: tone mapping cinematográfico ─────────────
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    // three r152+: outputColorSpace. Versões antigas: outputEncoding = THREE.sRGBEncoding
    if ('outputColorSpace' in renderer) {
      // @ts-ignore - compat entre versões do three
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } else {
      // @ts-ignore - compat entre versões do three
      renderer.outputEncoding = THREE.sRGBEncoding;
    }

    mount.appendChild(renderer.domElement);

    const ACCENT = new THREE.Color('#a78bfa');      // lilás provisório
    const ACCENT_SOFT = new THREE.Color('#c4b5fd'); // lilás claro
    const INK_FAINT = new THREE.Color('#4a4a52');
    const LAKE = new THREE.Color('#5a6a8a');

    const city = new THREE.Group();
    scene.add(city);

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
    city.add(lineFromPoints(axisLine(-0.12), ACCENT, 0.85));
    city.add(lineFromPoints(axisLine(0.12), ACCENT, 0.85));

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

    // ── Catedral ───────────────────────────────────────────
    const cathedral = new THREE.Group();
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
      cathedral.add(lineFromPoints(pts, ACCENT_SOFT, 0.65));
    }
    cathedral.position.set(0, 0, -1.2);
    city.add(cathedral);

    // ── Lago Paranoá ───────────────────────────────────────
    const lakePts: THREE.Vector3[] = [];
    for (let i = 0; i <= 90; i++) {
      const t = i / 90;
      const angle = t * Math.PI * 1.35 - 0.15;
      const wobble =
        Math.sin(angle * 3.1) * 0.9 + Math.sin(angle * 7.7) * 0.45;
      const radius = 11.5 + wobble;
      lakePts.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          1.5 + Math.sin(angle) * radius * 0.75
        )
      );
    }
    city.add(lineFromPoints(lakePts, LAKE, 0.55));
    const lakePts2 = lakePts.map((p) =>
      new THREE.Vector3(p.x * 1.06, 0, 1.5 + (p.z - 1.5) * 1.06)
    );
    city.add(lineFromPoints(lakePts2, LAKE, 0.3));

    // ── Brilho de água (realismo sutil, mesma cor do lago) ─
    const waterUniforms = {
      uTime: { value: 0 },
      uColor: { value: LAKE },
    };
    const waterGeo = new THREE.CircleGeometry(11.8, 64);
    const waterMat = new THREE.ShaderMaterial({
      uniforms: waterUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          vec2 c = vUv - 0.5;
          float d = length(c) * 2.0;
          float edge = smoothstep(1.0, 0.75, d) * (1.0 - smoothstep(0.0, 0.3, d));
          float shimmer = sin((c.x * 10.0 + c.y * 6.0) + uTime * 0.4) * 0.5 + 0.5;
          float glint = smoothstep(0.85, 1.0, shimmer) * edge;
          float base = edge * 0.04;
          gl_FragColor = vec4(uColor, base + glint * 0.05);
        }
      `,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(0, -0.01, 1.5);
    city.add(water);

    // ── Nós de luz suaves (sprites com glow, não quadrados) ─
    function makeGlowTexture() {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(255,255,255,0.35)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }
    const glowTex = makeGlowTexture();

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
      size: 0.12,
      map: glowTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    city.add(new THREE.Points(nodeGeo, nodeMat));

    // ── Pós-processamento: bloom sutil + AA multisample ────
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const pixelRatio = renderer.getPixelRatio();

    const renderTarget = new THREE.WebGLRenderTarget(
      width * pixelRatio,
      height * pixelRatio,
      { samples: 4 }
    );
    const composer = new EffectComposer(renderer, renderTarget);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.55, // strength — sutil, não estoura os brancos
      0.45, // radius
      0.12  // threshold — baixo pq o fundo já é quase preto
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
      const pr = renderer.getPixelRatio();
      composer.setSize(mount.clientWidth, mount.clientHeight);
      renderTarget.setSize(
        mount.clientWidth * pr,
        mount.clientHeight * pr
      );
      bloomPass.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    function animate() {
      raf = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      waterUniforms.uTime.value = elapsed;

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

        const camZ = 12 + scrollProgress * 4;
        const camY = 9 + scrollProgress * 3;
        camera.position.z += (camZ - camera.position.z) * 0.08;
        camera.position.y += (camY - camera.position.y) * 0.08;
      }

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
      glowTex.dispose();
      waterMat.dispose();
      waterGeo.dispose();
      renderTarget.dispose();
      // @ts-ignore - disponível no three r150+
      bloomPass.dispose?.();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
