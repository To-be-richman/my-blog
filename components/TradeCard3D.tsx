"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { RoundedBox, Float, Environment, ContactShadows, PresentationControls, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { TradeLog } from "@/lib/trades";

function CardModel({ trade }: { trade: TradeLog }) {
  // ✅ 1. 加载纹理并强制设置参数
  const texture = useTexture(trade.screenshot);
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* ✅ 2. 核心改进：单一 RoundedBox 使用材质阵列
            材质顺序：[右, 左, 上, 下, 正面(4), 背面] */}
        <RoundedBox args={[3.2, 5, 0.12]} radius={0.08} smoothness={4}>
          <meshStandardMaterial attach="material-0" color="#0a0a0a" metalness={0.8} />
          <meshStandardMaterial attach="material-1" color="#0a0a0a" metalness={0.8} />
          <meshStandardMaterial attach="material-2" color="#0a0a0a" metalness={0.8} />
          <meshStandardMaterial attach="material-3" color="#0a0a0a" metalness={0.8} />
          {/* ✅ 正面贴图：强制置顶渲染 */}
          <meshBasicMaterial 
            attach="material-4" 
            map={texture} 
            toneMapped={false} 
            transparent={false}
          />
          <meshStandardMaterial attach="material-5" color="#050505" metalness={1} />
        </RoundedBox>

        <Text
          position={[0, 2.8, 0.1]}
          fontSize={0.28}
          color={trade.profit.startsWith('+') ? "#00ffcc" : "#ff4444"}
          textAlign="center"
        >
          {trade.profit}
        </Text>
      </group>
    </Float>
  );
}

export default function TradeCard3D({ trade }: { trade: TradeLog }) {
  return (
    <div className="h-[500px] w-full cursor-grab active:cursor-grabbing outline-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 42 }}
        gl={{ antialias: true, outputColorSpace: THREE.SRGBColorSpace, logarithmicDepthBuffer: true }}
      >
        <ambientLight intensity={1.5} /> 
        <pointLight position={[10, 10, 10]} intensity={2} />
        <PresentationControls global config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }} rotation={[0.1, 0.2, 0]} polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}>
          <Suspense fallback={null}>
            <CardModel trade={trade} />
          </Suspense>
        </PresentationControls>
        <ContactShadows position={[0, -3.2, 0]} opacity={0.4} scale={10} blur={2.8} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
