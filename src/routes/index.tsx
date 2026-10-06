import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Pendulum } from "@/components/landing/Pendulum";
import { Underline, Circle, Arrow } from "@/components/landing/Scribbles";
import { DemoCard, Flashcards, Quiz, Analogies, BrainMap, Model3D, PHSim, Gamification } from "@/components/landing/Demos";

const TITLE = "COGNITO — Don't memorize it. Poke it.";
const DESC = "COGNITO turns any school topic into flashcards, quizzes, analogies, brain maps, 3D models and simulations. For students, parents and schools.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

function Index() {
  return (
    <div className="overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-marker focus:p-2">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Features />
        <HowItWorks />
        <Roles />
        <Chatbot />
        <FinalCta />
      </main>
      <footer className="border-t border-ink px-5 py-8 font-mono text-xs sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3">
          <span>COGNITO · lab notebook v0.1</span>
          <span>Built at [HACKATHON NAME] by [TEAM NAME]</span>
        </div>
      </footer>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8" aria-label="Main">
        <a href="#" className="font-display text-2xl font-extrabold tracking-tight">cognito<span className="text-tomato">.</span></a>
        <div className="hidden gap-7 text-sm md:flex">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#roles" className="hover:underline">For parents</a>
          <a href="#roles" className="hover:underline">For schools</a>
        </div>
        <a href="#waitlist" className="btn-ink bg-tomato px-4 py-2 text-sm text-paper">Try it</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
      <div>
        <span className="tape -rotate-2">For grades 6–12 · CBSE · ICSE · State</span>
        <h1 className="mt-6 text-[clamp(3rem,9vw,6.5rem)] font-extrabold leading-[0.92]">
          Don't memorize it. <span className="marker italic">Poke it.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted-foreground">
          Type any topic. COGNITO builds flashcards, quizzes, analogies, brain maps, 3D models and simulations you can actually play with.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#waitlist" className="btn-ink bg-tomato text-paper">Try it free</a>
          <a href="#how" className="group relative px-1 py-3 font-medium">
            See how it works
            <Underline className="absolute -bottom-0 left-0 h-2 w-full text-tomato" />
          </a>
        </div>
        <p className="mt-10 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Arrow className="hidden h-6 w-16 text-ink sm:block" /> go on, drag the sliders
        </p>
      </div>
      <Pendulum />
    </section>
  );
}

function SectionHead({ n, kicker, title }: { n: string; kicker: string; title: React.ReactNode }) {
  return (
    <motion.div {...reveal} className="mb-12 max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-widest"><span className="text-tomato">§{n}</span> — {kicker}</p>
      <h2 className="mt-3 text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1]">{title}</h2>
    </motion.div>
  );
}

