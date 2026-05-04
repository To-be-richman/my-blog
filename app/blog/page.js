import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default async function BlogPage() {
  const { data, error } = await supabase.from("post").select("*");

  console.log("数据:", data);
  console.log("错误:", error);

  if (error) {
    return <div>出错了：{error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>暂无文章（数据库没读到数据）</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h1 style={{ marginBottom: "20px" }}>我的文章</h1>

      {data.map((post) => (
        <Link key={post.id} href={`/blog/${post.id}`}>
          <div className="card">
            <h2 className="card-title">{post.title}</h2>
            <p className="card-date">{post.date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}