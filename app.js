/* =========================================================
   Py Pals — Python for Kids
   Single-file app logic: lessons, editors, sandboxed runner,
   progress/stars, sounds, confetti, parent dashboard.
   ========================================================= */

/* ---------- LESSON CONTENT ---------- */
const LESSONS = [
  {
    id: "printing",
    icon: "🗣️",
    title: "Printing Messages",
    blurb: "Make the computer talk!",
    learnText:
      "Computers can talk! The <code>print()</code> command shows a message on the screen. Just put your words inside quotes and parentheses, like magic words. ✨",
    visual: ["🖨️", "➡️", "💬", "🖥️"],
    example: {
      title: "Say Hi to the World!",
      desc: "This code prints a friendly hello and a silly joke.",
      code: `print("Hello, world!")\nprint("Why did the robot go on a diet? Too many bytes! 🤖")`,
    },
    practice: {
      task: "Change the name below and run it to say hi to YOU!",
      starter: `name = "Friend"\nprint("Hello, " + name + "! Welcome to Python!")`,
      hint: 'Try changing the word inside the quotes after "name = " to your own name!',
      answer: `name = "Alex"\nprint("Hello, " + name + "! Welcome to Python!")`,
      validate: (out) => /hello,/i.test(out) && /welcome to python/i.test(out),
      successMsg: "You printed your very own message!",
    },
  },
  {
    id: "variables",
    icon: "📦",
    title: "Variables",
    blurb: "Boxes for your stuff!",
    learnText:
      "A variable is like a labeled box that holds something for later — a number, a word, anything! You give the box a name, then put something inside using <code>=</code>.",
    visual: ["📦", "➡️", "🍬🍬🍬"],
    example: {
      title: "Toy Box Variables",
      desc: "We put a number of toys into a variable named toys, then print it.",
      code: `toys = 7\nprint("I have this many toys:")\nprint(toys)`,
    },
    practice: {
      task: "Change how many candies are in the box, then run it!",
      starter: `candies = 5\nprint("I have", candies, "candies!")`,
      hint: "Try changing the number 5 to any number you like — even a big one!",
      answer: `candies = 12\nprint("I have", candies, "candies!")`,
      validate: (out) => /candies!/i.test(out),
      successMsg: "Your box is holding a brand new number!",
    },
  },
  {
    id: "math",
    icon: "➕",
    title: "Simple Math",
    blurb: "Python does the math!",
    learnText:
      "Python can do math for you! Use <code>+</code> to add, <code>-</code> to subtract, <code>*</code> to multiply, and <code>/</code> to divide.",
    visual: ["🍎", "➕", "🍊", "=", "🍎🍊"],
    example: {
      title: "Snack Math",
      desc: "We add apples and oranges together.",
      code: `apples = 3\noranges = 2\ntotal = apples + oranges\nprint("Total snacks:", total)`,
    },
    practice: {
      task: "Change the numbers of apples and oranges, then run it to see the new total!",
      starter: `apples = 4\noranges = 5\ntotal = apples + oranges\nprint("Total snacks:", total)`,
      hint: "Change apples or oranges to different numbers — Python will add them up for you!",
      answer: `apples = 10\noranges = 6\ntotal = apples + oranges\nprint("Total snacks:", total)`,
      validate: (out) => /total snacks:/i.test(out),
      successMsg: "You did math with Python — great teamwork!",
    },
  },
  {
    id: "ifelse",
    icon: "🚦",
    title: "If This, Then That",
    blurb: "Let the computer decide!",
    learnText:
      "Sometimes we want the computer to decide! <code>if</code> checks something, and if it's true, it does one thing. <code>else</code> means 'otherwise, do this instead.'",
    visual: ["🚦", "❓", "🟢", "🔴"],
    example: {
      title: "Big Slide Checker",
      desc: "We check if someone is old enough for the big slide.",
      code: `age = 8\nif age >= 8:\n    print("You can ride the big slide! 🛝")\nelse:\n    print("Maybe next year! 🌱")`,
    },
    practice: {
      task: "Change age to a different number and run it — watch the message change!",
      starter: `age = 6\nif age >= 8:\n    print("You can ride the big slide! 🛝")\nelse:\n    print("Maybe next year! 🌱")`,
      hint: "Try a number 8 or higher to unlock the big slide message!",
      answer: `age = 9\nif age >= 8:\n    print("You can ride the big slide! 🛝")\nelse:\n    print("Maybe next year! 🌱")`,
      validate: (out) => /big slide/i.test(out) || /maybe next year/i.test(out),
      successMsg: "You taught Python how to make a choice!",
    },
  },
  {
    id: "loops",
    icon: "🔁",
    title: "Loops That Repeat",
    blurb: "Do it again and again!",
    learnText:
      "A loop lets Python repeat something without you writing it over and over. <code>for i in range(5)</code> means 'do this 5 times!'",
    visual: ["🔁", "🍭", "🍭", "🍭", "🍭", "🍭"],
    example: {
      title: "Candy Counter",
      desc: "This loop prints five candies, one by one.",
      code: `for i in range(5):\n    print("🍭 Candy number", i + 1)`,
    },
    practice: {
      task: "Change the number 5 to make more (or fewer) candies appear, then run it!",
      starter: `for i in range(5):\n    print("🍭 Candy number", i + 1)`,
      hint: "Try changing range(5) to range(3) or range(10) and see what happens!",
      answer: `for i in range(8):\n    print("🍭 Candy number", i + 1)`,
      validate: (out) => /candy number/i.test(out),
      successMsg: "You made Python repeat itself like magic!",
    },
  },
  {
    id: "lists",
    icon: "🧺",
    title: "Fun with Lists",
    blurb: "Put lots of things in one box!",
    learnText:
      "A list holds many things together in order, like a backpack! Use square brackets <code>[ ]</code> and commas to make one, like <code>[\"apple\", \"banana\", \"cherry\"]</code>.",
    visual: ["🧺", "🍎", "🍌", "🍒"],
    example: {
      title: "Toy Chest List",
      desc: "We make a list of toys and print the whole list, then just one toy.",
      code: `toys = ["robot", "kite", "yo-yo"]\nprint(toys)\nprint("My favorite toy is my", toys[0])`,
    },
    practice: {
      task: "Add your own item to the list, then run it!",
      starter: `snacks = ["apple", "cookie", "juice"]\nprint(snacks)\nprint("Yummy! I want some", snacks[1])`,
      hint: 'Try adding a new snack inside the brackets, separated by a comma, like ["apple", "cookie", "juice", "chips"]!',
      answer: `snacks = ["apple", "cookie", "juice", "chips"]\nprint(snacks)\nprint("Yummy! I want some", snacks[1])`,
      validate: (out) => /yummy!/i.test(out) && out.includes("["),
      successMsg: "You built your very own list!",
    },
  },
  {
    id: "strings",
    icon: "🔤",
    title: "Words & Strings",
    blurb: "Play with words like puzzle pieces!",
    learnText:
      "Text in Python is called a <strong>string</strong>. You can glue strings together with <code>+</code>, or repeat them with <code>*</code>!",
    visual: ["🔤", "➕", "🔤", "=", "🔤🔤"],
    example: {
      title: "Silly Word Machine",
      desc: "We stick two words together, then repeat a word three times.",
      code: `word1 = "Super"\nword2 = "Star"\nprint(word1 + word2)\nprint("Ha" * 3)`,
    },
    practice: {
      task: "Change the words, then run it to make your own silly combo!",
      starter: `word1 = "Cosmic"\nword2 = "Kid"\nprint(word1 + word2)\nprint("Wow" * 3)`,
      hint: "Try changing word1 or word2 to any words you like — they'll stick together with no space!",
      answer: `word1 = "Rocket"\nword2 = "Racer"\nprint(word1 + word2)\nprint("Zoom" * 3)`,
      validate: (out) => out.trim().split("\n").length >= 2 && out.trim().length > 0,
      successMsg: "You mashed up words like a pro!",
    },
  },
  {
    id: "booleans",
    icon: "✅",
    title: "True or False",
    blurb: "Comparing things with Python!",
    learnText:
      "Python can compare things and answer <strong>True</strong> or <strong>False</strong>! Use <code>==</code> to check 'is it equal?', <code>&gt;</code> for bigger, and <code>&lt;</code> for smaller.",
    visual: ["5", "❓", "3", "➡️", "✅"],
    example: {
      title: "Cookie Checker",
      desc: "We compare cookie counts and print True or False answers.",
      code: `my_cookies = 5\nyour_cookies = 3\nprint(my_cookies > your_cookies)\nprint(my_cookies == your_cookies)`,
    },
    practice: {
      task: "Change the cookie numbers, then run it to see True or False change!",
      starter: `my_cookies = 4\nyour_cookies = 4\nprint(my_cookies > your_cookies)\nprint(my_cookies == your_cookies)`,
      hint: "Try making the numbers different, or the same, and watch True/False change!",
      answer: `my_cookies = 10\nyour_cookies = 2\nprint(my_cookies > your_cookies)\nprint(my_cookies == your_cookies)`,
      validate: (out) => /true|false/i.test(out),
      successMsg: "You compared numbers like a Python detective!",
    },
  },
  {
    id: "while",
    icon: "⏳",
    title: "While Loops",
    blurb: "Keep going until you're done!",
    learnText:
      "A <code>while</code> loop keeps repeating AS LONG AS something is true — like counting down until you reach zero!",
    visual: ["⏳", "3️⃣", "2️⃣", "1️⃣", "🚀"],
    example: {
      title: "Rocket Countdown",
      desc: "We count down from 3 until liftoff!",
      code: `count = 3\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint("Blast off! 🚀")`,
    },
    practice: {
      task: "Change the starting number, then run it for a longer (or shorter) countdown!",
      starter: `count = 5\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint("Blast off! 🚀")`,
      hint: "Try changing count = 5 to a bigger number, like 8, for a longer countdown!",
      answer: `count = 8\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint("Blast off! 🚀")`,
      validate: (out) => /blast off/i.test(out),
      successMsg: "You launched a countdown loop into space!",
    },
  },
  {
    id: "functions",
    icon: "🛠️",
    title: "Make Your Own Command",
    blurb: "Build your own reusable Python trick!",
    learnText:
      "A function is like teaching Python a brand new trick! You write it once with <code>def</code>, then use it as many times as you want.",
    visual: ["🛠️", "➡️", "📣", "📣", "📣"],
    example: {
      title: "Cheer Machine",
      desc: "We teach Python a cheer, then use it twice.",
      code: `def cheer(name):\n    print(name + ", you did it! 🎉")\n\ncheer("Maya")\ncheer("Sam")`,
    },
    practice: {
      task: "Change the names being cheered for, then run it!",
      starter: `def cheer(name):\n    print(name + ", you did it! 🎉")\n\ncheer("Explorer")\ncheer("Champion")`,
      hint: 'Try changing the words inside the quotes in cheer("...") to any names you like!',
      answer: `def cheer(name):\n    print(name + ", you did it! 🎉")\n\ncheer("Luna")\ncheer("Max")`,
      validate: (out) => /you did it/i.test(out),
      successMsg: "You built your own Python command!",
    },
  },
];

