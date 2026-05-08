export default function GlowBackground() {
  return (
    <>
      {/* 左上 Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />

      {/* 右下 Glow */}
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-500/20 blur-[140px] rounded-full" />
    </>
  );
}