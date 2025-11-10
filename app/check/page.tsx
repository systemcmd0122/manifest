"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { database } from "@/lib/firebase";
import { ref, increment, set, onValue } from "firebase/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function CheckPage() {
  const [checked, setChecked] = useState(false);
  const [todayCount, setTodayCount] = useState<number>(0);

  const handleCheck = async () => {
    if (checked) return;

    const date = new Date().toISOString().split('T')[0];
    const checkRef = ref(database, `ruleChecks/${date}`);

    await set(checkRef, increment(1));
    setChecked(true);
  };

  // 本日のチェック数を取得
  useEffect(() => {
    const date = new Date().toISOString().split('T')[0];
    const checkRef = ref(database, `ruleChecks/${date}`);

    const unsubscribe = onValue(checkRef, (snapshot) => {
      const count = snapshot.val() || 0;
      setTodayCount(count);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border py-4 sm:py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          <Link href="/" className="text-primary hover:opacity-70 transition-opacity shrink-0">
            <ArrowLeft className="w-5 h-5 sm:w-5 sm:h-5" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-primary flex-1">校則チェック</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>本日の校則チェック</CardTitle>
              <CardDescription>
                今日校則を守れているか確認した人数: {todayCount}人
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleCheck}
                disabled={checked}
                className="w-full"
                size="lg"
              >
                {checked ? "チェック済み" : "今日の校則チェックをする"}
              </Button>
            </CardContent>
          </Card>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>校則を守る意味</h2>
            <p>
              校則は単なるルールではありません。私たちが安心して学校生活を送るための大切な約束です。
              一人一人が理解し、自主的に守ることで、より良い学校環境を作ることができます。
            </p>
            <h2>日々のチェックの重要性</h2>
            <p>
              毎日の小さな確認が、大きな意識の変化につながります。
              このチェックを通じて、校則の意味を考え、より良い学校づくりに参加しましょう。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}