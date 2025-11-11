"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, MessageCircle, ClipboardCheck } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const router = useRouter()
  const [, setHoveredPromise] = useState<number | null>(null)
  const [showCheckBanner, setShowCheckBanner] = useState(false)

  useEffect(() => {
    // 理解度チェックが完了しているか確認
    const hasVoted = localStorage.getItem("ruleUnderstandingVoted")
    
    if (!hasVoted) {
      // 未回答の場合、バナーを表示
      setShowCheckBanner(true)
      
      // 3秒後に自動的にチェックページへリダイレクト
      const timer = setTimeout(() => {
        router.push("/check")
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 理解度チェック促進バナー */}
      {showCheckBanner && (
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 px-4 sm:px-6 relative animate-in slide-in-from-top duration-500">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <p className="text-sm sm:text-base font-medium truncate">
                校則についてのアンケートにご協力ください（3秒後に自動移動します）
              </p>
            </div>
            <Link
              href="/check"
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors"
            >
              今すぐ回答
            </Link>
          </div>
        </div>
      )}
      
      <header className="border-b border-border backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-xs text-muted-foreground font-medium truncate">2年D組</p>
              <h1 className="text-base sm:text-lg font-semibold text-primary truncate">徳田 太祐</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              href="/check"
              className="text-xs sm:text-sm px-2 sm:px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white smooth-transition whitespace-nowrap font-medium"
            >
              校則理解度チェック
            </Link>
            <Link
              href="/policy"
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg border border-border hover:border-primary text-foreground hover:text-primary smooth-transition whitespace-nowrap"
            >
              詳しく読む
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-accent">生徒会立候補 2025</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-4 sm:mb-6 text-balance">
            校則を強制から
            <br />
            納得へ
          </h2>

          <p className="text-base sm:text-lg text-foreground/75 leading-relaxed max-w-3xl mb-3 sm:mb-4 text-pretty font-light">
            校則は「ただ守るもの」ではなく、理由を理解して自分から守れるものが本来の姿です。
            <br className="hidden sm:block" />
            学校を「管理から協力へ」と変えるために、一緒に行動しましょう。
          </p>
          <p className="text-sm sm:text-base text-foreground/60 max-w-3xl mb-8 sm:mb-10 font-light">
            2年D組の徳田太祐です。皆さんの一票が、新しい学校の一歩になります。
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/check"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-600 smooth-transition group text-sm sm:text-base shadow-lg shadow-green-500/30"
            >
              <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              校則理解度チェック（10秒）
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 smooth-transition" />
            </Link>
            <Link
              href="/policy"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary/90 smooth-transition group text-sm sm:text-base"
            >
              公約を見る
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 smooth-transition" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promises Section */}
      <section id="promises" className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3">
              主な公約
            </h3>
            <p className="text-base sm:text-lg text-foreground/60">2つの公約で、学校をみんなのものに</p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 mb-8 sm:mb-12">
            {/* Promise Card 1 */}
            <div
              className="group p-6 sm:p-8 rounded-xl bg-card border border-border hover:border-primary/40 smooth-transition overflow-hidden"
              onMouseEnter={() => setHoveredPromise(1)}
              onMouseLeave={() => setHoveredPromise(null)}
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/15 rounded-lg flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/25 smooth-transition border border-primary/20">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                  校則を「理解する」ものに
                </h4>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  校則が作られた理由を分かりやすくまとめた「校則ガイド」を作ります。理由が分かれば、守ることは強制ではなく納得になります。
                </p>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border opacity-0 group-hover:opacity-100 smooth-transition">
                  <p className="text-xs sm:text-sm font-medium text-primary">詳しく読む →</p>
                </div>
              </div>
            </div>

            {/* Promise Card 2 */}
            <div
              className="group p-6 sm:p-8 rounded-xl bg-card border border-border hover:border-accent/40 smooth-transition overflow-hidden"
              onMouseEnter={() => setHoveredPromise(2)}
              onMouseLeave={() => setHoveredPromise(null)}
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/15 rounded-lg flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-accent/25 smooth-transition border border-accent/20">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                  生徒の意見が届く仕組み
                </h4>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  意見ボックスや匿名フォームを活用して、誰でも意見を出せるようにします。集まった声は生徒会が整理し、定期的に先生方へ提案します。
                </p>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border opacity-0 group-hover:opacity-100 smooth-transition">
                  <p className="text-xs sm:text-sm font-medium text-accent">詳しく読む →</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/policy"
              className="inline-flex items-center gap-2 text-primary border border-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary/10 smooth-transition group text-sm sm:text-base"
            >
              すべての公約を読む
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 smooth-transition" />
            </Link>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-12 sm:py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8">生徒会の役割</h3>
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-foreground/75 leading-relaxed space-y-6 dark:prose-invert">
            <p className="text-base sm:text-lg leading-relaxed">
              生徒会は、命令する場所ではありません。生徒と学校をつなぐ「橋」だと考えています。
              その橋を、もっと強く、太く、確かなものにします。
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              文部科学省の「生徒指導提要」にも書かれているように、
              校則は「生徒が安心して学校生活を送るためのルール」であり、
              「自分のものとして捉え、自主的に守れるようにすることが大切」です。
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              校則は「変えてはいけないもの」ではなく、みんなで考えていくものです。
              そして校則も、学校も、みんなで作り上げるものです。
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-balance">
            みんなの声が
            <br />
            <span className="text-primary">学校を作ります</span>
          </h3>
          <p className="text-base sm:text-lg text-foreground/65 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            皆さんの一票が、新しい学校の一歩になります。どうか、僕に力を貸してください。
          </p>
          <Link
            href="/policy"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary/90 smooth-transition group text-sm sm:text-base"
          >
            詳しい内容を読む
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 smooth-transition" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                </div>
                <span className="font-semibold text-primary text-sm sm:text-base">2年D組</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/60">徳田 太祐</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">リンク</p>
              <div className="space-y-1.5 sm:space-y-2">
                <Link
                  href="/check"
                  className="text-xs sm:text-sm text-foreground/60 hover:text-primary smooth-transition block"
                >
                  理解度チェック
                </Link>
                <Link
                  href="/policy"
                  className="text-xs sm:text-sm text-foreground/60 hover:text-primary smooth-transition block"
                >
                  詳しい公約
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 sm:pt-8 text-center text-xs text-foreground/50">
            <p>© 2025 2年D組 徳田太祐. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
