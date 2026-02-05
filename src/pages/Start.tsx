import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SHARING_SECONDS = 5 * 60;
const QA_SECONDS = 2 * 60;

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const Start = () => {
  const [remaining, setRemaining] = useState(SHARING_SECONDS);
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const [phase, setPhase] = useState<"sharing" | "qa">("sharing");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timerRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const phaseRef = useRef<"sharing" | "qa">("sharing");

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const ensureAudioContext = useCallback(async () => {
    if (!audioRef.current) {
      const AudioCtx = window.AudioContext || (window as typeof window & {
        webkitAudioContext: typeof AudioContext;
      }).webkitAudioContext;
      audioRef.current = new AudioCtx();
    }

    if (audioRef.current.state === "suspended") {
      await audioRef.current.resume();
    }

    return audioRef.current;
  }, []);

  const playTone = useCallback(
    async ({
      frequency,
      duration,
      type = "sine",
    }: {
      frequency: number;
      duration: number;
      type?: OscillatorType;
    }) => {
      try {
        const context = await ensureAudioContext();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        const now = context.currentTime;
        const durationSeconds = duration / 1000;

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, now);

        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.start(now);
        oscillator.stop(now + durationSeconds);
      } catch {
        // If audio is blocked, fail silently.
      }
    },
    [ensureAudioContext]
  );

  const playClick = useCallback(() => {
    void playTone({ frequency: 880, duration: 90, type: "square" });
  }, [playTone]);

  const playDing = useCallback(() => {
    void playTone({ frequency: 740, duration: 500, type: "sine" });
  }, [playTone]);

  const startTimer = useCallback(() => {
    clearTimer();
    const endTime = Date.now() + SHARING_SECONDS * 1000;

    endTimeRef.current = endTime;
    phaseRef.current = "sharing";
    setPhase("sharing");
    setRemaining(SHARING_SECONDS);
    setStatus("running");
    playClick();

    timerRef.current = window.setInterval(() => {
      const secondsLeft = Math.max(
        0,
        Math.ceil(((endTimeRef.current ?? endTime) - Date.now()) / 1000)
      );

      setRemaining(secondsLeft);

      if (secondsLeft <= 0) {
        if (phaseRef.current === "sharing") {
          const qaEndTime = Date.now() + QA_SECONDS * 1000;
          endTimeRef.current = qaEndTime;
          phaseRef.current = "qa";
          setPhase("qa");
          setRemaining(QA_SECONDS);
          return;
        }

        clearTimer();
        setStatus("done");
        playDing();
      }
    }, 200);
  }, [clearTimer, playClick, playDing]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    handleFullscreenChange();

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // If fullscreen is blocked, fail silently.
    }
  }, []);

  const stageLabel = useMemo(() => {
    if (status === "idle") {
      return "Share / Q&A";
    }
    if (status === "done") {
      return "Done";
    }
    return phase === "sharing" ? "Share" : "Q&A";
  }, [phase, status]);

  const togglePhase = useCallback(() => {
    if (status !== "running") {
      return;
    }

    if (phaseRef.current === "sharing") {
      const qaEndTime = Date.now() + QA_SECONDS * 1000;
      endTimeRef.current = qaEndTime;
      phaseRef.current = "qa";
      setPhase("qa");
      setRemaining(QA_SECONDS);
      return;
    }

    const sharingEndTime = Date.now() + SHARING_SECONDS * 1000;
    endTimeRef.current = sharingEndTime;
    phaseRef.current = "sharing";
    setPhase("sharing");
    setRemaining(SHARING_SECONDS);
  }, [status]);

  const resetTimer = useCallback(() => {
    if (status === "running") {
      const duration = phaseRef.current === "sharing" ? SHARING_SECONDS : QA_SECONDS;
      endTimeRef.current = Date.now() + duration * 1000;
      setRemaining(duration);
      return;
    }

    phaseRef.current = "sharing";
    setPhase("sharing");
    setRemaining(SHARING_SECONDS);
    setStatus("idle");
  }, [status]);

  const buttonLabel = status === "running" ? "Running" : status === "done" ? "Restart" : "Start";

  const phaseLabel = status !== "running" ? "Toggle phase" : phase === "sharing" ? "Switch to Q&A" : "Switch to Share";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden font-sans">
      <div className="absolute inset-0 timer-backdrop" aria-hidden="true" />

      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        className="absolute top-6 right-6 z-20 p-2 text-foreground/60 hover:text-foreground transition"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 9V4h5" />
          <path d="M20 9V4h-5" />
          <path d="M4 15v5h5" />
          <path d="M20 15v5h-5" />
        </svg>
      </button>

      <main className="relative z-10 flex flex-col items-center justify-center gap-6 px-6 text-center">
        {status === "done" && <div className="timer-announcement text-foreground/80">Time&apos;s up</div>}

        <button
          type="button"
          onClick={resetTimer}
          className="timer-display text-[30vw] sm:text-[20vw] lg:text-[14vw] leading-none"
          aria-label="Reset timer"
        >
          {formatTime(remaining)}
        </button>

        <button
          type="button"
          onClick={togglePhase}
          disabled={status !== "running"}
          className="timer-phase text-foreground/95 disabled:opacity-60"
          aria-label={phaseLabel}
        >
          {status === "idle" ? (
            <>
              <span className="block">Share</span>
              <span className="block">Q&amp;A</span>
            </>
          ) : (
            stageLabel
          )}
        </button>

        <button
          type="button"
          onClick={startTimer}
          disabled={status === "running"}
          className="mt-6 text-xs sm:text-sm uppercase tracking-[0.35em] px-6 py-3 border border-foreground/40 rounded-full text-foreground/80 hover:border-foreground hover:text-foreground transition disabled:opacity-40"
        >
          {buttonLabel}
        </button>
      </main>
    </div>
  );
};

export default Start;
