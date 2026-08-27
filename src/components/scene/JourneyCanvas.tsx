import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  AccessStage,
  ArchiveStage,
  AuditStage,
  CaseStage,
  CollaborationStage,
  DocumentStage,
  EntryStage,
  FinalStage,
  FingerprintStage,
  GatewayStage,
  IngestionStage,
  IntegrityStage,
  IntelligenceStage,
  VaultStage,
} from "./stages";
import { CYAN } from "./primitives";

export const STAGE_GAP = 26;
export const STAGE_COUNT = 15;

const STAGES = [
  <GatewayStage key="0" />,
  <EntryStage key="1" />,
  <CaseStage key="2" />,
  <DocumentStage key="3" />,
  <IngestionStage key="4" />,
  <IntelligenceStage key="5" />,
  <FingerprintStage key="6" />,
  <VaultStage key="7" />,
  <AccessStage key="8" />,
  <CollaborationStage key="9" />,
  <AuditStage key="10" />,
  <IntegrityStage key="11" />,
  <FingerprintStage key="12" breached />,
  <ArchiveStage key="13" />,
  <FinalStage key="14" />,
];

const TRACK = (STAGE_COUNT - 1) * STAGE_GAP;

function Rig({ progressRef }: { progressRef: React.RefObject<number> }) {
  const { camera } = useThree();
  const current = useRef(0);
  const look = useRef(new THREE.Vector3());

  useFrame((state, d) => {
    const target = progressRef.current;
    current.current += (target - current.current) * Math.min(1, d * 2.4);
    const p = current.current;
    const z = 10 - p * (TRACK + 10);
    const t = state.clock.elapsedTime;

    camera.position.set(
      Math.sin(p * 9) * 1.4 + Math.sin(t * 0.2) * 0.12,
      Math.cos(p * 7) * 0.9 + Math.sin(t * 0.17) * 0.1,
      z,
    );
    look.current.set(Math.sin(p * 9) * 0.6, Math.cos(p * 7) * 0.4, z - 12);
    camera.lookAt(look.current);
    camera.rotation.z = Math.sin(p * 5) * 0.03;
  });
  return null;
}

function Stages({ progressRef }: { progressRef: React.RefObject<number> }) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  useFrame(() => {
    const camZ = 10 - progressRef.current * (TRACK + 10);
    groups.current.forEach((g, i) => {
      if (!g) return;
      g.visible = Math.abs(camZ - -i * STAGE_GAP) < 32;
    });
  });
  return (
    <>
      {STAGES.map((node, i) => (
        <group
          key={i}
          ref={(el) => {
            groups.current[i] = el;
          }}
          position={[0, 0, -i * STAGE_GAP]}
        >
          {node}
        </group>
      ))}
    </>
  );
}

export default function JourneyCanvas({
  progressRef,
  quality = "high",
}: {
  progressRef: React.RefObject<number>;
  quality?: "high" | "low";
}) {
  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.75] : [1, 1.2]}
      camera={{ position: [0, 0, 10], fov: 58, near: 0.1, far: 120 }}
      gl={{ antialias: quality === "high", powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 14, 52]} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[6, 8, 10]} intensity={0.5} color="#cfe9f2" />
      <pointLight position={[-8, -4, 6]} color={CYAN} intensity={6} distance={30} />
      <Rig progressRef={progressRef} />
      <Stages progressRef={progressRef} />
    </Canvas>
  );
}
