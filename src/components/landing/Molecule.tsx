import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";

const atoms = [
  { pos: [0, 0, 0] as [number, number, number], r: 0.62, label: "Oxygen", note: "8 protons, pulls electrons closer — slightly negative.", color: "#E4572E" },
  { pos: [0.95, -0.7, 0] as [number, number, number], r: 0.38, label: "Hydrogen", note: "1 proton, slightly positive end.", color: "#F4EFE6" },
  { pos: [-0.95, -0.7, 0] as [number, number, number], r: 0.38, label: "Hydrogen", note: "Bond angle with the other H: 104.5°.", color: "#F4EFE6" },
];

export default function Molecule() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div className="relative h-56 w-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <group position={[0, 0.3, 0]}>
          {atoms.slice(1).map((a, i) => (
            <mesh key={i} position={[a.pos[0] / 2, a.pos[1] / 2, 0]} rotation={[0, 0, Math.atan2(a.pos[1], a.pos[0]) - Math.PI / 2]}>
              <cylinderGeometry args={[0.08, 0.08, 1.15, 12]} />
              <meshStandardMaterial color="#16140F" />
            </mesh>
          ))}
          {atoms.map((a, i) => (
            <mesh key={i} position={a.pos} onClick={() => setActive(i)}>
              <sphereGeometry args={[a.r, 32, 32]} />
              <meshStandardMaterial color={a.color} roughness={0.5} />
            </mesh>
          ))}
        </group>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
      <div className="absolute left-2 top-2 flex gap-1">
        {atoms.map((a, i) => (
          <button key={i} onClick={() => setActive(i)} aria-pressed={active === i}
            className={`border border-ink px-1.5 font-mono text-[10px] ${active === i ? "bg-marker" : "bg-card"}`}>
            {a.label === "Oxygen" ? "O" : `H${i}`}
          </button>
        ))}
      </div>
      {active !== null && (
        <p className="absolute bottom-0 left-0 right-0 border-t border-dashed border-ink bg-card/90 p-2 text-xs" aria-live="polite">
          <strong className="font-mono">{atoms[active].label}:</strong> {atoms[active].note}
        </p>
      )}
    </div>
  );
}
