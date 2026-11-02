import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import workingFrame from "@/assets/character/working.png";
import lookLeft from "@/assets/character/look-left.png";
import lookRight from "@/assets/character/look-right.png";
import waveFrame from "@/assets/character/wave.png";
import pointDown from "@/assets/character/point-down.png";

const FRAMES = [
  { src: workingFrame, alt: "Bhanu working on his laptop" },
  { src: lookLeft, alt: "Bhanu glancing to the left" },
  { src: lookRight, alt: "Bhanu glancing to the right" },
  { src: waveFrame, alt: "Bhanu waving hello" },
  { src: pointDown, alt: "Bhanu pointing down toward the portfolio" },
];

const WORKING = 0;
const LOOK_LEFT = 1;
const LOOK_RIGHT = 2;
const WAVE = 3;
const POINT_DOWN = 4;

const SIDE_HOLD_MS = 2600;
const WAVE_MS = 1500;
const POINT_MS = 2100;

type Zone = "idle" | "left" | "right" | "center";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

function CursorGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M5 3l14 8.5-6.3 1.1 3.4 6.9-2.7 1.3-3.4-6.9L5 19V3z" strokeLinejoin="round" />
    </svg>
  );
}

export function InteractiveHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const imgsRef = useRef<(HTMLImageElement | null)[]>([]);
  const opacitiesRef = useRef<number[]>([1, 0, 0, 0, 0]);
  const targetsRef = useRef<number[]>([1, 0, 0, 0, 0]);
  const timersRef = useRef<number[]>([]);
  const busyRef = useRef(false);
  const zoneRef = useRef<Zone>("idle");
  const finePointerRef = useRef(true);

  const [zone, setZone] = useState<Zone>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  }, []);

  const pushTimer = useCallback((id: number) => {
    timersRef.current.push(id);
  }, []);

  const setFrame = useCallback((index: number) => {
    targetsRef.current = targetsRef.current.map((_, i) => (i === index ? 1 : 0));
  }, []);

  const returnToWorking = useCallback(() => {
    if (busyRef.current) return;
    setFrame(WORKING);
    zoneRef.current = "idle";
    setZone("idle");
    setMessage(null);
  }, [setFrame]);

  const startReaction = useCallback(
    (frame: number, nextZone: Zone, msg: string) => {
      clearTimers();
      setFrame(frame);
      zoneRef.current = nextZone;
      setZone(nextZone);
      setMessage(msg);
      pushTimer(
        window.setTimeout(() => {
          if (!busyRef.current) returnToWorking();
        }, SIDE_HOLD_MS),
      );
    },
    [clearTimers, returnToWorking, setFrame, pushTimer],
  );

  const startGreeting = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    clearTimers();
    setFrame(WAVE);
    zoneRef.current = "center";
    setZone("center");
    setMessage("Hey, it's you!");
    pushTimer(
      window.setTimeout(() => {
        setMessage("Hiiii!");
      }, 700),
    );
    pushTimer(
      window.setTimeout(() => {
        setFrame(POINT_DOWN);
        setMessage("Check out the portfolio");
      }, WAVE_MS),
    );
    pushTimer(
      window.setTimeout(() => {
        busyRef.current = false;
        setFrame(WORKING);
        zoneRef.current = "idle";
        setZone("idle");
        setMessage(null);
      }, WAVE_MS + POINT_MS),
    );
  }, [clearTimers, setFrame, pushTimer]);

  // One rAF loop drives every crossfade; React only re-renders on message/zone text.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const targets = targetsRef.current;
      const opacities = opacitiesRef.current;
      for (let i = 0; i < FRAMES.length; i++) {
        const target = targets[i] ?? 0;
        const current = opacities[i] ?? 0;
        if (Math.abs(target - current) > 0.002) {
          const next = current + (target - current) * 0.12;
          opacities[i] = next;
          const el = imgsRef.current[i];
          if (el) el.style.opacity = String(next);
        } else if (current !== target) {
          opacities[i] = target;
          const el = imgsRef.current[i];
          if (el) el.style.opacity = String(target);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      finePointerRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      clearTimers();
    };
  }, [clearTimers]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!finePointerRef.current || busyRef.current) return;
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0) return;
      const x = (event.clientX - rect.left) / rect.width;
      const nextZone: Zone = x < 0.34 ? "left" : x > 0.66 ? "right" : "center";
      if (nextZone === zoneRef.current) return;
      if (nextZone === "left") {
        startReaction(LOOK_LEFT, "left", "Anyone here on the left?");
      } else if (nextZone === "right") {
        startReaction(LOOK_RIGHT, "right", "Anyone here on the right?");
      } else {
        startGreeting();
      }
    },
    [startReaction, startGreeting],
  );

  const handlePointerDown = useCallback(() => {
    if (finePointerRef.current || busyRef.current) return;
    startGreeting();
  }, [startGreeting]);

  const zoneCaption =
    zone === "left"
      ? "Anyone here on the left?"
      : zone === "right"
        ? "Anyone here on the right?"
        : null;

  return (
    <section
      ref={heroRef}
      id="top"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--hero-bg)" }}
    >
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-background/70 border-b border-border/40 transition-colors">
        <a
          href="#top"
          className="font-display text-base font-semibold tracking-tight text-foreground md:text-lg"
        >
          Bhanu<span className="text-primary">.</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Say hello
          </a>
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground md:hidden"
        >
          Say hello
        </a>
      </header>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-14 pt-24 md:px-10 md:pt-16">
        <div className="grid items-center gap-6 md:grid-cols-[minmax(220px,1fr)_auto_minmax(220px,1fr)] md:gap-10">
          {/* Left note — identity + instruction */}
          <div className="animate-rise-in text-center md:text-left">
            <p className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
              I'm Bhanu Gunda
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary md:text-sm">
              Web Developer
            </p>
            <p className="mt-8 hidden text-sm text-muted-foreground md:block">
              Move cursor to call me&nbsp;!
            </p>
            <CursorGlyph className="animate-cursor-nudge mt-2 hidden h-5 w-5 text-foreground/60 md:block" />
            <p className="mt-4 text-sm text-muted-foreground md:hidden">Tap to say hello !</p>
          </div>

          {/* Character — the visual anchor */}
          <figure className="relative mx-auto flex w-full max-w-md justify-center md:max-w-lg">
            <div
              className="absolute inset-x-8 bottom-4 top-1/3 -z-10 rounded-full opacity-70 blur-3xl"
              style={{ background: "radial-gradient(closest-side, oklch(1 0 0 / 90%), transparent)" }}
            />
            <div
              className="relative mx-auto w-full max-w-[min(78vw,430px)] md:max-w-[min(38vw,500px)]"
              style={{
                maskImage:
                  "radial-gradient(115% 115% at 50% 45%, black 58%, rgba(0,0,0,0.55) 78%, transparent 99%)",
                WebkitMaskImage:
                  "radial-gradient(115% 115% at 50% 45%, black 58%, rgba(0,0,0,0.55) 78%, transparent 99%)",
              }}
            >
            <img
              src={workingFrame}
              alt="Bhanu working on his laptop"
              width={1024}
              height={1280}
              className="h-auto w-full select-none"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {FRAMES.map((frame, index) =>
                index === 0 ? null : (
                  <img
                    key={frame.src}
                    ref={(el) => {
                      imgsRef.current[index] = el;
                    }}
                    src={frame.src}
                    alt={frame.alt}
                    width={1024}
                    height={1280}
                    loading="eager"
                    draggable={false}
                    className="absolute inset-0 h-full w-full select-none object-contain opacity-0"
                    style={{ opacity: 0 }}
                  />
                ),
              )}
            </div>
            </div>
          </figure>

          {/* Right note — contextual reaction message */}
          <div className="flex min-h-8 items-start justify-center md:justify-end">
            <p
              key={message ?? "idle"}
              className="animate-rise-in max-w-[16rem] text-center font-display text-base font-medium text-foreground/80 md:text-right md:text-lg"
              aria-live="polite"
            >
              {message ?? zoneCaption}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-muted-foreground md:mt-4">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll to explore</span>
          <span className="animate-float-hint text-lg" aria-hidden="true">
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}
