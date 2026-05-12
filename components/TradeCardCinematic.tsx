"use client";

import React, { Suspense, useMemo, useState } from "react";
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

function PremiumCard({ trade, locale }: { trade: TradeLog, locale: string }) {
  const currentLocale = (locale === 'en' || locale === 'tw' || locale === 'jp' ? locale : 'en') as 'en' | 'tw' | 'jp';
  
  // 加载对应语言的图片
  const texture = useTexture(trade.screenshots[currentLocale]);

  // ✅ 核心修复：通过类型断言 (as HTMLImageElement) 告诉 TypeScript 图片一定有宽和高
  const { width, height } = useMemo(() => {
    const img = texture.image as HTMLImageElement;
    const imgWidth = img?.width || 1080;
    const imgHeight = img?.height || 1920;
    const aspect = imgWidth / imgHeight;
    
    let w = 3.5; 
    let h = w / aspect;
    
    if (h > 6.2) {
      h = 6.2;
      w = h * aspect;
    }
    
    return { width: w, height: h };
  }, [texture]);

  // 点击动画
  const [clicked, setClicked] = useState(false);
  const { springZ } = useSpring({
    springZ: clicked ? -0.5 : 0,
    config: { mass: 1, tension: 500, friction: 15 },
    onRest: () => setClicked(false)
  });

  if (texture) {
    texture.anisotropy = 16;
    texture.colorSpace = THREE.SRGBColorSpace;
  }

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.5}>
      {/* @ts-ignore */}
      <animated.group 
        position-z={springZ} 
        onClick={(e: any) => { 
          e.stopPropagation(); 
          setClicked(true); 
        }}
      >
        <RoundedBox args={[width + 0.12, height + 0.12, 0.1]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial 
            color="#080808" 
            metalness={0.9} 
            roughness={0.1} 
            reflectivity={1}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial 
            map={texture} 
            toneMapped={false} 
            transparent={false} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      </animated.group>
    </Float>
  );
}

export default function TradeCardCinematic({ trade, locale }: { trade: TradeLog, locale: string }) {
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
          <PremiumCard trade={trade} locale={locale} />
          <Environment preset="studio" />
        </Suspense>

        <ContactShadows position={[0, -3.8, 0]} opacity={0.4} scale={15} blur={2.5} far={10} />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true}
          autoRotate={true}
          autoRotateSpeed={1.5}
          enableDamping={true}
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.6} 
        />
      </Canvas>
    </div>
  );
}
