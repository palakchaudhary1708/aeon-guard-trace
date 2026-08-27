import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BREACH,
  BoxFrame,
  CYAN,
  Edges,
  LegalDocument,
  ParticleField,
  Spin,
  VERIFIED,
  VIOLET,
} from "./primitives";

/* 00 — Gateway */
export function GatewayStage() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.15) * 0.03;
  });
  return (
    <group ref={ref}>
      {[0, 1, 2, 3, 4].map((i) => (
        <BoxFrame
          key={i}
          size={[7 - i * 0.9, 5 - i * 0.65, 0.06]}
          position={[0, 0, -i * 2.2]}
          color={CYAN}
          opacity={0.16 + i * 0.09}
        />
      ))}
      <mesh position={[0, 0, -1]}>
        <ringGeometry args={[2.4, 2.42, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.35} />
      </mesh>
      <LegalDocument position={[0, 0, -8]} scale={1.15} glow={1} />
      <pointLight position={[0, 0, -6]} color={CYAN} intensity={10} distance={14} />
      <ParticleField count={200} radius={7} opacity={0.35} />
    </group>
  );
}

/* 01 — Secure entry */
export function EntryStage() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += d * 0.1;
  });
  return (
    <group>
      <group ref={ref}>
        {[1.6, 2.3, 3.1].map((r, i) => (
          <mesh key={r} rotation={[0, 0, i * 0.6]}>
            <ringGeometry args={[r, r + 0.012, 128, 1, 0, Math.PI * (1.1 - i * 0.25)]} />
            <meshBasicMaterial color={i === 1 ? VIOLET : CYAN} transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
      <mesh>
        <ringGeometry args={[0.72, 0.735, 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.9} />
      </mesh>
      <BoxFrame size={[0.5, 0.55, 0.5]} color={CYAN} opacity={0.8} />
      <pointLight color={CYAN} intensity={10} distance={12} />
      <ParticleField count={140} radius={6} opacity={0.28} />
    </group>
  );
}

/* 02 — Case space */
export function CaseStage() {
  const items = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        p: [
          ((i % 6) - 2.5) * 2.1,
          (Math.floor(i / 6) - 1) * 2.6,
          -((i * 7) % 5) * 1.4,
        ] as [number, number, number],
        r: ((i * 13) % 10) / 60 - 0.08,
        a: i % 5 === 0 ? VIOLET : CYAN,
      })),
    [],
  );
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.25) * 0.12;
  });
  return (
    <group ref={ref}>
      {items.map((it, i) => (
        <LegalDocument
          key={i}
          position={it.p}
          rotation={[0, it.r, it.r * 0.4]}
          scale={0.62}
          accent={it.a}
          glow={0.3}
        />
      ))}
      <pointLight position={[0, 0, 4]} color={CYAN} intensity={12} distance={22} />
      <ParticleField count={180} radius={10} opacity={0.22} />
    </group>
  );
}

/* 03 — Document focus */
export function DocumentStage() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.3) * 0.14;
  });
  return (
    <group>
      <group ref={ref}>
        <LegalDocument scale={1.9} glow={1.1} />
        <BoxFrame size={[3.4, 4.4, 0.02]} color={CYAN} opacity={0.22} />
      </group>
      <pointLight position={[2, 1, 3]} color={CYAN} intensity={14} distance={14} />
      <pointLight position={[-3, -1, 2]} color={VIOLET} intensity={6} distance={12} />
    </group>
  );
}

/* 04 — Ingestion scanner */
export function IngestionStage() {
  const beam = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (beam.current) {
      const t = (s.clock.elapsedTime % 3) / 3;
      beam.current.position.y = 1.9 - t * 3.8;
      (beam.current.material as THREE.MeshBasicMaterial).opacity =
        0.9 * Math.sin(Math.PI * t) + 0.05;
    }
  });
  return (
    <group>
      <LegalDocument scale={1.7} glow={0.8} />
      <mesh ref={beam} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.4, 0.05]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
      {[-1, 1].map((s) => (
        <BoxFrame key={s} size={[0.12, 4.6, 1.6]} position={[s * 2.4, 0, 0]} color={CYAN} opacity={0.5} />
      ))}
      <BoxFrame size={[5.2, 4.8, 1.8]} color={CYAN} opacity={0.16} />
      <pointLight color={CYAN} intensity={10} distance={14} position={[0, 0, 2]} />
    </group>
  );
}

