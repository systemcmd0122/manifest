"use client";

import { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
    <Card className="my-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span>校則の理解度</span>
              <span>{Math.round(understoodPercentage)}%が理解して守っています</span>
            </div>
            <Progress value={understoodPercentage} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p>理由を理解して守っている:</p>
              <p className="font-semibold text-foreground">{stats.understood}人</p>
            </div>
            <div>
              <p>理由はよく分からないが守っている:</p>
              <p className="font-semibold text-foreground">{stats.notUnderstood}人</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}