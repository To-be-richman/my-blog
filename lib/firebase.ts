import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

/**
 * ⚠️ 重要提示：
 * 请将下方的 YOUR_... 替换为你从 Firebase 控制台获取的真实密钥。
 * 如果你还没创建项目，请先在 Firebase 控制台创建一个 Web 项目。
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 检查是否已经初始化过，防止热重载报错
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 导出数据库实例
export const db: Firestore = getFirestore(app);