/* 05 — AI intelligence */
export function IntelligenceStage() {
  const { points, lines } = useMemo(() => {
    const n = 44;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 * 3;
      const r = 1.4 + (i % 7) * 0.42;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a * 0.7) * 1.9, Math.sin(a) * r * 0.7));
    }
    const seg: number[] = [];
    for (let i = 0; i < n; i++) {
      const j = (i * 5 + 3) % n;
      const a2 = pts[i]!;
      const b2 = pts[j]!;
      seg.push(a2.x, a2.y, a2.z, b2.x, b2.y, b2.z);
    }
    return { points: pts, lines: new Float32Array(seg) };
  }, []);

  const g = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (g.current) g.current.rotation.y += d * 0.08;
  });

  return (
    <group ref={g}>
      <LegalDocument scale={1.1} glow={0.6} />
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={CYAN} transparent opacity={0.2} />
      </lineSegments>
      {points.map((p, i) => (
        <mesh key={i} position={p} scale={i % 6 === 0 ? 0.07 : 0.04}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshBasicMaterial color={i % 6 === 0 ? VIOLET : CYAN} transparent opacity={0.85} />
        </mesh>
      ))}
      <ParticleField count={220} radius={7} opacity={0.3} />
    </group>
  );
}

/* 06 — Digital fingerprint */
export function FingerprintStage({ breached = false }: { breached?: boolean }) {
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.8, 1), []);
  const inner = useMemo(() => new THREE.IcosahedronGeometry(1.15, 0), []);
  return (
    <group>
      <Spin speed={0.18}>
        <Edges geometry={geo} color={breached ? BREACH : CYAN} opacity={0.75} />
        <mesh geometry={geo}>
          <meshStandardMaterial
            color="#0b0e11"
            roughness={0.35}
            metalness={0.7}
            transparent
            opacity={0.82}
          />
        </mesh>
      </Spin>
      <Spin speed={-0.26}>
        <Edges geometry={inner} color={breached ? BREACH : VIOLET} opacity={0.6} />
      </Spin>
      {breached && (
        <mesh rotation={[0, 0, 0.5]}>
          <planeGeometry args={[0.02, 5]} />
          <meshBasicMaterial color={BREACH} transparent opacity={0.9} />
        </mesh>
      )}
      <pointLight color={breached ? BREACH : CYAN} intensity={14} distance={14} />
      <ParticleField count={160} radius={6} color={breached ? BREACH : CYAN} opacity={0.25} />
    </group>
  );
}

/* 07 — Security vault (camera flies through) */
export function VaultStage() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (g.current) g.current.rotation.z += d * 0.03;
  });
  return (
    <group ref={g}>
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} position={[0, 0, -i * 3.2 + 6]}>
          <BoxFrame size={[6 - i * 0.5, 6 - i * 0.5, 0.04]} color={i === 2 ? VIOLET : CYAN} opacity={0.35} />
          <mesh>
            <ringGeometry args={[2.6 - i * 0.2, 2.62 - i * 0.2, 96]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.18} />
          </mesh>
        </group>
      ))}
      <LegalDocument position={[0, 0, -10]} scale={0.9} glow={1} />
      <pointLight position={[0, 0, -8]} color={CYAN} intensity={14} distance={18} />
    </group>
  );
}

/* 08 — Role-based access */
export function AccessStage() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (g.current) g.current.rotation.y += d * 0.12;
  });
  const nodes = useMemo(() => Array.from({ length: 5 }, (_, i) => (i / 5) * Math.PI * 2), []);
  return (
    <group>
      <LegalDocument scale={1.2} glow={0.9} />
      <group ref={g}>
        {nodes.map((a, i) => {
          const p: [number, number, number] = [Math.cos(a) * 3.4, Math.sin(a) * 1.1, Math.sin(a) * 3.4];
          const denied = i === 4;
          return (
            <group key={i} position={p}>
              <BoxFrame size={[0.5, 0.5, 0.5]} color={denied ? BREACH : CYAN} opacity={0.85} />
              <mesh>
                <sphereGeometry args={[0.09, 12, 12]} />
                <meshBasicMaterial color={denied ? BREACH : CYAN} />
              </mesh>
            </group>
          );
        })}
      </group>
      <mesh>
        <ringGeometry args={[3.4, 3.415, 128]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.2} />
      </mesh>
      <pointLight color={CYAN} intensity={10} distance={14} />
    </group>
  );
}

