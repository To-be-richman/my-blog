import { posts } from "../../data/posts";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <div>文章不存在</div>;
  }

  return (
    <div>

      {/* 🔥 Hero封面（Apple风） */}
      <div className="hero">

        {/* ✅ 用 next/image（更专业） */}
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          className="hero-img"
        />

        {/* 渐变遮罩 */}
        <div className="hero-overlay"></div>

        {/* 标题内容 */}
        <div className="hero-content">
          <h1>{post.title}</h1>
          <p>{post.date}</p>
        </div>
      </div>

      {/* 🔥 正文 */}
      <div className="article">
        <div className="article-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>

    </div>
  );
}