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

// 内部卡片模型组件
function PremiumCard({ trade, locale }: { trade: TradeLog, locale: string }) {
  // 1. 获取当前语系（英文/繁体/日文）
  const currentLocale = (locale === 'en' || locale === 'tw' || locale === 'jp' ? locale : 'en') as 'en' | 'tw' | 'jp';
  
  // 2. 加载对应语系的图片纹理
  const texture = useTexture(trade.screenshots[currentLocale]);

  // 3. 计算图片尺寸比例，确保手机长图不拉伸
  const { width, height } = useMemo(() => {
    const img = texture.image as HTMLImageElement;
    const imgWidth = img?.width || 1080;
    const imgHeight = img?.height || 1920;
    const aspect = imgWidth / imgHeight;
    
    // 设定基准宽度为 3.5，高度根据比例自动推算
    let w = 3.5; 
    let h = w / aspect;
    
    // 针对特别长的图进行限高保护
    if (h > 6.2) {
      h = 6.2;
      w = h * aspect;
    }
    
    return { width: w, height: h };
  }, [texture, trade.id]);

  // 4. 点击交互动画：点击时卡片会往后弹一下
  const [clicked, setClicked] = useState(false);
  const { springZ } = useSpring({
    springZ: clicked ? -0.5 : 0,
    config: { mass: 1, tension: 500, friction: 15 },
    onRest: () => setClicked(false)
  });

  // 5. 优化贴图清晰度
  if (texture) {
    texture.anisotropy = 16;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.5}>
      {/* @ts-ignore */}
      <animated.group 
        position-z={springZ} 
        onClick={(e: any) => { 
          e.stopPropagation(); 
          setClicked(true); 
        }}
      >
        {/* 卡片黑色金属底座 */}
        <RoundedBox args={[width + 0.12, height + 0.12, 0.1]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial 
            color="#080808" 
            metalness={0.9} 
            roughness={0.12} 
            reflectivity={1}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        {/* 交易图片层 */}
        <mesh position={[0, 0, 0.052]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial 
            map={texture} 
            toneMapped={false} 
            transparent={false} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* 边缘青色微发光特效 */}
        <RoundedBox 
          args={[width + 0.15, height + 0.15, 0.08]} 
          radius={0.1} 
          smoothness={4} 
          position={[0, 0, -0.01]}
        >
          <meshBasicMaterial color="#00ffff" transparent opacity={0.1} wireframe />
        </RoundedBox>
      </animated.group>
    </Float>
  );
}

// 主导出组件
export default function TradeCardCinematic({ trade, locale }: { trade: TradeLog, locale: string }) {
  return (
    <div className="h-full w-full outline-none">
      <Canvas 
        dpr={[1, 2]} // ✅ 修正：之前这里写空了导致报错，现在设置为适配高清屏
        gl={{ 
          antialias: true, 
          alpha: true, 
          outputColorSpace: THREE.SRGBColorSpace 
        }}
      >
        {/* 设置相机位置，11.5 是最佳观察距离 */}
        <PerspectiveCamera makeDefault position={[0, 0, 11.5]} fov={35} />
        
        {/* 光照设置 */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#00ffff" />
        
        {/* 渲染模型 */}
        <Suspense fallback={null}>
          <PremiumCard trade={trade} locale={locale} />
          {/* 使用 studio 环境增加反光质感 */}
          <Environment preset="studio" />
        </Suspense>

        {/* 柔和的地面阴影 */}
        <ContactShadows position={[0, -3.8, 0]} opacity={0.4} scale={15} blur={2.5} far={10} />
        
        {/* 旋转控制 */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true}
          autoRotate={true}         // 开启自动旋转
          autoRotateSpeed={1.2}     // 慢速旋转，增加高级感
          enableDamping={true} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.6} 
        />
      </Canvas>
    </div>
  );
}
