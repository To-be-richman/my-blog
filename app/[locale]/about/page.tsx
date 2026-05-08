import { getLocale } from "next-intl/server";

export default async function AboutPage() {
  const locale = await getLocale();

  const content = {
    en: {
      label: "ABOUT",

      title:
        "Observing systems beneath the noise.",

      body: [
        "I spend most of my time watching things people usually ignore.",

        "Power grids.\nSemiconductor capacity.\nLiquidity drains.\nCredit expansion.\nShipping routes.\nPolicy mistakes.\nHuman panic.",

        "Most headlines are noise.",

        "The real story usually starts underneath the surface.",

        "Where capital, fear, and incentives collide.",

        "Over the years, I’ve worked around semiconductors, infrastructure strategy, capital allocation, and long-cycle industry planning.",

        "Not the glamorous side of technology.",

        "The heavy side.",

        "Factories.\nSubstations.\nPackaging bottlenecks.\nPower constraints.\nTransformer shortages.",

        "The kind of systems that break slowly.",

        "Then all at once.",

        "Some people think markets move because of narratives.",

        "I stopped believing that a long time ago.",

        "2018 taught me how fast liquidity can disappear.\n2020 taught me that central banks would rather burn the future than tolerate deflation.\nAnd the AI boom taught me that most investors still confuse electricity consumption with innovation.",

        "Scars matter more than predictions.",

        "A lot of modern finance feels theatrical now.",

        "Everyone is selling certainty.\nEveryone has a framework.\nEveryone suddenly becomes a “long-term investor” during liquidity expansions.",

        "I’m not interested in that.",

        "I care more about what survives stress.",

        "This journal is mostly a collection of observations.",

        "Written during late nights, long flights, market panics, and periods where the world felt structurally unstable.",

        "Sometimes it’s about macro liquidity.",

        "Sometimes it’s about semiconductor expansion wars.",

        "And the absurd amount of money being burned just to shave milliseconds off compute latency.",

        "Sometimes it’s about Bitcoin.",

        "Not the cult.\nNot the slogans.",

        "Just the quiet, calculating loss of trust underneath the global fiat system.",

        "And sometimes it’s simply about human behavior.",

        "Greed repeats.\nFear repeats.\nLeverage repeats.",

        "Only the vocabulary changes.",

        "I have no appetite for financial entertainment, motivational optimism, or ideological tribes.",

        "I dislike slogans.\nI distrust consensus.\nAnd I’ve learned that clarity is less a talent than a survival mechanism.",

        "This site is not built to convince anyone.",

        "It’s simply a place to think clearly while the rest of the world gets louder.",

        "That is the only alpha I care about.",
      ],
    },

    jp: {
      label: "概要",

      title:
        "ノイズの奥にある構造を観察する。",

      body: [
        "私は普段、人が見落とすものを見ている。",

        "電力網。\n半導体供給能力。\n流動性の収縮。\n信用拡大。\n物流ルート。\n政策ミス。\n人間のパニック。",

        "ほとんどのニュースはノイズだ。",

        "本当の物語は、表面の下から始まる。",

        "資本、恐怖、インセンティブが衝突する場所で。",

        "これまで私は、半導体、インフラ戦略、資本配分、長期産業サイクルの周辺で仕事をしてきた。",

        "華やかなテクノロジー側ではない。",

        "もっと重い側だ。",

        "工場。\n変電所。\n先端パッケージのボトルネック。\n電力制約。\n変圧器不足。",

        "ゆっくり壊れるシステム。",

        "そして突然崩れる。",

        "市場は物語で動くと思っている人が多い。",

        "私はかなり前にそれを信じなくなった。",

        "2018年は、流動性がどれほど速く消えるかを教えた。\n2020年は、中央銀行がデフレを許すくらいなら未来を燃やすことを教えた。\nそしてAIブームは、多くの投資家がいまだに電力消費とイノベーションを混同していることを教えた。",

        "利益より傷跡の方が重要だ。",

        "今の金融市場は、どこか演劇みたいだ。",

        "誰もが確実性を売っている。\n誰もがフレームワークを持っている。\n流動性が増えると、急に全員が長期投資家になる。",

        "私はそこに興味がない。",

        "私が見ているのは、ストレスに耐えられるものだけだ。",

        "このジャーナルは、ほとんどが観察記録だ。",

        "深夜、長距離フライト、市場の混乱、世界が不安定に見えた時期に書かれたもの。",

        "マクロ流動性について書くこともある。",

        "半導体の拡張戦争について書くこともある。",

        "数ミリ秒の遅延を削るためだけに、異常な金額が燃やされている世界について。",

        "Bitcoinについて書くこともある。",

        "カルトではない。\nスローガンでもない。",

        "静かに、計算された形で進む法定通貨への信頼喪失だ。",

        "そして時には、単純に人間行動について。",

        "欲望は繰り返す。\n恐怖も繰り返す。\nレバレッジも繰り返す。",

        "変わるのは言葉だけだ。",

        "私は金融エンタメにも、前向きな自己啓発にも、思想コミュニティにも食欲がない。",

        "私はスローガンが嫌いだ。\nコンセンサスを信用しない。\nそして明晰さは才能ではなく、生存技術だと学んだ。",

        "このサイトは誰かを説得するためのものではない。",

        "世界が騒がしくなる中で、自分の頭を静かに保つための場所だ。",

        "それが、私が唯一気にしているアルファだ。",
      ],
    },

    tw: {
      label: "關於",

      title:
        "觀察噪音底下的系統。",

      body: [
        "我大部分時間，都在看人們忽略的東西。",

        "電網。\n半導體產能。\n流動性抽離。\n信用擴張。\n航運路線。\n政策失誤。\n人類恐慌。",

        "大部分新聞都是噪音。",

        "真正的故事，通常藏在表面之下。",

        "在資本、恐懼與利益碰撞的地方。",

        "這些年，我長期接觸半導體、基礎設施戰略、資本配置，以及長週期產業規劃。",

        "不是科技產業光鮮亮麗的那一面。",

        "而是沉重的那一面。",

        "工廠。\n變電站。\n先進封裝瓶頸。\n電力限制。\n變壓器短缺。",

        "那種慢慢崩壞的系統。",

        "然後瞬間失控。",

        "很多人以為市場是被敘事推動的。",

        "我很早以前就不再相信這件事。",

        "2018 年讓我知道流動性消失得有多快。\n2020 年讓我知道，央行寧願燃燒未來，也不願接受通縮。\n而 AI 狂熱則讓我看見，大多數投資人至今仍把耗電量誤認為創新。",

        "傷痕比預測更重要。",

        "現在很多金融市場，看起來更像一場表演。",

        "每個人都在販賣確定性。\n每個人都有自己的框架。\n流動性一多，所有人 suddenly 都變成長期投資者。",

        "我對那些東西沒興趣。",

        "我更在意什麼東西能撐過壓力。",

        "這個 Journal，大部分只是一些觀察紀錄。",

        "寫於深夜、長途飛行、市場恐慌，以及世界開始失去穩定感的時候。",

        "有時候是宏觀流動性。",

        "有時候是半導體擴產戰爭。",

        "以及那些只為了縮短幾毫秒延遲，就被瘋狂燒掉的資本。",

        "有時候是 Bitcoin。",

        "不是信仰。\n不是口號。",

        "而是全球法幣系統底下，那種安靜且理性的信任流失。",

        "有時候，也只是人類行為。",

        "貪婪會重複。\n恐懼會重複。\n槓桿會重複。",

        "改變的只有說法。",

        "我對金融娛樂、勵志敘事，以及意識形態圈子都沒有興趣。",

        "我討厭口號。\n我不相信共識。\n而我也慢慢明白，清醒不是天賦，而是一種生存能力。",

        "這個網站不是為了說服任何人。",

        "它只是讓我能在世界越來越吵的時候，繼續保持清醒。",

        "那是我唯一在意的 Alpha。",
      ],
    },
  };

  const current =
    content[
      locale as keyof typeof content
    ];

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-32">
        <div className="space-y-10">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            {current.label}
          </p>

          <h1
            className="
              text-5xl
              md:text-7xl
              font-bold
              leading-[0.95]
              tracking-tight
            "
          >
            {current.title}
          </h1>

          <div
            className="
              text-lg
              leading-[1.9]
              text-white/70
              space-y-8
            "
          >
            {current.body.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph
                    .split("\n")
                    .map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                </p>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}