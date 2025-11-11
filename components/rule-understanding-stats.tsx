"use client";

import { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, CheckCircle2, Circle } from "lucide-react";

type UnderstandingStats = {
  understood: number;
  notUnderstood: number;
};

export function RuleUnderstandingStats() {
  const [stats, setStats] = useState<UnderstandingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const statsRef = ref(database, "ruleUnderstanding");
    
    const unsubscribe = onValue(statsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStats(data);
      } else {
        setStats({ understood: 0, notUnderstood: 0 });
      }
      setLoading(false);
    }, (error) => {
      console.error("統計データの取得に失敗しました:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-24 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  if (!stats) return null;

  const total = stats.understood + stats.notUnderstood;
  const understoodPercentage = total > 0 ? (stats.understood / total) * 100 : 0;

  return (
    <Card className="my-6 bg-gradient-to-br from-card to-muted/20 border-2">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">回答統計 (合計: {total}人)</span>
          </div>
          
          <div>
            <div className="flex justify-between mb-3">
              <span className="text-sm font-medium">理解度</span>
              <span className="text-lg font-bold text-primary">{Math.round(understoodPercentage)}%</span>
            </div>
            <Progress value={understoodPercentage} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {Math.round(understoodPercentage)}%の人が理由を理解して守っています
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-4 border-2 border-green-200 dark:border-green-900">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="text-xs text-muted-foreground">理解して守っている</p>
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.understood}<span className="text-sm ml-1">人</span></p>
            </div>
            <div className="bg-background rounded-lg p-4 border-2 border-blue-200 dark:border-blue-900">
              <div className="flex items-center gap-2 mb-2">
                <Circle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <p className="text-xs text-muted-foreground">分からないが守っている</p>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.notUnderstood}<span className="text-sm ml-1">人</span></p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}