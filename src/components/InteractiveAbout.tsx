"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Card = { title: string; text: string };

const CARDS: Card[] = [
  {
    title: "Tecnologia que aproxima",
    text: "Soluções digitais que facilitam a vida de pessoas e negócios, unindo inovação, simplicidade e proximidade humana.",
  },
  {
    title: "Dados sob seu controle",
    text: "Sem vendor lock-in. Seus arquivos ficam no seu Drive, com suas permissões.",
  },
  {
    title: "Nossa mascote",
    text: "Representa bem quem somos: acolhedores, colaborativos e resilientes.",
  },
  {
    title: "Sem hospedagem externa",
    text: "Apps Script + Drive executando na sua conta Google. Menos custo, menos fricção.",
  },
  {
    title: "Autonomia real",
    text: "Soluções que respeitam seu processo e crescem junto com você.",
  },
  {
    title: "O futuro das suas ideias",
    text: "Criamos soluções que transformam ideias em realidade.",
  },
];

// POSIÇÕES XY (desktop) — ajuste livre:
const CARD_POS_XY = [
  { x: -65, y: -400 },
  { x: 255, y: 1 },
  { x: -65, y: 150 },
  { x: 288, y: -200 },
  { x: -370, y: -10 },
  { x: -400, y: -200 },
];

export default function InteractiveAbout() {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // card “fixo” por clique (além do hover)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleExpanded = (i: number) =>
    setExpandedIndex((curr) => (curr === i ? null : i));

  const CENTER_SHIFT = { x: 0, y: 90 };
  const RING_BOX = { w: 1200, h: 900 };

  return (
    <section className="relative py-5 md:py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título */}
        {mounted ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              SOMOS A <span className="text-pink-400">LAAB TECH</span>
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/85">
              Acreditamos que a{" "}
              <span className="text-pink-400 font-semibold">
                tecnologia tem alma
              </span>
              .
            </p>
          </motion.div>
        ) : (
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              SOMOS A <span className="text-pink-400">LAAB TECH</span>
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/85">
              Acreditamos que a{" "}
              <span className="text-pink-400 font-semibold">
                tecnologia tem alma
              </span>
              .
            </p>
          </div>
        )}

        {/* Cluster central (logo + cards) */}
        <div className="relative pt-14 md:pt-20 pb-28 md:pb-32 flex justify-center items-center mt-16">
          {/* LOGO */}
          {mounted ? (
            <motion.div
              initial={
                prefers
                  ? { opacity: 0 }
                  : { opacity: 0, x: "-60vw", rotate: -540, scale: 0.95 }
              }
              animate={
                prefers
                  ? { opacity: 1 }
                  : { opacity: 1, x: 0, rotate: 0, scale: 1 }
              }
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.25,
              }}
              className="relative rounded-full border border-white/20 bg-white/90 p-3 shadow-[0_10px_28px_rgba(0,0,0,.35)]"
              style={{
                backdropFilter: "blur(6px)",
                transform: `translate(${CENTER_SHIFT.x}px, ${CENTER_SHIFT.y}px)`,
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, rgba(255,79,154,.35), rgba(255,79,154,0) 70%), " +
                    "radial-gradient(55% 55% at 60% 40%, rgba(145,209,255,.25), rgba(145,209,255,0) 70%)",
                }}
              />
              <motion.img
                src="/laab-logo.png"
                alt="LAAB Tech"
                width={512}
                height={512}
                className="w-44 h-44 md:w-52 md:h-52 rounded-full block"
                animate={
                  prefers
                    ? {}
                    : {
                        y: [0, -6, 0, 6, 0],
                        rotate: [0, -0.6, 0, 0.6, 0],
                        transition: {
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                }
              />
              <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-pink-500/70" />
            </motion.div>
          ) : (
            <div
              className="relative rounded-full border border-white/20 bg-white/90 p-3 shadow-[0_10px_28px_rgba(0,0,0,.35)]"
              style={{
                backdropFilter: "blur(6px)",
                transform: `translate(${CENTER_SHIFT.x}px, ${CENTER_SHIFT.y}px)`,
              }}
            >
              <img
                src="/laab-logo.png"
                alt="LAAB Tech"
                width={512}
                height={512}
                className="w-44 h-44 md:w-52 md:h-52 rounded-full block"
              />
              <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-pink-500/70" />
            </div>
          )}

          {/* Cards (desktop): título sempre visível; texto aparece no hover/click */}
          <div className="hidden md:block pointer-events-none absolute inset-0">
            <div
              className="relative mx-auto"
              style={{
                width: `${RING_BOX.w}px`,
                height: `${RING_BOX.h}px`,
                transform: `translate(${CENTER_SHIFT.x}px, ${CENTER_SHIFT.y}px)`,
              }}
            >
              {CARDS.map((card, i) => {
                const p = CARD_POS_XY[i] ?? { x: 0, y: 0 };
                const left = `calc(50% + ${p.x}px - 10rem)`;
                const top = `calc(50% + ${p.y}px - 10rem)`;

                const isExpanded = expandedIndex === i;

                return (
                  <motion.div
                    key={i}
                    className="group absolute w-80 bg-white/5 border border-white/10 rounded-2xl p-6 
                               shadow-[0_8px_24px_rgba(230,62,136,.35)] backdrop-blur-md text-center
                               pointer-events-auto cursor-pointer select-none"
                    style={{ left, top }}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.14 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => toggleExpanded(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleExpanded(i);
                      }
                    }}
                  >
                    <h3 className="text-lg font-semibold text-pink-400">
                      {card.title}
                    </h3>

                    {/* Texto colapsável: hover e/ou clique mostram */}
                    <div
                      className={[
                        "transition-all duration-300 ease-out overflow-hidden text-white/80 text-sm leading-relaxed",
                        "max-h-0 opacity-0", // estado fechado
                        "group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-2", // mostra no hover
                        isExpanded ? "max-h-40 opacity-100 mt-2" : "", // mostra no clique
                      ].join(" ")}
                    >
                      {card.text}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: como estava (texto visível). Se quiser, dá pra colapsar por clique também. */}
        <div className="md:hidden mt-10 grid grid-cols-1 gap-5 px-1">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5
                         shadow-[0_8px_24px_rgba(230,62,136,.35)] backdrop-blur-md text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <h3 className="text-base font-semibold text-pink-400 mb-1">
                {card.title}
              </h3>
              <p className="text-white/80 text-sm">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
