/* ==========================================================
   CYAN HEART — index.js
   1. Language gate  2. Camera-boot preloader  3. i18n
   4. HUD clock / header  5. Scroll reveal  6. Video fallbacks
   7. Gallery lightbox
   ========================================================== */
(function () {
  "use strict";

  var doc = document;
  var html = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  html.classList.add("js");

  /* ---------- 3. i18n: English lives in the HTML, Japanese here ---------- */
  var JA = {
    "skip": "本文へスキップ",
    "nav.world": "世界", "nav.facility": "施設", "nav.device": "デバイス", "nav.gallery": "映像", "nav.specs": "データ",
    "cta.steamShort": "Steamで入手", "cta.buy": "Steamで購入", "cta.demo": "無料体験版をプレイ", "cta.trailer": "トレーラーを見る",
    "hero.kicker": "「自撮り視点」で追体験する、サイコロジカルホラー探索アドベンチャー",
    "hero.tag": "見届けよう、彼女の残したかった記録を。",
    "hero.lede": "少女は自分を撮り続ける。進む先は、あなたには見えない。画面越しに背後や足元を確かめ、カメラが捉えた違和感を手がかりに、まだ誰かがいるかのように動き続ける施設の最奥へ彼女を導こう。",
    "hero.pause": "動画を一時停止", "hero.play": "動画を再生", "hero.scroll": "再生開始",
    "chip.reviews": "非常に好評", "chip.reviewsSub": "Steamレビュー", "chip.sold": "本を発売直後に販売", "chip.award": "オフィシャルセレクション",
    "play.title": "見えるのは、彼女が撮ったものだけ",
    "play.sub": "Cyan Heartは、異色の「自撮り視点」で追体験するホラー探索パズルアドベンチャー。カメラは常に彼女自身を映し、進行方向だけが見えない。",
    "play.s1t": "背後を見守る", "play.s1": "画面越しに背後や足元を確認する。何かが近づいてきたら、彼女より先にあなたが気づく。",
    "play.s2t": "見えない先へ進む", "play.s2": "進行方向が見えない独特な操作感。一歩一歩を、映像から読み取って決める。",
    "play.s3t": "記録を疑う", "play.s3": "時系列の矛盾、映像のわずかな違和感。そのすべてが、真実への鍵となる。",
    "world.title": "シアン色に染まった世界",
    "world.mName": "マゼンタハート", "world.m": "この世界の生活は、あらゆる物理現象を永遠に模倣し続ける特異なエネルギーによって成り立っていた。",
    "world.m1": "炎の熱を模倣すれば、消えることなく燃え続ける熱源に。", "world.m2": "大きな衝撃を模倣すれば、常に稼働し続ける削岩機に。",
    "world.cName": "シアン", "world.c": "しかし、突如そのエネルギーはシアン色へと変化した。機能は保たれている。だが、もう安定してはいない。",
    "world.c1": "形をもつ物なら、全てをシアン色に変化させる。", "world.c2": "その影響は、生物や機械までも狂わせていく。",
    "fac.title": "放棄された施設の最奥へ",
    "fac.p1": "「シアン」の侵食を食い止める何かがあると噂される施設。少女はたったひとり、そこへ足を踏み入れる。",
    "fac.p2": "「シアン」が持つ永遠という特徴上、人のいない施設であるのにも関わらず、まだ人がいるかのように振る舞い続ける。",
    "fac.p3": "模倣現象を時に避け、時に利用しながら、最奥にあると噂される何かを回収しよう。",
    "tag.horror": "サイコロジカルホラー", "tag.scifi": "SF", "tag.atmos": "雰囲気", "tag.puzzle": "探索パズル",
    "dev.title": "記録デバイス「CSZ8x2」",
    "dev.sub": "彼女のカメラは、あなたの唯一の窓であり、道具であり、外との唯一のつながり。",
    "dev.k1": "撮影", "dev.v1": "彼女が見たもの、そして背後にあるものすべてを記録する。",
    "dev.k2": "調査", "dev.v2": "カメラを正面に向けて物を調べたり、機械にアクセスできる。",
    "dev.k3": "通信", "dev.v3": "仲間からの音声通信を頼りに、謎解きのヒントを得る。",
    "dev.k4": "上下", "dev.v4": "時にはカメラを上や下に向けることも重要だ。",
    "dev.k5": "ログ", "dev.v5": "すべての記録は残る。断片的な記録をつなぎ合わせよう。",
    "ask.q1": "なぜ少女は独りで探索をしているのか。", "ask.q2": "目指す何かとは何なのか。", "ask.q3": "「シアン」の正体とは。",
    "ask.a": "あなたは少女の持つカメラを通して知ることになる。",
    "tr.title": "リリーストレーラー", "tr.fallback": "Steamでトレーラーを見る",
    "gal.title": "回収された映像", "gal.sub": "フレームを選ぶと拡大表示します。",
    "sp.title": "記録されているすべて", "sp.about": "概要",
    "sp.dev": "開発 / 販売", "sp.release": "発売日", "sp.releaseV": "2026年10月8日", "sp.genre": "ジャンル", "sp.genreV": "アドベンチャー、インディー",
    "sp.price": "価格", "sp.priceV": "Steamで$10.99（無料体験版あり）", "sp.platform": "対応機種", "sp.platformV": "Windows（Steam）。Nintendo Switch版もリリース予定。",
    "sp.features": "機能", "sp.f1": "シングルプレイヤー", "sp.f2": "Steam実績 5個", "sp.f3": "Steamクラウド", "sp.f4": "ファミリーシェアリング", "sp.f5": "Steam Deck：プレイ可能",
    "sp.langs": "8言語対応", "sp.langsNote": "インターフェイスと字幕",
    "sp.sys": "システム要件", "sp.min": "最低", "sp.rec": "推奨", "sp.storage": "ストレージ",
    "sp.stream": "配信歓迎", "sp.streamP": "配信・録画・収益化は制限なく100%可能です。概要欄にSteamページへのリンクを貼っていただけると嬉しいです。",
    "sp.news": "最新の通信", "sp.n1": "Ver1.1.4：韓国語対応とバグ修正", "sp.n2": "販売本数1,000本突破", "sp.n3": "Steamにて配信開始",
    "sp.ai": "ひとりで作られたゲーム", "sp.aiP": "Cyan Heartは個人開発者による作品です。AIの使用は、日本語以外のローカライズ（将来的にプロの翻訳へ置き換え予定）と、テクスチャ1枚の手直しのみ。それ以外はすべて人の手で作られています。",
    "fin.title": "記録が、あなたを待っている。", "fin.sub": "カメラを手に取り、彼女が残したものを見届けよう。",
    "foot.top": "トップへ戻る", "foot.rights": "Cyan Heartおよびゲーム内アートワークの権利は制作者に帰属します。", "foot.credit": "ウェブサイト制作：",
    "lb.prev": "前へ", "lb.next": "次へ", "lb.close": "閉じる",
    "alt.corridor": "暗い通路で自分を撮影する少女と、音声メッセージを表示するCSZ8x2のログ",
    "alt.exterior": "霧に包まれた巨大な施設の外通路", "alt.dark": "真っ暗な部屋で一つの光に照らされる少女",
    "alt.control": "カメラ越しに見たSite A-1の制御室。ミニマップとログパネル付き",
    "alt.g1": "「不明な接続」の文字と少女のクローズアップ", "alt.g2": "Site A-1の制御室", "alt.g3": "暗い通路で音声通信を受ける少女", "alt.g4": "陽の差すガラス張りのアトリウムに立つ少女",
    "alt.g5": "シアンの光に照らされ驚いた表情の少女", "alt.g6": "施設の外通路", "alt.g7": "屋外の少女と、背後に浮かぶシアン色の光", "alt.g8": "真っ暗な部屋の少女"
  };
  var EN = {};
  var textNodes = doc.querySelectorAll("[data-i18n]");
  var altNodes = doc.querySelectorAll("[data-i18n-alt]");
  textNodes.forEach(function (el) { EN[el.dataset.i18n] = el.textContent; });
  altNodes.forEach(function (el) { EN[el.dataset.i18nAlt] = el.getAttribute("alt"); });
  EN["hero.play"] = "Play video";

  var currentLang = "en";
  function t(key) { return (currentLang === "ja" && JA[key]) || EN[key] || ""; }

  function setLang(lang) {
    currentLang = lang === "ja" ? "ja" : "en";
    html.lang = currentLang;
    textNodes.forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    altNodes.forEach(function (el) { el.setAttribute("alt", t(el.dataset.i18nAlt)); });
    doc.querySelectorAll(".lang__btn").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === currentLang));
    });
    doc.title = currentLang === "ja"
      ? "Cyan Heart | 「自撮り視点」サイコロジカルホラー探索アドベンチャー"
      : "Cyan Heart | Selfie-Perspective Psychological Horror Adventure on Steam";
    syncPauseLabel();
    try { localStorage.setItem("ch-lang", currentLang); } catch (e) { /* storage unavailable */ }
  }
  doc.querySelectorAll(".lang__btn").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });

  /* ---------- 1. Language gate ---------- */
  var gate = doc.getElementById("gate");
  var boot = doc.getElementById("boot");
  var saved = null;
  try { saved = localStorage.getItem("ch-lang"); } catch (e) { /* ignore */ }
  var gateBtns = gate.querySelectorAll(".gate__btn");
  (saved === "ja" ? gateBtns[1] : gateBtns[0]).focus();

  gateBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      setLang(b.dataset.lang);
      gate.classList.add("is-gone");
      runBoot();
    });
  });
  // Keep keyboard focus inside the gate while it is open
  gate.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    e.preventDefault();
    (doc.activeElement === gateBtns[0] ? gateBtns[1] : gateBtns[0]).focus();
  });

  /* ---------- 2. Preloader: the CSZ8x2 boots, Magenta turns Cyan ---------- */
  var BOOT_LINES = {
    en: [
      ["CSZ8x2 RECORDING DEVICE // BOOT", ""],
      ["> lens ............... OK", ""],
      ["> voice link ......... OK", ""],
      ["> data log ........... OK", ""],
      ["> energy: MAGENTA HEART", ""],
      ["! anomaly: hue shift detected", "is-warn"],
      ["> energy: CYAN", "cyan"],
      ["Unknown connection", "is-key"],
      ["[Video Recording Started] 09:21", "rec"]
    ],
    ja: [
      ["CSZ8x2 記録デバイス // 起動", ""],
      ["> レンズ ............. OK", ""],
      ["> 音声通信 ........... OK", ""],
      ["> ログ記録 ........... OK", ""],
      ["> エネルギー：マゼンタハート", ""],
      ["! 異常：色相の変化を検出", "is-warn"],
      ["> エネルギー：シアン", "cyan"],
      ["不明な接続", "is-key"],
      ["[録画開始] 09:21", "rec"]
    ]
  };
  var bootTimer = null;
  var bootDone = false;

  function runBoot() {
    var log = doc.getElementById("boot-log");
    var fill = doc.getElementById("boot-fill");
    var pct = doc.getElementById("boot-pct");
    var label = doc.getElementById("boot-label");
    var lines = BOOT_LINES[currentLang];
    var skip = doc.getElementById("boot-skip");
    doc.getElementById("boot-status").textContent = currentLang === "ja" ? "読み込み中" : "Loading";
    skip.textContent = currentLang === "ja" ? "スキップ" : "Skip";
    label.textContent = currentLang === "ja" ? "色相" : "HUE";
    boot.hidden = false;
    skip.focus({ preventScroll: true });
    skip.addEventListener("click", finishBoot);

    var i = 0;
    var step = reduceMotion ? 60 : 420;
    function next() {
      if (bootDone) return;
      if (i >= lines.length) { bootTimer = setTimeout(finishBoot, reduceMotion ? 300 : 800); return; }
      var p = doc.createElement("p");
      p.textContent = lines[i][0];
      var flag = lines[i][1];
      if (flag === "is-warn" || flag === "is-key") p.className = flag;
      if (flag === "cyan") { boot.classList.add("is-cyan"); p.className = "is-key"; }
      if (flag === "rec") boot.classList.add("is-rec");
      log.appendChild(p);
      i += 1;
      var v = Math.round((i / lines.length) * 100);
      fill.style.width = v + "%";
      pct.textContent = v + "%";
      bootTimer = setTimeout(next, flag === "is-warn" ? step * 2 : step);
    }
    bootTimer = setTimeout(next, reduceMotion ? 50 : 700);
  }

  function finishBoot() {
    if (bootDone) return;
    bootDone = true;
    clearTimeout(bootTimer);
    boot.classList.add("is-out");
    doc.body.classList.remove("is-locked");
    setTimeout(function () {
      boot.hidden = true;
      gate.hidden = true;
      startHeroVideo();
      var main = doc.getElementById("main");
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }, reduceMotion ? 50 : 600);
  }

  /* ---------- 4. HUD clock + header state ---------- */
  var clock = doc.getElementById("hud-clock");
  var seconds = 9 * 3600 + 21 * 60;
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  setInterval(function () {
    seconds += 1;
    clock.textContent = pad(Math.floor(seconds / 3600) % 24) + ":" + pad(Math.floor(seconds / 60) % 60) + ":" + pad(seconds % 60);
  }, 1000);

  var top = doc.querySelector(".top");
  function onScroll() { top.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 5. Scroll reveal ---------- */
  var revealEls = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el, idx) {
      el.style.transitionDelay = (idx % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- 6. Video: plays if assets/trailer.mp4 exists, falls back if not ---------- */
  var heroVideo = doc.getElementById("hero-video");
  var pauseBtn = doc.getElementById("hero-pause");
  var player = doc.getElementById("player");
  var trailer = doc.getElementById("trailer-video");

  function syncPauseLabel() {
    if (!pauseBtn) return;
    var paused = heroVideo.paused;
    pauseBtn.textContent = t(paused ? "hero.play" : "hero.pause");
    pauseBtn.setAttribute("aria-pressed", String(paused));
  }
  function startHeroVideo() {
    if (heroVideo.dataset.failed) return;
    heroVideo.addEventListener("canplay", function () {
      heroVideo.classList.add("is-on");
      pauseBtn.hidden = false;
      if (!reduceMotion) { var p = heroVideo.play(); if (p && p.catch) p.catch(function () {}); }
      syncPauseLabel();
    }, { once: true });
    heroVideo.load();
  }
  heroVideo.querySelector("source").addEventListener("error", function () { heroVideo.dataset.failed = "1"; });
  pauseBtn.addEventListener("click", function () {
    if (heroVideo.paused) heroVideo.play(); else heroVideo.pause();
    syncPauseLabel();
  });
  heroVideo.addEventListener("play", syncPauseLabel);
  heroVideo.addEventListener("pause", syncPauseLabel);

  // Trailer section: probe the file once; show the Steam link card if it is missing
  var probe = doc.createElement("video");
  probe.preload = "metadata";
  probe.addEventListener("error", function () { player.classList.add("no-video"); });
  probe.src = trailer.querySelector("source").getAttribute("src");

  /* ---------- 7. Gallery lightbox ---------- */
  var lb = doc.getElementById("lightbox");
  var lbImg = doc.getElementById("lightbox-img");
  var lbCount = doc.getElementById("lb-count");
  var frames = Array.prototype.slice.call(doc.querySelectorAll(".frame"));
  var lbIndex = 0;
  function showFrame(n) {
    lbIndex = (n + frames.length) % frames.length;
    var f = frames[lbIndex];
    lbImg.src = f.dataset.full;
    lbImg.alt = f.querySelector("img").alt;
    lbCount.textContent = (lbIndex + 1) + " / " + frames.length;
  }
  frames.forEach(function (f, n) {
    f.addEventListener("click", function () {
      showFrame(n);
      if (lb.showModal) lb.showModal(); else window.open(f.dataset.full, "_blank", "noopener");
    });
  });
  doc.getElementById("lb-prev").addEventListener("click", function () { showFrame(lbIndex - 1); });
  doc.getElementById("lb-next").addEventListener("click", function () { showFrame(lbIndex + 1); });
  doc.getElementById("lb-close").addEventListener("click", function () { lb.close(); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") showFrame(lbIndex - 1);
    if (e.key === "ArrowRight") showFrame(lbIndex + 1);
  });
  lb.addEventListener("close", function () { frames[lbIndex].focus(); });
})();