const FRIENDLY_ERRORS = [
  { match: /NameError/, msg: "🤔 Python doesn't recognize a word you used. Check the spelling of your variable names!" },
  { match: /SyntaxError/, msg: "🧩 Something looks a little mixed up — check your quotes ( \" \" ) and colons ( : )." },
  { match: /IndentationError|TabError/, msg: "📏 Python cares about spacing! Make sure the lines under if/for start with the same indent." },
  { match: /TypeError/, msg: "🔧 Two different kinds of things don't want to combine (like a number and text). Check your code!" },
  { match: /ZeroDivisionError/, msg: "➗ Oops, you can't divide by zero! Try a different number." },
  { match: /__TIMEOUT__/, msg: "⏳ Whoa, that code was thinking for a really long time! Maybe a loop is going forever — try a smaller number." },
];

function friendlyError(raw) {
  for (const f of FRIENDLY_ERRORS) if (f.match.test(raw)) return f.msg;
  return "😊 That didn't quite work — no worries! Try the Hint button, or tweak your code and run it again.";
}

/* ---------- PROGRESS (localStorage) ---------- */
const STORAGE_KEY = "pypals_progress_v1";

function loadProgress() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (raw && typeof raw === "object") return raw;
  } catch (e) {}
  const fresh = {};
  LESSONS.forEach((l) => (fresh[l.id] = { stars: 0, exampleRun: false, practiceDone: false }));
  return fresh;
}

