
"use client";

import React from "react";
import { FormularioData } from "./Formulario3HC";

interface Props {
  formData: FormularioData;

  updateField: (
    field: keyof FormularioData,
    value: string | string[]
  ) => void;

  idioma?: "pt" | "en";
}

export default function ConexaoOportunidades({
  formData,
  updateField,
  idioma = "pt",
}: Props) {
  const content = {
    pt: {
      title: "Conexão & Oportunidades",
      description:
        "Indique como gostaria de continuar a ligação com a 3HC.",
      question: "Qual o próximo passo?",
      options: [
        "Agendar reunião",
        "Conhecer soluções",
        "Explorar parcerias",
        "Manter contacto",
      ],
    },

    en: {
      title: "Connection & Opportunities",
      description:
        "Tell us how you would like to continue with 3HC.",
      question: "What is the next step?",
      options: [
        "Schedule a meeting",
        "Explore solutions",
        "Explore partnerships",
        "Stay in touch",
      ],
    },
  };

  const t = content[idioma];

  return (
    <section className="space-y-4">

      <div>
        <h2 className="text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2 uppercase tracking-wide">

          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
            3
          </span>

          {t.title}

        </h2>

        <p className="text-xs text-slate-500 mt-2">
          {t.description}
        </p>
      </div>

      <div>

        <label className="block text-sm font-semibold text-slate-800 mb-2">
          {t.question}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

          {t.options.map((option) => (

            <label
              key={option}
              className="
                flex items-center gap-3
                p-3
                rounded-xl
                border border-slate-200
                hover:bg-emerald-50
                hover:border-emerald-300
                cursor-pointer
                transition
              "
            >

              <input
                type="radio"
                name="proximoPasso"
                value={option}
                checked={
                  formData.proximoPasso === option
                }
                onChange={(e) =>
                  updateField(
                    "proximoPasso",
                    e.target.value
                  )
                }
                className="
                  text-emerald-600
                  focus:ring-emerald-500
                "
              />

              <span className="text-sm text-slate-700">
                {option}
              </span>

            </label>

          ))}

        </div>

      </div>

    </section>
  );
}

