"use client";

import React, { Suspense, useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  useTexture, 
  Float, 
  OrbitControls, 
  RoundedBox 
} from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import { TradeLog } from "@/lib/trades";

function PremiumCard({ trade, locale, onStepChange }: { trade: TradeLog, locale: string, onStepChange?: (step: number) => void }) {
  
  // 🎯 自動化核心 1：正面主圖路徑交由代碼自動推算生成，無需人工手寫
  const frontPath = useMemo(() => {
    return `/images/trades/${trade.slug}/main.png`;
  }, [trade.slug]);

  const frontTexture = useTexture(frontPath);
  const [backStep, setBackStep] = useState(0);

  // 🎯 自動化核心 2：根據數據中的 backStepsCount，自動循環推算生成全小寫的連續步驟圖路徑數組
  const backPaths = useMemo(() => {
    const count = trade.backStepsCount || 1;
    return Array.from({ length: count }, (_, i) => `/images/trades/${trade.slug}/back-${i + 1}.png`);
  }, [trade.slug, trade.backStepsCount]);

  const backTextures = useTexture(backPaths);

  useMemo(() => {
    [frontTexture, ...backTextures].forEach((tex) => {
      if (tex) {
        tex.anisotropy = 16;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
      }
    });
  }, [frontTexture, backTextures]);

  const currentBackTexture = backTextures[backStep] || backTextures[0];

  const { width, height } = useMemo(() => {
    const img = frontTexture.image as HTMLImageElement;
    const imgWidth = img?.width || 1080;
    const imgHeight = img?.height || 1920;
    return { width: 3.5, height: 3.5 / (imgWidth / imgHeight) };
  }, [frontTexture]);

  const [clicked, setClicked] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentGlobalStep = useMemo(() => {
    return isFlipped ? backStep + 1 : 0;
  }, [isFlipped, backStep]);

  useEffect(() => {
    if (onStepChange) onStepChange(currentGlobalStep);
  }, [currentGlobalStep, onStepChange]);

  const { springZ, springRotY } = useSpring({
    springZ: clicked ? -0.4 : 0,
    springRotY: isFlipped ? Math.PI : 0,
    config: { mass: 1, tension: 400, friction: 22 },
    onRest: () => setClicked(false)
  });

  const handleCardClick = (e: any) => {
    e.stopPropagation();
    const uv = e.uv;
    if (!uv) return;

    if (!isFlipped) {
      if (uv.y > 0.28 && uv.y < 0.36 && uv.x > 0.05 && uv.x < 0.95) {
        setClicked(true);
        setTimeout(() => {
          setBackStep(0); 
          setIsFlipped(true); 
        }, 80);
      }
    } else {
      if (uv.y < 0.4) {
        setClicked(true);
        if (backStep < backTextures.length - 1) {
          setBackStep(prev => prev + 1);
        } else {
          setTimeout(() => { setIsFlipped(false); }, 80);
        }
      }
      if (uv.y > 0.85) {
        setClicked(true);
        setTimeout(() => { setIsFlipped(false); }, 80);
      }
    }
  };

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.5}>
      {/* @ts-ignore */}
      <animated.group position-z={springZ} rotation-y={springRotY} onClick={handleCardClick}>
        <RoundedBox args={[width + 0.12, height + 0.12, 0.12]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial color="#080808" metalness={0.95} roughness={0.15} reflectivity={1} envMapIntensity={1.5} />
        </RoundedBox>
        <mesh position={[0, 0, 0.061]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={frontTexture} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.061]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={currentBackTexture} toneMapped={false} />
        </mesh>
        <RoundedBox args={[width + 0.15, height + 0.15, 0.08]} radius={0.1} smoothness={4} position={[0, 0, -0.01]}>
          <meshBasicMaterial color="#00ffff" transparent opacity={0.1} wireframe />
        </RoundedBox>
      </animated.group>
    </Float>
  );
}

export default function TradeCardCinematic({ trade, locale, onStepChange }: { trade: TradeLog, locale: string, onStepChange?: (step: number) => void }) {
  return (
    <div className="h-full w-full outline-none">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true, outputColorSpace: THREE.SRGBColorSpace }}>
        <PerspectiveCamera makeDefault position={[0, 0, 11.5]} fov={35} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} /> 
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#00ffff" />
        <Suspense fallback={null}>
          <PremiumCard trade={trade} locale={locale} onStepChange={onStepChange} />
          <Environment preset="studio" />
        </Suspense>
        <ContactShadows position={[0, -3.8, 0]} opacity={0.4} scale={15} blur={2.5} far={10} />
        <OrbitControls enablePan={false} enableZoom={true} autoRotate={true} autoRotateSpeed={1.2} enableDamping={true} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.6} />
      </Canvas>
    </div>
  );
}
