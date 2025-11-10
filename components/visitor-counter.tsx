"use client";

import { useEffect } from "react";
import { database } from "@/lib/firebase";
import { ref, runTransaction } from "firebase/database";

export function VisitorCounter() {
  useEffect(() => {
    const incrementVisitorCount = async () => {
      // セッションストレージでカウント済みかチェック
      const hasVisited = sessionStorage.getItem("hasVisited");
      
      if (!hasVisited) {
        try {
          const visitorRef = ref(database, "visitorCount");
          
          await runTransaction(visitorRef, (currentCount) => {
            return (currentCount || 0) + 1;
          });
          
          // セッションストレージにマーク
          sessionStorage.setItem("hasVisited", "true");
        } catch (error) {
          console.error("訪問者カウントの更新に失敗しました:", error);
        }
      }
    };

    incrementVisitorCount();
  }, []);

  return null; // UIは表示しない
}
