import { useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const CYAN = "#3fd8f0";
export const VIOLET = "#8b6cf0";
export const VERIFIED = "#4fe0a5";
export const BREACH = "#e0553f";
export const DIM = "#2a3138";

export function Edges({
  geometry,
  color = CYAN,
  opacity = 0.55,
}: {
  geometry: THREE.BufferGeometry;
  color?: string;
  opacity?: number;
}) {
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  return (
    <lineSegments geometry={edges}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

export function BoxFrame({
  size = [2, 2, 2],
  color = CYAN,
  opacity = 0.4,
  ...rest
}: {
  size?: [number, number, number];
  color?: string;
  opacity?: number;
} & React.ComponentProps<"group">) {
  const geo = useMemo(() => new THREE.BoxGeometry(...size), [size]);
  return (
    <group {...rest}>
      <Edges geometry={geo} color={color} opacity={opacity} />
    </group>
  );
}

/** Slow, continuous rotation. */
export function Spin({
  speed = 0.12,
  axis = "y",
  children,
}: {
  speed?: number;
  axis?: "x" | "y" | "z";
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation[axis] += d * speed;
  });
  return <group ref={ref}>{children}</group>;
}

/** A realistic-feeling legal document: dark sheet, thin border, faint text ruling. */
export function LegalDocument({
  scale = 1,
  accent = CYAN,
  glow = 0.35,
  ...rest
}: { scale?: number; accent?: string; glow?: number } & React.ComponentProps<"group">) {
  const lines = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        y: 1.18 - i * 0.14,
        w: i === 0 ? 0.7 : 0.2 + ((i * 37) % 70) / 100,
      })),
    [],
  );
  const border = useMemo(() => new THREE.PlaneGeometry(1.45, 2.05), []);

  return (
    <group scale={scale} {...rest}>
      <mesh>
        <planeGeometry args={[1.45, 2.05]} />
        <meshStandardMaterial
          color="#07090b"
          roughness={0.92}
          metalness={0.04}
          emissive={accent}
          emissiveIntensity={glow * 0.025}
        />
      </mesh>
      <Edges geometry={border} color={accent} opacity={0.5} />
      {lines.map((l, i) => (
        <mesh key={i} position={[-0.6 + (l.w * 1.2) / 2, l.y - 0.42, 0.004]}>
          <planeGeometry args={[l.w * 1.2, 0.014]} />
          <meshBasicMaterial
            color={i === 0 ? accent : "#7d8b93"}
            transparent
            opacity={i === 0 ? 0.85 : 0.32}
          />
        </mesh>
      ))}
      {/* seal */}
      <mesh position={[0.45, -0.78, 0.005]}>
        <ringGeometry args={[0.11, 0.13, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export function ParticleField({
  count = 260,
  radius = 9,
  color = CYAN,
  size = 0.03,
  opacity = 0.5,
}: {
  count?: number;
  radius?: number;
  color?: string;
  size?: number;
  opacity?: number;
}) {
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * radius * 2;
      a[i * 3 + 1] = (Math.random() - 0.5) * radius * 1.2;
      a[i * 3 + 2] = (Math.random() - 0.5) * radius * 1.6;
    }
    return a;
  }, [count, radius]);

  const ref = useRef<THREE.Points>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={size} transparent opacity={opacity} sizeAttenuation />
    </points>
  );
}
