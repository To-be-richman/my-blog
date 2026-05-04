"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        setPost(null);
      }
    };

    fetchPost();
  }, [id]);

  // 🗑 删除功能
  const handleDelete = async () => {
    const confirmDelete = confirm("确定要删除这篇文章吗？");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "posts", id));
    router.push("/"); // 删除后返回首页
  };

  // ✏️ 编辑跳转
  const handleEdit = () => {
    router.push(`/posts/${id}/edit`);
  };

  if (!post) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 relative">
      
      {/* 🔥 右上角 ⋯ */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xl px-2 py-1 hover:bg-gray-200 rounded"
        >
          ⋯
        </button>

        {/* 菜单 */}
        {menuOpen && (
          <div className="bg-white border shadow-md rounded mt-2 w-32">
            <button
              onClick={handleEdit}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* 内容 */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date}</p>

      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}