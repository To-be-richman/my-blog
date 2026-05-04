"use client";

import { useEffect, useState } from "react";
import { db } from "../../../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";

export default function EditPage() {
  const params = useParams();
  const id = params?.id as string;

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔥 读取原文章
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setContent(data.content || "");
        } else {
          alert("文章不存在");
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        alert("加载失败");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

  // 🔥 保存修改
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("标题和内容不能为空");
      return;
    }

    setSaving(true);

    try {
      await updateDoc(doc(db, "posts", id), {
        title,
        content,
      });

      alert("保存成功！");
      router.push(`/posts/${id}`);
    } catch (error) {
      console.error(error);
      alert("保存失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  // 🔥 Loading UI
  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

      <input
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        className="w-full border rounded-lg p-3 h-60 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post in Markdown..."
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-80 transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}