let progress = loadProgress();
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function totalStars() {
  return Object.values(progress).reduce((sum, p) => sum + p.stars, 0);
}
function lessonsCompleted() {
  return Object.values(progress).filter((p) => p.stars >= 3).length;
}
function isUnlocked(index) {
  if (index === 0) return true;
  const prev = LESSONS[index - 1];
  return progress[prev.id].stars >= 3;
}

/* ---------- SOUND (Web Audio, no files needed) ---------- */
let audioCtx = null;
let muted = localStorage.getItem("pypals_muted") === "1";

function ensureAudio() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

function playTone(freqs, durationMs = 140, type = "sine") {
  if (muted) return;
  const ctx = ensureAudio();
  let t = ctx.currentTime;
  freqs.forEach((f) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = f;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.15, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + durationMs / 1000);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + durationMs / 1000 + 0.02);
    t += durationMs / 1000;
  });
}
const sounds = {
  click: () => playTone([520], 70, "triangle"),
  run: () => playTone([440, 660], 90, "sine"),
  success: () => playTone([523, 659, 784, 1046], 130, "sine"),
  gentle: () => playTone([392, 330], 160, "sine"),
  unlock: () => playTone([660, 880, 1320], 110, "triangle"),
};

/* ---------- CONFETTI ---------- */
const confettiCanvas = document.getElementById("confetti-canvas");
const cctx = confettiCanvas.getContext("2d");
let confettiParticles = [];
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function burstConfetti(count = 90) {
  const colors = ["#ff6f9c", "#8c54ff", "#3fb8f0", "#3ecf8e", "#ffd166", "#ff9248"];
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: confettiCanvas.width / 2 + (Math.random() - 0.5) * 200,
      y: confettiCanvas.height * 0.25,
      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * -9 - 3,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 14,
      life: 0,
    });
  }
}
function animateConfetti() {
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach((p) => {
    p.vy += 0.28;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vrot;
    p.life++;
    cctx.save();
    cctx.translate(p.x, p.y);
    cctx.rotate((p.rot * Math.PI) / 180);
    cctx.fillStyle = p.color;
    cctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    cctx.restore();
  });
  confettiParticles = confettiParticles.filter((p) => p.life < 160 && p.y < confettiCanvas.height + 40);
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

/* ---------- CELEBRATE TOAST ---------- */
let toastTimer = null;
function showToast(text) {
  const toast = document.getElementById("celebrate-toast");
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- SANDBOXED PYTHON RUNNER (Web Worker) ---------- */
let worker;
let workerReady = false;
let pending = new Map();
let reqCounter = 0;
const RUN_TIMEOUT_MS = 8000;

function spawnWorker() {
  workerReady = false;
  worker = new Worker("worker.js");
  worker.onmessage = (e) => {
    const data = e.data;
    if (data.ready) {
      workerReady = true;
      hideLoadingOverlay();
      return;
    }
    const entry = pending.get(data.id);
    if (!entry) return;
    clearTimeout(entry.timeoutHandle);
    pending.delete(data.id);
    entry.resolve({ output: data.output, error: data.error });
  };
  worker.onerror = () => {
    // If the worker crashes outright, rebuild it so future runs still work.
    spawnWorker();
  };
}
spawnWorker();

function runCode(code) {
  return new Promise((resolve) => {
    const id = ++reqCounter;
    const timeoutHandle = setTimeout(() => {
      pending.delete(id);
      spawnWorker(); // kill the hung worker and start fresh
      resolve({ output: "", error: "__TIMEOUT__" });
    }, RUN_TIMEOUT_MS);
    pending.set(id, { resolve, timeoutHandle });
    worker.postMessage({ id, code });
  });
}

function hideLoadingOverlay() {
  const el = document.getElementById("loading-overlay");
  if (el) el.remove();
}

/* ---------- LOADING OVERLAY (while Pyodide downloads) ---------- */
(function showLoadingOverlay() {
  const div = document.createElement("div");
  div.id = "loading-overlay";
  div.style.cssText =
    "position:fixed;inset:0;background:#8c54ff;color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;font-family:'Fredoka',sans-serif;text-align:center;padding:20px;";
  div.innerHTML = `<div style="font-size:80px;animation:bob 1.6s ease-in-out infinite;">🐼</div>
    <h2 style="font-family:'Baloo 2',sans-serif;font-size:28px;margin:14px 0 6px;">Py is waking up...</h2>
    <p style="font-size:17px;opacity:0.9;max-width:360px;">Loading real Python in your browser. This only takes a moment! 🚀</p>`;
  document.body.appendChild(div);
})();

/* ---------- CODEMIRROR EDITORS ---------- */
let exampleCM, practiceCM;
function makeEditor(elId, value, readOnly) {
  const el = document.getElementById(elId);
  el.innerHTML = "";
  return CodeMirror(el, {
    value,
    mode: "python",
    theme: "dracula",
    lineNumbers: true,
    readOnly: readOnly ? "nocursor" : false,
    viewportMargin: Infinity,
    indentUnit: 4,
    tabSize: 4,
  });
}

/* ---------- STATE ---------- */
let currentLessonIndex = 0;
let currentStep = "learn"; // learn | example | practice

/* ---------- DOM refs ---------- */
const viewHome = document.getElementById("view-home");
const viewLesson = document.getElementById("view-lesson");
const lessonMap = document.getElementById("lesson-map");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");
const starCountEl = document.getElementById("star-count");

/* ---------- RENDER: HOME / LESSON MAP ---------- */
function renderHome() {
  lessonMap.innerHTML = "";
  LESSONS.forEach((lesson, i) => {
    const p = progress[lesson.id];
    const unlocked = isUnlocked(i);
    const card = document.createElement("div");
    card.className = "lesson-card" + (unlocked ? "" : " locked") + (p.stars >= 3 ? " done" : "");
    card.innerHTML = `
      ${unlocked ? "" : '<div class="lesson-lock">🔒</div>'}
      <div class="lesson-icon">${lesson.icon}</div>
      <h3>${lesson.title}</h3>
      <p>${lesson.blurb}</p>
      <div class="lesson-stars">${"⭐".repeat(p.stars)}${"☆".repeat(3 - p.stars)}</div>
    `;
    if (unlocked) {
      card.addEventListener("click", () => {
        sounds.click();
        openLesson(i);
      });
    }
    lessonMap.appendChild(card);
  });
  updateTopBar();
}

function updateTopBar() {
  const done = lessonsCompleted();
  progressFill.style.width = `${(done / LESSONS.length) * 100}%`;
  progressLabel.textContent = `${done} / ${LESSONS.length} lessons`;
  starCountEl.textContent = totalStars();
}

/* ---------- LESSON FLOW ---------- */
function openLesson(index) {
  currentLessonIndex = index;
  currentStep = "learn";
  viewHome.style.display = "none";
  viewLesson.style.display = "block";
  renderStep();
}

function backToMap() {
  sounds.click();
  viewLesson.style.display = "none";
  viewHome.style.display = "block";
  renderHome();
}
document.getElementById("back-to-map").addEventListener("click", backToMap);

function setStepDots() {
  const order = ["learn", "example", "practice"];
  const idx = order.indexOf(currentStep);
  document.querySelectorAll(".step-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === idx);
    dot.classList.toggle("complete", i < idx);
  });
}

function renderStep() {
  const lesson = LESSONS[currentLessonIndex];
  document.getElementById("panel-learn").style.display = currentStep === "learn" ? "block" : "none";
  document.getElementById("panel-example").style.display = currentStep === "example" ? "block" : "none";
  document.getElementById("panel-practice").style.display = currentStep === "practice" ? "block" : "none";
  setStepDots();

  if (currentStep === "learn") renderLearn(lesson);
  if (currentStep === "example") renderExample(lesson);
  if (currentStep === "practice") renderPractice(lesson);
}

/* --- STEP 1: LEARN --- */
function renderLearn(lesson) {
  document.getElementById("learn-mascot").textContent = lesson.icon;
  document.getElementById("learn-text").innerHTML = `<strong>${lesson.title}</strong><br>${lesson.learnText}`;
  const visual = document.getElementById("concept-visual");
  visual.innerHTML = "";
  lesson.visual.forEach((chunk, i) => {
    const span = document.createElement("span");
    span.className = "cv-item";
    span.style.animationDelay = `${i * 0.15}s`;
    span.textContent = chunk + " ";
    visual.appendChild(span);
  });
}
document.getElementById("learn-next-btn").addEventListener("click", () => {
  sounds.click();
  currentStep = "example";
  renderStep();
});

/* --- STEP 2: EXAMPLE --- */
function renderExample(lesson) {
  document.getElementById("example-title").textContent = lesson.example.title;
  document.getElementById("example-desc").textContent = lesson.example.desc;
  exampleCM = makeEditor("example-editor", lesson.example.code, true);
  document.getElementById("example-output-card").style.display = "none";
  document.getElementById("example-next-btn").style.display = "none";
  document.getElementById("run-example-btn").disabled = false;
}

document.getElementById("run-example-btn").addEventListener("click", async () => {
  sounds.run();
  const lesson = LESSONS[currentLessonIndex];
  const btn = document.getElementById("run-example-btn");
  btn.disabled = true;
  btn.textContent = "⏳ Running...";
  const { output, error } = await runCode(lesson.example.code);
  btn.disabled = false;
  btn.textContent = "▶️ Run this code!";

  const card = document.getElementById("example-output-card");
  const box = document.getElementById("example-output");
  card.style.display = "block";
  if (error) {
    box.textContent = friendlyError(error);
    box.classList.add("is-error");
  } else {
    box.textContent = output || "(no output)";
    box.classList.remove("is-error");
    progress[lesson.id].exampleRun = true;
    if (progress[lesson.id].stars < 1) progress[lesson.id].stars = 1;
    saveProgress();
    updateTopBar();
  }
  document.getElementById("example-next-btn").style.display = "inline-block";
});

document.getElementById("example-next-btn").addEventListener("click", () => {
  sounds.click();
  currentStep = "practice";
  renderStep();
});

/* --- STEP 3: PRACTICE --- */
function renderPractice(lesson) {
  document.getElementById("practice-task").textContent = lesson.practice.task;
  practiceCM = makeEditor("practice-editor", lesson.practice.starter, false);
  document.getElementById("practice-output-card").style.display = "none";
  document.getElementById("hint-card").style.display = "none";
  document.getElementById("lesson-complete-btn").style.display = "none";
}

document.getElementById("reset-practice-btn").addEventListener("click", () => {
  sounds.click();
  practiceCM.setValue(LESSONS[currentLessonIndex].practice.starter);
});

document.getElementById("hint-btn").addEventListener("click", () => {
  sounds.click();
  const card = document.getElementById("hint-card");
  card.style.display = "block";
  card.innerHTML = `💡 <strong>Hint:</strong> ${LESSONS[currentLessonIndex].practice.hint}`;
});

document.getElementById("answer-btn").addEventListener("click", () => {
  sounds.click();
  const lesson = LESSONS[currentLessonIndex];
  practiceCM.setValue(lesson.practice.answer);
  const card = document.getElementById("hint-card");
  card.style.display = "block";
  card.innerHTML = `🙈 Here's one way to do it — try running it, then make it your own!`;
});

document.getElementById("run-practice-btn").addEventListener("click", async () => {
  sounds.run();
  const lesson = LESSONS[currentLessonIndex];
  const code = practiceCM.getValue();
  const btn = document.getElementById("run-practice-btn");
  btn.disabled = true;
  btn.textContent = "⏳ Running...";
  const { output, error } = await runCode(code);
  btn.disabled = false;
  btn.textContent = "▶️ Run my code!";

  const card = document.getElementById("practice-output-card");
  const box = document.getElementById("practice-output");
  card.style.display = "block";

  if (error) {
    box.textContent = friendlyError(error);
    box.classList.add("is-error");
    sounds.gentle();
    return;
  }
  box.textContent = output || "(no output yet — try printing something!)";
  box.classList.remove("is-error");

  const success = lesson.practice.validate(output || "");
  if (success) {
    progress[lesson.id].practiceDone = true;
    progress[lesson.id].stars = 3;
    saveProgress();
    updateTopBar();
    sounds.success();
    burstConfetti();
    showToast(`🎉 ${lesson.practice.successMsg}`);
    document.getElementById("lesson-complete-btn").style.display = "inline-block";
  } else {
    sounds.gentle();
    const hintCard = document.getElementById("hint-card");
    hintCard.style.display = "block";
    hintCard.innerHTML = `😊 Almost there! Keep tweaking your code. Need help? Try <strong>Hint</strong>!`;
  }
});

document.getElementById("lesson-complete-btn").addEventListener("click", () => {
  sounds.unlock();
  const nextIndex = currentLessonIndex + 1;
  if (nextIndex < LESSONS.length) {
    openLesson(nextIndex);
  } else {
    showToast("🏆 You finished every lesson! You're a Python Superstar!");
    burstConfetti(180);
    backToMap();
  }
});

/* ---------- STEP DOTS (click to revisit within same lesson) ---------- */
document.querySelectorAll(".step-dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    const step = dot.dataset.step;
    // Only allow jumping to a step already reached, to keep the flow linear.
    const order = ["learn", "example", "practice"];
    if (order.indexOf(step) <= order.indexOf(currentStep)) {
      sounds.click();
      currentStep = step;
      renderStep();
    }
  });
});

