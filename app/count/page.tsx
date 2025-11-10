"use client";

import { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CountPage() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const visitorRef = ref(database, "visitorCount");
    
    const unsubscribe = onValue(visitorRef, (snapshot) => {
      const count = snapshot.val();
      setVisitorCount(count || 0);
      setLoading(false);
    }, (error) => {
      console.error("訪問者数の取得に失敗しました:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">訪問者数</CardTitle>
          <CardDescription>サイトの総訪問者数を表示しています</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="py-8">
              <p className="text-6xl font-bold text-indigo-600 mb-2">
                {visitorCount?.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">人の訪問者</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
