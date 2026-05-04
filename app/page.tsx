"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));

      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data() as any;
        return {
          id: doc.id,
          ...docData,
        };
      });

      setPosts(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div className="p-5 border rounded-xl shadow hover:shadow-lg transition cursor-pointer">
              <h2 className="text-xl font-semibold">
                {post.title || "No Title"}
              </h2>
              <p className="text-gray-600 mt-2">
                {post.content || ""}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                {post.date || ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}