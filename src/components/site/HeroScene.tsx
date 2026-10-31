import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const BLUE = new THREE.Color("#245BFF");
const VIOLET = new THREE.Color("#795BFF");
const CYAN = new THREE.Color("#63E6FF");

function Sculpture({ lite }: { lite: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const points = useRef<THREE.Points>(null);
  const vel = useRef(0);
  const last = useRef(new THREE.Vector2());
  const { pointer } = useThree();

  const base = useMemo(() => new THREE.IcosahedronGeometry(1.6, lite ? 3 : 6), [lite]);
  const original = useMemo(() => Float32Array.from(base.attributes.position.array as Float32Array), [base]);

  const cloud = useMemo(() => {
    const n = lite ? 500 : 1600;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2.4 + Math.random() * 1.8;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p)], i * 3);
    }
    return arr;
  }, [lite]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const d = last.current.distanceTo(pointer);
    last.current.copy(pointer);
    vel.current = THREE.MathUtils.lerp(vel.current, Math.min(d * 40, 1.5), 0.08);
    const g = group.current!;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.x * 0.7 + t * 0.08, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.5, 0.05);
    g.position.y = Math.sin(t * 0.6) * 0.12;

    const pos = base.attributes.position as THREE.BufferAttribute;
    const amp = 0.12 + vel.current * 0.25;
    for (let i = 0; i < pos.count; i++) {
      const ox = original[i * 3], oy = original[i * 3 + 1], oz = original[i * 3 + 2];
      const n = Math.sin(ox * 2.1 + t * 1.1) * Math.cos(oy * 2.3 + t * 0.9) * Math.sin(oz * 1.9 + t * 0.7);
      const s = 1 + n * amp;
      pos.setXYZ(i, ox * s, oy * s, oz * s);
    }
    pos.needsUpdate = true;
    if (points.current) points.current.rotation.y -= dt * (0.03 + vel.current * 0.2);
    const m = core.current!.material as THREE.MeshBasicMaterial;
    m.color.copy(BLUE).lerp(CYAN, Math.min(vel.current, 1));
  });

  return (
    <group ref={group}>
      <mesh ref={core} geometry={base}>
        <meshBasicMaterial wireframe transparent opacity={0.55} color={BLUE} />
      </mesh>
      <mesh geometry={base} scale={0.985}>
        <meshBasicMaterial color={"#0A0B1D"} transparent opacity={0.85} />
      </mesh>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cloud, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.025} color={VIOLET} transparent opacity={0.8} sizeAttenuation />
      </points>
    </group>
  );
}

export default function HeroScene({ lite = false }: { lite?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, lite ? 1.25 : 1.75]} gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}>
      <Sculpture lite={lite} />
    </Canvas>
  );
}
