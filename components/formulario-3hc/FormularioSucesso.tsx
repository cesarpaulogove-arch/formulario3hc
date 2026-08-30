"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface Props {
  onReset: () => void;
  language?: "pt" | "en";
}

export default function FormularioSucesso({
  onReset,
  language = "pt",
}: Props) {
  const content = {
    pt: {
      titulo: "Obrigado pela visita!",
      descricao:
        "As suas respostas vão ajudar a 3HC Soluções Inteligentes a compreender melhor as necessidades das organizações e a desenvolver soluções alinhadas às necessidades tecnológicas, sociais, energéticas e sustentáveis do mercado moçambicano.",
      novo: "Novo Preenchimento",
    },

    en: {
      titulo: "Thank you for your visit!",
      descricao:
        "Your responses will help 3HC Smart Solutions better understand organizations' needs and develop solutions aligned with the technological, social, energy and sustainability needs of the Mozambican market.",
      novo: "New Submission",
    },
  };

  const t = content[language];

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-emerald-500/20">

        <CheckCircle2
          className="w-16 h-16 text-emerald-600 mx-auto mb-4 animate-bounce"
        />

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {t.titulo}
        </h2>

        <p className="text-slate-600 mb-6 text-sm leading-relaxed">
          {t.descricao}
        </p>

        <button
          onClick={onReset}
          className="
            w-full
            py-3.5
            bg-emerald-600
            hover:bg-emerald-700
            text-white
            font-semibold
            rounded-xl
            transition
            shadow-lg
            shadow-emerald-600/20
          "
        >
          {t.novo}
        </button>

      </div>

    </main>
  );
}