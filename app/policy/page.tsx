"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border py-4 sm:py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          <Link href="/" className="text-primary hover:opacity-70 transition-opacity flex-shrink-0">
            <ArrowLeft className="w-5 h-5 sm:w-5 sm:h-5" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-primary flex-1">公約の詳細</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Introduction Section */}
          <section className="mb-12 sm:mb-16 bg-muted/50 rounded-lg p-6 sm:p-8">
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80 mb-3 sm:mb-4">
              皆さん、こんにちは。2年D組の徳田太祐です。 今日は、僕が考える「もっと納得できる学校」について話します。
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
              校則についてです。文部科学省の「生徒指導提要」にはこう書かれています。
            </p>
            <blockquote className="mt-4 pl-4 sm:pl-6 border-l-4 border-primary/30 italic text-sm sm:text-base text-foreground/70">
              「校則は、生徒が安心して学校生活を送るためのルールであり、
              自分のものとして捉え、自主的に守れるようにすることが大切である。」
            </blockquote>
          </section>

          {/* Promise 1 */}
          <section className="mb-12 sm:mb-16">
            <div className="flex items-start gap-2 sm:gap-3 mb-4 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary-foreground text-sm sm:text-base">1</span>
              </div>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-primary leading-tight">
                校則を「守るだけ」から「理解して守る」ものへ
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6 text-foreground leading-relaxed text-sm sm:text-base">
              <p>
                つまり、校則は「ただ守うもの」ではなく、理由を理解して自分から守えるものが本来の姿です。
                さらに、文部科学省はこうも言っています。
              </p>

              <blockquote className="pl-4 sm:pl-6 border-l-4 border-primary/30 italic text-foreground/70">
                「校則は、学校や地域の実情に合わせて、必要に応じて見直すべきものである。」
              </blockquote>

              <p>つまり、校則は「変えてはいけないもの」ではなく、みんなで考えていくものです。</p>

              <p>
                でも、今の僕たちの学校を見てみるとどうでしょう。
                「理由はよく分からないけど、とりあえず守っている」という人が多いのではないでしょうか。
                本来、校則は納得して守えるものであるべきです。
              </p>

              <div className="bg-accent/10 p-5 sm:p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">具体的な取り組み</h3>
                <ul className="space-y-1.5 sm:space-y-2 ml-3 sm:ml-4 text-sm sm:text-base">
                  <li>校則が作られた理由を分かりやすくまとめた「校則ガイド」を作成</li>
                  <li>理由が分かれば、守ることは強制ではなく納得になります</li>
                  <li>定期的な見直しと改善</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="my-8 sm:my-12 border-t border-border"></div>

          {/* Promise 2 */}
          <section className="mb-12 sm:mb-16">
            <div className="flex items-start gap-2 sm:gap-3 mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-accent-foreground text-sm sm:text-base">2</span>
              </div>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-accent leading-tight">
                生徒の意見をより反映させられる学校にする
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6 text-foreground leading-relaxed text-sm sm:text-base">
              <p>良い学校を作るには、生徒の声が不可欠です。 そこで、次の2つの仕組みを作ります。</p>

              <div className="bg-accent/10 p-5 sm:p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">具体的な取り組み</h3>
                <ul className="space-y-1.5 sm:space-y-2 ml-3 sm:ml-4 text-sm sm:text-base">
                  <li>意見ボックスや匿名フォームを活用</li>
                  <li>誰でも気軽に意見を出せるように</li>
                  <li>集まった声は生徒会が整理</li>
                  <li>定期的に先生方へ提案</li>
                  <li>改善が実施されたら、必ず全校に報告</li>
                </ul>
              </div>

              <p>
                これが実現すれば、学校は「管理から協力へ」「強制から納得へ」と変わります。
                生徒一人ひとりが、自分たちの学校をより過ごしやすく、誇れる場所にすることができます。
              </p>
            </div>
          </section>

          {/* Message Section */}
          <section className="bg-primary/10 rounded-lg p-6 sm:p-8 md:p-10 my-12 sm:my-16">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">生徒会の役割について</h3>
            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed text-foreground">
              <p>
                生徒会は、命令する場所ではありません。 僕は、生徒と学校をつなぐ「橋」だと考えています。
                そしてその橋を、もっと強く、太く、確かなものにします。
              </p>
              <p className="font-semibold text-primary">皆さんの一票が、その一歩になります。</p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-6 sm:py-8">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">応援よろしくお願いします</h3>
            <p className="text-sm sm:text-base text-foreground leading-relaxed mb-6 max-w-xl mx-auto">
              どうか、僕に力を貸してください。
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              トップに戻る
            </Link>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 sm:py-8 px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">2年D組 徳田 太祐</p>
        </div>
      </footer>
    </div>
  )
}
