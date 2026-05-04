import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyB6xAMw7TqFU-0q2mu4e3b_tgytjivDBis",
  authDomain: "to-be-richman.firebaseapp.com",
  projectId: "to-be-richman",
  storageBucket: "to-be-richman.firebasestorage.app",
  messagingSenderId: "924124771202",
  appId: "1:924124771202:web:20f27a7617f47a58aed59b",
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 初始化 Firestore
export const db = getFirestore(app);