/* ---------- MUTE TOGGLE ---------- */
const muteBtn = document.getElementById("mute-btn");
function refreshMuteBtn() {
  muteBtn.textContent = muted ? "🔇" : "🔊";
}
refreshMuteBtn();
muteBtn.addEventListener("click", () => {
  muted = !muted;
  localStorage.setItem("pypals_muted", muted ? "1" : "0");
  refreshMuteBtn();
  if (!muted) sounds.click();
});

/* ---------- PARENT DASHBOARD ---------- */
const parentModal = document.getElementById("parent-modal");
document.getElementById("parent-btn").addEventListener("click", () => {
  renderParentDashboard();
  parentModal.style.display = "flex";
});
document.getElementById("parent-close").addEventListener("click", () => {
  parentModal.style.display = "none";
});
parentModal.addEventListener("click", (e) => {
  if (e.target === parentModal) parentModal.style.display = "none";
});

function renderParentDashboard() {
  const el = document.getElementById("parent-stats");
  el.innerHTML = "";
  LESSONS.forEach((lesson) => {
    const p = progress[lesson.id];
    const row = document.createElement("div");
    row.className = "parent-row";
    const status = p.stars >= 3 ? "✅ Completed" : p.exampleRun ? "▶️ Example viewed" : "⬜ Not started";
    row.innerHTML = `<span>${lesson.icon} <strong>${lesson.title}</strong></span><span>${"⭐".repeat(p.stars)} — ${status}</span>`;
    el.appendChild(row);
  });
  const summary = document.createElement("p");
  summary.style.marginTop = "14px";
  summary.innerHTML = `Total stars: <strong>${totalStars()} / ${LESSONS.length * 3}</strong> &nbsp;|&nbsp; Lessons completed: <strong>${lessonsCompleted()} / ${LESSONS.length}</strong>`;
  el.appendChild(summary);
}

document.getElementById("reset-progress-btn").addEventListener("click", () => {
  if (!confirm("Reset all progress? This clears every star and badge.")) return;
  localStorage.removeItem(STORAGE_KEY);
  progress = loadProgress();
  saveProgress();
  updateTopBar();
  renderParentDashboard();
  renderHome();
});

/* ---------- INIT ---------- */
renderHome();