/* 09 — Collaboration */
export function CollaborationStage() {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.18) * 0.4;
  });
  return (
    <group ref={g}>
      <LegalDocument scale={1.5} glow={0.8} />
      {[
        [-3.1, 1.2, 1.2],
        [3.1, 0.6, 0.4],
        [-2.6, -1.4, -1.1],
        [2.7, -1.6, 1.4],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <BoxFrame size={[1.5, 0.62, 0.02]} color={i === 3 ? VERIFIED : CYAN} opacity={0.55} />
        </group>
      ))}
      <pointLight color={CYAN} intensity={10} distance={16} />
    </group>
  );
}

/* 10 — Audit trail: long timeline into darkness */
export function AuditStage() {
  const rows = useMemo(() => Array.from({ length: 26 }, (_, i) => i), []);
  return (
    <group>
      <mesh position={[0, 0, -26]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[0.02, 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.25} />
      </mesh>
      {rows.map((i) => {
        const side = i % 2 === 0 ? 1 : -1;
        return (
          <group key={i} position={[side * 2.1, side * 0.5, 4 - i * 2.4]}>
            <BoxFrame size={[2.6, 0.7, 0.02]} color={CYAN} opacity={0.4} />
            <mesh position={[-side * 1.35, 0, 0]}>
              <sphereGeometry args={[0.05, 10, 10]} />
              <meshBasicMaterial color={i % 7 === 3 ? VIOLET : CYAN} />
            </mesh>
          </group>
        );
      })}
      <ParticleField count={160} radius={12} opacity={0.18} />
    </group>
  );
}

/* 11 — Integrity verified */
export function IntegrityStage() {
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), []);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ring.current) ring.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 0.8) * 0.03);
  });
  return (
    <group>
      <Spin speed={0.1}>
        <Edges geometry={geo} color={VERIFIED} opacity={0.8} />
      </Spin>
      <mesh ref={ring}>
        <ringGeometry args={[2.5, 2.515, 128]} />
        <meshBasicMaterial color={VERIFIED} transparent opacity={0.5} />
      </mesh>
      <pointLight color={CYAN} intensity={16} distance={16} />
      <ParticleField count={140} radius={7} color={VERIFIED} opacity={0.22} />
    </group>
  );
}

/* 13 — Archive */
export function ArchiveStage() {
  const cells = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => [
        ((i % 10) - 4.5) * 2.4,
        (Math.floor(i / 10) - 2.5) * 2.2,
        -((i * 3) % 6) * 2.6 - 4,
      ] as [number, number, number]),
    [],
  );
  return (
    <group>
      {cells.map((p, i) => (
        <BoxFrame key={i} size={[1.6, 1.1, 0.02]} position={p} color={CYAN} opacity={0.14} />
      ))}
      <ParticleField count={200} radius={14} opacity={0.14} />
      <pointLight position={[0, 0, 4]} color={CYAN} intensity={8} distance={26} />
    </group>
  );
}

/* 14 — Final reveal */
export function FinalStage() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (g.current) g.current.rotation.y += d * 0.09;
  });
  return (
    <group>
      <LegalDocument scale={1.8} glow={1.2} />
      <group ref={g}>
        {Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2).map((a, i) => (
          <BoxFrame
            key={i}
            size={[0.9, 0.34, 0.02]}
            position={[Math.cos(a) * 3.6, Math.sin(a) * 2.2, Math.sin(a) * 1.6]}
            rotation={[0, -a, 0]}
            color={i % 3 === 0 ? VERIFIED : CYAN}
            opacity={0.6}
          />
        ))}
      </group>
      {[3.1, 3.9].map((r) => (
        <mesh key={r}>
          <ringGeometry args={[r, r + 0.012, 128]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.22} />
        </mesh>
      ))}
      <pointLight color={CYAN} intensity={16} distance={18} />
      <ParticleField count={220} radius={9} opacity={0.28} />
    </group>
  );
}
