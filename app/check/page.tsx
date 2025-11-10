"use client";

import { useState, useEffect } from "react";
import { database } from "@/lib/firebase";
import { ref, runTransaction } from "firebase/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RuleUnderstandingStats } from "@/components/rule-understanding-stats";

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">校則についての理解度チェック</CardTitle>
          <CardDescription>
            あなたは校則をどのように捉えていますか？
            正直な気持ちを選んでください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <RuleUnderstandingStats />
            {!hasVoted ? (
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => handleVote('understood')}
                  disabled={loading}
                  className="p-8 text-lg"
                  variant="outline"
                >
                  理由を理解して守っている
                </Button>
                <Button 
                  onClick={() => handleVote('notUnderstood')}
                  disabled={loading}
                  className="p-8 text-lg"
                  variant="outline"
                >
                  理由はよく分からないが守っている
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-green-600 dark:text-green-400 mb-4">
                  ご回答ありがとうございました！
                </p>
                <p className="text-muted-foreground">
                  この結果は、より良い校則づくりのための参考にさせていただきます。
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}