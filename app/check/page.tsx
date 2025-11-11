"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { database } from "@/lib/firebase";
import { ref, runTransaction } from "firebase/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RuleUnderstandingStats } from "@/components/rule-understanding-stats";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";

export default function CheckPage() {
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const voted = localStorage.getItem("ruleUnderstandingVoted");
    if (voted) {
      setHasVoted(true);
    }
  }, []);

  const handleVote = async (type: 'understood' | 'notUnderstood') => {
    if (loading || hasVoted) return;

    const voted = localStorage.getItem("ruleUnderstandingVoted");
    if (voted) {
      setHasVoted(true);
      return;
    }
    
    setLoading(true);
    const statsRef = ref(database, "ruleUnderstanding");
    
    try {
      await runTransaction(statsRef, (currentData) => {
        if (currentData === null) {
          return {
            understood: type === 'understood' ? 1 : 0,
            notUnderstood: type === 'notUnderstood' ? 1 : 0
          };
        }

        return {
          understood: currentData.understood + (type === 'understood' ? 1 : 0),
          notUnderstood: currentData.notUnderstood + (type === 'notUnderstood' ? 1 : 0)
        };
      });

      localStorage.setItem("ruleUnderstandingVoted", "true");
      setHasVoted(true);
    } catch (error) {
      console.error("投票の処理中にエラーが発生しました:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">トップページに戻る</span>
            <span className="sm:hidden">戻る</span>
          </Link>
          <div className="text-xs sm:text-sm text-muted-foreground font-medium">
            所要時間: 約10秒
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {!hasVoted ? (
          <div className="space-y-8">
            {/* Title Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">簡単アンケート</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                校則についての
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  理解度チェック
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                あなたは校則をどのように捉えていますか？<br className="hidden sm:block" />
                正直な気持ちを選んでください。
              </p>
            </div>

            {/* Stats Section */}
            <RuleUnderstandingStats />

            {/* Question Section */}
            <Card className="border-2 shadow-xl">
              <CardHeader className="bg-muted/30 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    Q
                  </div>
                  <div>
                    <CardTitle className="text-xl sm:text-2xl">あなたの気持ちに近いのは？</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      どちらか一つを選択してください
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="grid gap-4 sm:gap-5">
                  {/* Option 1 */}
                  <button
                    onClick={() => handleVote('understood')}
                    disabled={loading}
                    className="group relative overflow-hidden rounded-xl border-2 border-green-200 dark:border-green-900 bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-background p-6 sm:p-8 text-left transition-all hover:shadow-lg hover:scale-[1.02] hover:border-green-400 dark:hover:border-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center border-2 border-green-300 dark:border-green-700 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded">
                            選択肢 A
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground">
                          理由を理解して守っている
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          校則の目的や理由を理解した上で、納得して守っている
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-xs font-medium text-green-600 dark:text-green-400">
                        クリックして選択 →
                      </div>
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-4 text-muted-foreground font-medium">
                        または
                      </span>
                    </div>
                  </div>

                  {/* Option 2 */}
                  <button
                    onClick={() => handleVote('notUnderstood')}
                    disabled={loading}
                    className="group relative overflow-hidden rounded-xl border-2 border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-background p-6 sm:p-8 text-left transition-all hover:shadow-lg hover:scale-[1.02] hover:border-blue-400 dark:hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center border-2 border-blue-300 dark:border-blue-700 group-hover:scale-110 transition-transform">
                        <Circle className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">
                            選択肢 B
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground">
                          理由はよく分からないが守っている
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          校則の理由は明確ではないが、ルールとして守っている
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        クリックして選択 →
                      </div>
                    </div>
                  </button>
                </div>

                {loading && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span>回答を送信中...</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info Section */}
            <div className="text-center text-xs sm:text-sm text-muted-foreground space-y-2">
              <p>※ 回答は匿名で集計されます</p>
              <p>※ 一度回答すると変更できません</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Success Animation */}
            <div className="text-center space-y-6 py-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
                  <div className="relative rounded-full bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-950/30 p-6 border-4 border-green-200 dark:border-green-800">
                    <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">
                  ご回答ありがとうございました！
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
                  あなたの貴重なご意見は、より良い校則づくりのための参考にさせていただきます。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Link href="/">
                  <Button size="lg" className="w-full sm:w-auto">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    トップページに戻る
                  </Button>
                </Link>
                <Link href="/policy">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    公約を読む
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <RuleUnderstandingStats />
          </div>
        )}
      </div>
    </div>
  );
}