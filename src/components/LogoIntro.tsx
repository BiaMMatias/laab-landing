"use client";
import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "framer-motion";

export default function LogoIntro() {
  const prefers = useReducedMotion();

  // flutuação sutil
  const float: TargetAndTransition = prefers
    ? {}
    : {
        y: [0, -6, 0, 6, 0],
        rotate: [0, -0.6, 0, 0.6, 0],
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1], // cubic-bezier equivalente ao easeInOut
        },
      };

  return (
    <div className="relative mx-auto mb-8 w-full max-w-[220px]">
      {/* Glow atrás do logo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(255,79,154,.35), rgba(255,79,154,0) 70%), " +
            "radial-gradient(55% 55% at 60% 40%, rgba(145,209,255,.25), rgba(145,209,255,0) 70%)",
        }}
      />

      {/* Container do logo que entra da esquerda */}
      <motion.div
        initial={{ opacity: 0, x: "-55vw", rotate: -360, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-full border border-white/20 bg-white/90 p-3 shadow-[0_10px_28px_rgba(0,0,0,.35)] mx-auto"
        style={{ backdropFilter: "blur(6px)" }}
      >
        {/* 👉 motion.img com flutuação contínua */}
        <motion.img
          src="/laab-logo.png"
          alt="LAAB Tech"
          width={512}
          height={512}
          className="w-full h-auto rounded-full block"
          animate={float}
        />
        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-pink-500/70" />
      </motion.div>
    </div>
  );
}