function Features() {
  return (
    <section id="features" className="border-t border-ink bg-muted/40 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead n="1" kicker="every one of these works, try them" title={<>One topic, <span className="relative inline-block">seven<Circle className="absolute -inset-x-3 -inset-y-2 h-[130%] w-[115%] text-tomato" /></span> ways in.</>} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DemoCard tag="01 · flashcards" title="Flip. Swipe. Repeat." className="-rotate-1"><Flashcards /></DemoCard>
          <DemoCard tag="02 · quiz" title="Three quick ones" className="lg:row-span-2 lg:mt-10"><Quiz /></DemoCard>
          <DemoCard tag="03 · analogies" title="Explain it like…" className="rotate-1"><Analogies /></DemoCard>
          <DemoCard tag="04 · brain map" title="See what connects" className="lg:col-span-2 rotate-[0.5deg]"><BrainMap /></DemoCard>
          <DemoCard tag="05 · 3D models" title="Turn it around" className="-rotate-1"><Model3D /></DemoCard>
          <DemoCard tag="06 · simulations" title="Acid or base?" className="rotate-1 lg:mt-6"><PHSim /></DemoCard>
          <DemoCard tag="07 · progress" title="Streaks that stick" className="-rotate-[0.5deg]"><Gamification /></DemoCard>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { t: "Type a topic", d: "“Refraction”, “Mughal empire”, “quadratic equations”. Or paste a line from your textbook." },
    { t: "AI builds the kit", d: "It gathers the material and makes cards, a quiz, analogies, a map and a sim — matched to your grade." },
    { t: "Learn by doing", d: "Drag, flip, break things. The quiz tells you what you actually got, not what you skimmed." },
  ];
  return (
    <section id="how" className="border-t border-ink px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead n="2" kicker="how it works" title="Three steps. No setup." />
        <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <motion.li key={s.t} {...reveal} transition={{ duration: 0.5, delay: i * 0.12 }} className="relative">
              <span className="font-mono text-6xl font-semibold text-tomato">0{i + 1}</span>
              <h3 className="mt-2 text-2xl font-semibold">{s.t}</h3>
              <p className="mt-2 max-w-xs text-muted-foreground">{s.d}</p>
              {i < 2 && <Arrow className="absolute -right-10 top-4 hidden h-10 w-24 rotate-6 text-ink md:block" />}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Roles() {
  const [tab, setTab] = useState<"student" | "parent" | "school">("student");
  const tabs = { student: "Student", parent: "Parent", school: "School" } as const;
  return (
    <section id="roles" className="border-t border-ink bg-muted/40 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead n="3" kicker="one platform, three desks" title="Built for whoever's holding the phone." />
        <div role="tablist" aria-label="Who is it for" className="flex flex-wrap gap-0">
          {(Object.keys(tabs) as (keyof typeof tabs)[]).map((k) => (
            <button key={k} role="tab" id={`tab-${k}`} aria-selected={tab === k} aria-controls={`panel-${k}`} onClick={() => setTab(k)}
              className={`-mr-px border border-b-0 border-ink px-5 py-2 font-mono text-sm ${tab === k ? "bg-ink text-paper" : "bg-card hover:bg-muted"}`}>
              {tabs[k]}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="card-ink grid gap-8 p-6 md:grid-cols-[1fr_1.3fr] md:p-10">
          {tab === "student" && <RolePanel title="Learn it, then level up." points={["Every topic becomes seven ways to understand it", "XP, streaks and badges for real effort, not screen time", "Weak spots come back as practice automatically"]} mock={<StudentMock />} />}
          {tab === "parent" && <RolePanel title="Know how they're doing. No nagging." points={["One weekly summary, in plain language", "See weak topics before the exam does", "No hourly pings, no surveillance feed"]} mock={<ParentMock />} />}
          {tab === "school" && <RolePanel title="School › Class › Student." points={["Run it across sections and grades", "Teachers see class-wide progress at a glance", "Spot which topic a whole class is stuck on"]} mock={<SchoolMock />} />}
        </div>
      </div>
    </section>
  );
}

function RolePanel({ title, points, mock }: { title: string; points: string[]; mock: React.ReactNode }) {
  return (
    <>
      <div>
        <h3 className="text-3xl font-semibold leading-tight">{title}</h3>
        <ul className="mt-6 space-y-3">
          {points.map((p) => <li key={p} className="flex gap-3"><span className="font-mono text-tomato">→</span>{p}</li>)}
        </ul>
      </div>
      <div className="graph-paper border border-dashed border-ink p-4 font-mono text-xs">{mock}</div>
    </>
  );
}

const Bar = ({ v, label }: { v: number; label: string }) => (
  <div className="flex items-center gap-2"><span className="w-24 shrink-0 truncate">{label}</span><div className="h-3 flex-1 border border-ink bg-card"><div className="h-full bg-ink" style={{ width: `${v}%` }} /></div><span className="w-8 text-right">{v}%</span></div>
);

function StudentMock() {
  return (
    <div className="space-y-3">
      <div className="border border-ink bg-card p-2">⌕ &nbsp;<span className="text-muted-foreground">search a topic…</span> <span className="text-tomato">refraction</span></div>
      <div className="grid grid-cols-4 gap-2">{["cards", "quiz", "map", "sim"].map((x) => <div key={x} className="border border-ink bg-card p-2 text-center">{x}</div>)}</div>
      <Bar v={64} label="Level 4 XP" />
    </div>
  );
}
function ParentMock() {
  return (
    <div className="space-y-3">
      <p className="uppercase">Week 41 · Aarav, grade 8</p>
      <Bar v={82} label="Science" /><Bar v={58} label="Maths" /><Bar v={71} label="History" />
      <div className="border border-ink bg-marker/60 p-2">Weak: linear equations, the Mughal timeline</div>
    </div>
  );
}
function SchoolMock() {
  return (
    <div className="space-y-2">
      <p>▾ Sample School</p>
      <p className="pl-4">▾ Class 9-B · 38 students</p>
      <div className="space-y-2 pl-8"><Bar v={76} label="Motion" /><Bar v={41} label="Atoms" /><Bar v={67} label="Sound" /></div>
      <p className="pl-4 text-muted-foreground">▸ Class 9-C</p>
      <p className="pl-4 text-muted-foreground">▸ Class 10-A</p>
    </div>
  );
}

function Chatbot() {
  const rows = [
    ["You get a wall of text.", "You get things to flip, drag and test."],
    ["It's easy to feel like you understood.", "The quiz checks whether you did."],
    ["Nobody else can see how it's going.", "Parents and teachers see progress, not chats."],
    ["Every chat starts from zero.", "It remembers your weak topics and brings them back."],
  ];
  return (
    <section className="border-t border-ink px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHead n="4" kicker="fair question" title="Why not just ask a chatbot?" />
        <motion.div {...reveal} className="card-ink overflow-hidden">
          <div className="grid grid-cols-2 border-b border-ink font-mono text-xs uppercase">
            <div className="border-r border-ink p-4">A chatbot</div>
            <div className="bg-marker p-4">COGNITO</div>
          </div>
          {rows.map(([a, b], i) => (
            <div key={i} className="grid grid-cols-2 border-b border-dashed border-ink last:border-b-0">
              <p className="border-r border-ink p-4 text-sm text-muted-foreground sm:text-base">{a}</p>
              <p className="p-4 text-sm font-medium sm:text-base">{b}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FinalCta() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section id="waitlist" className="bg-ink px-5 py-24 text-paper sm:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.h2 {...reveal} className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95]">
          Your next chapter is <span className="italic text-tomato">waiting to be poked.</span>
        </motion.h2>
        {done ? (
          <p className="mt-10 font-mono text-sm" role="status">✓ You're on the list. We'll write to {email}.</p>
        ) : (
          <form className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@school.in"
              className="flex-1 border border-paper bg-transparent px-4 py-3 text-paper placeholder:text-paper/50" />
            <button type="submit" className="border border-paper bg-tomato px-6 py-3 font-semibold text-paper shadow-[4px_4px_0_var(--paper)] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
              Join the waitlist
            </button>
          </form>
        )}
        <p className="mt-4 font-mono text-xs text-paper/60">No spam. One email when it's ready.</p>
      </div>
    </section>
  );
}
