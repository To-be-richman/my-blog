"use client";

import React, { Suspense, useMemo } from "react";
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
import * as THREE from "three";
import { TradeLog } from "@/lib/trades";

function PremiumCard({ trade }: { trade: TradeLog }) {
  const texture = useTexture(trade.screenshot);

  const { width, height } = useMemo(() => {
    const imgWidth = texture.image?.width || 1080;
    const imgHeight = texture.image?.height || 1920;
    const aspect = imgWidth / imgHeight;
    
    let w = 3.5; 
    let h = w / aspect;
    
    // 限制高度，确保长图不冲出屏幕
    if (h > 6.2) {
      h = 6.2;
      w = h * aspect;
    }
    
    return { width: w, height: h };
  }, [texture]);

  if (texture) {
    texture.anisotropy = 16;
    texture.colorSpace = THREE.SRGBColorSpace;
  }

  return (
    // 增加 Float 的漂浮感
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
      <group>
        {/* 钛金质感背板 */}
        <RoundedBox args={[width + 0.12, height + 0.12, 0.1]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial 
            color="#080808" 
            metalness={0.9} 
            roughness={0.1} 
            reflectivity={1}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        {/* 极致清晰图片层 */}
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={texture} toneMapped={false} transparent={false} side={THREE.DoubleSide} />
        </mesh>

        {/* 边缘青色流光感 */}
        <RoundedBox args={[width + 0.15, height + 0.15, 0.08]} radius={0.1} smoothness={4} position={[0, 0, -0.01]}>
          <meshBasicMaterial color="#00ffff" transparent opacity={0.12} wireframe />
        </RoundedBox>
      </group>
    </Float>
  );
}

export default function TradeCardCinematic({ trade }: { trade: TradeLog }) {
  return (
    <div className="h-full w-full outline-none">
      <Canvas 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true, outputColorSpace: THREE.SRGBColorSpace }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 11.5]} fov={38} />
        
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#00ffff" />
        
        <Suspense fallback={null}>
          <PremiumCard trade={trade} />
          <Environment preset="studio" />
        </Suspense>

        <ContactShadows position={[0, -3.8, 0]} opacity={0.4} scale={15} blur={2.5} far={10} />
        
        {/* ✅ 核心增强：开启自动旋转 */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true}
          autoRotate={true}         // 开启自动旋转
          autoRotateSpeed={1.5}     // 旋转速度，1.5 很丝滑，不晃眼
          enableDamping={true}      // 开启阻尼，让停止时的动作有“重量感”
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.6} 
        />
      </Canvas>
    </div>
  );
}
