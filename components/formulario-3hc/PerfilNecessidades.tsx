
"use client";

import React from "react";
import { FormularioData } from "./Formulario3HC";

interface Props {
  formData: FormularioData;

  updateField: (
    field: keyof FormularioData,
    value: string | string[]
  ) => void;

  toggleCheckbox: (
    field: "areasCriticas" | "servicosInteresse",
    option: string
  ) => void;

  idioma?: "pt" | "en";
}

export default function PerfilNecessidades({
  formData,
  updateField,
  toggleCheckbox,
  idioma = "pt",
}: Props) {

  const content = {
    pt: {
      title: "Necessidades & Áreas de Interesse",

      description:
        "Ajude-nos a identificar os principais desafios e oportunidades da sua organização.",

      perceptionTitle:
        "Como vê a 3HC para a sua organização?",

      perception: [
        {
          value: "transformacao_digital",
          label: "Transformação digital",
        },
        {
          value: "energia_sustentabilidade",
          label: "Eficiência energética e sustentabilidade",
        },
        {
          value: "gestao_processos",
          label: "Gestão e processos",
        },
        {
          value: "conhecer_solucoes",
          label: "Conhecer melhor as soluções",
        },
      ],

      areasTitle:
        "Quais são as áreas prioritárias?",

      areasHint:
        "Selecione as opções relevantes.",

      areas: [
        {
          value: "transformacao_digital",
          label: "Transformação Digital",
        },
        {
          value: "tecnologia_automacao",
          label: "Tecnologia & Automação",
        },
        {
          value: "energia_eficiencia",
          label: "Energia & Eficiência",
        },
        {
          value: "sustentabilidade_ambiente",
          label: "Sustentabilidade & Ambiente",
        },
        {
          value: "gestao_processos",
          label: "Gestão & Processos",
        },
        {
          value: "pessoas_capacitacao",
          label: "Pessoas & Capacitação",
        },
      ],

      challengeTitle:
        "Principal desafio ou oportunidade",

      placeholder:
        "Descreva brevemente...",

      solutionsTitle:
        "Que soluções despertam maior interesse?",

      solutionsHint:
        "Pode selecionar mais de uma.",

      solutions: [
        {
          value: "sistemas_digitais",
          label: "Sistemas Digitais",
        },
        {
          value: "automacao_tecnologia",
          label: "Automação & Tecnologia",
        },
        {
          value: "energia_eficiencia",
          label: "Energia & Eficiência",
        },
        {
          value: "consultoria_gestao",
          label: "Consultoria & Gestão",
        },
        {
          value: "sustentabilidade_ambiente",
          label: "Sustentabilidade & Ambiente",
        },
        {
          value: "formacao_capacitacao",
          label: "Formação & Capacitação",
        },
      ],
    },

    en: {
      title: "Needs & Areas of Interest",

      description:
        "Help us identify your organization's main challenges and opportunities.",

      perceptionTitle:
        "How do you see 3HC for your organization?",

      perception: [
        {
          value: "transformacao_digital",
          label: "Digital transformation",
        },
        {
          value: "energia_sustentabilidade",
          label: "Energy efficiency & sustainability",
        },
        {
          value: "gestao_processos",
          label: "Management & processes",
        },
        {
          value: "conhecer_solucoes",
          label: "Learn more about our solutions",
        },
      ],

      areasTitle:
        "What are your priority areas?",

      areasHint:
        "Select the relevant options.",

      areas: [
        {
          value: "transformacao_digital",
          label: "Digital Transformation",
        },
        {
          value: "tecnologia_automacao",
          label: "Technology & Automation",
        },
        {
          value: "energia_eficiencia",
          label: "Energy & Efficiency",
        },
        {
          value: "sustentabilidade_ambiente",
          label: "Sustainability & Environment",
        },
        {
          value: "gestao_processos",
          label: "Management & Processes",
        },
        {
          value: "pessoas_capacitacao",
          label: "People & Training",
        },
      ],

      challengeTitle:
        "Main challenge or opportunity",

      placeholder:
        "Briefly describe...",

      solutionsTitle:
        "Which solutions are of greatest interest?",

      solutionsHint:
        "You may select more than one.",

      solutions: [
        {
          value: "sistemas_digitais",
          label: "Digital Systems",
        },
        {
          value: "automacao_tecnologia",
          label: "Automation & Technology",
        },
        {
          value: "energia_eficiencia",
          label: "Energy & Efficiency",
        },
        {
          value: "consultoria_gestao",
          label: "Consulting & Management",
        },
        {
          value: "sustentabilidade_ambiente",
          label: "Sustainability & Environment",
        },
        {
          value: "formacao_capacitacao",
          label: "Training & Capacity Building",
        },
      ],
    },
  };

  const t = content[idioma];

  return (
    <section className="space-y-6">

      {/* =====================================================
          TÍTULO
      ===================================================== */}

      <div>

        <h2 className="text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2 uppercase tracking-wide">

          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
            2
          </span>

          {t.title}

        </h2>

        <p className="text-xs text-slate-500 mt-2">
          {t.description}
        </p>

      </div>


      {/* =====================================================
          PERCEPÇÃO
      ===================================================== */}

      <div>

        <label className="block text-sm font-semibold text-slate-800 mb-2">
          {t.perceptionTitle}
        </label>

        <div className="space-y-2">

          {t.perception.map((option) => (

            <label
              key={option.value}
              className="
                flex items-center gap-3
                p-3 rounded-xl
                border border-slate-200
                hover:bg-emerald-50
                hover:border-emerald-300
                cursor-pointer
                transition
              "
            >

              <input
                type="radio"
                name="primeiraImpressao"
                value={option.value}
                checked={
                  formData.primeiraImpressao === option.value
                }
                onChange={(e) =>
                  updateField(
                    "primeiraImpressao",
                    e.target.value
                  )
                }
                className="text-emerald-600 focus:ring-emerald-500"
              />

              <span className="text-sm text-slate-700">
                {option.label}
              </span>

            </label>

          ))}

        </div>

      </div>


      {/* =====================================================
          ÁREAS PRIORITÁRIAS
      ===================================================== */}

      <div>

        <label className="block text-sm font-semibold text-slate-800 mb-1">
          {t.areasTitle}
        </label>

        <p className="text-xs text-slate-500 mb-3">
          {t.areasHint}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

          {t.areas.map((option) => (

            <label
              key={option.value}
              className="
                flex items-center gap-3
                p-3 rounded-xl
                border border-slate-200
                hover:bg-emerald-50
                hover:border-emerald-300
                cursor-pointer
                transition
              "
            >

              <input
                type="checkbox"
                checked={
                  formData.areasCriticas.includes(
                    option.value
                  )
                }
                onChange={() =>
                  toggleCheckbox(
                    "areasCriticas",
                    option.value
                  )
                }
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />

              <span className="text-sm text-slate-700">
                {option.label}
              </span>

            </label>

          ))}

        </div>

      </div>


      {/* =====================================================
          DESAFIO
      ===================================================== */}

      <div>

        <label className="block text-sm font-semibold text-slate-800 mb-1">
          {t.challengeTitle}
        </label>

        <textarea
          rows={3}
          value={formData.maiorDesafio}
          onChange={(e) =>
            updateField(
              "maiorDesafio",
              e.target.value
            )
          }
          className="
            w-full px-4 py-3
            rounded-xl
            border border-slate-300
            focus:ring-2
            focus:ring-emerald-500
            focus:outline-none
            text-sm
            transition
            resize-none
          "
          placeholder={t.placeholder}
        />

      </div>


      {/* =====================================================
          SOLUÇÕES
      ===================================================== */}

      <div>

        <label className="block text-sm font-semibold text-slate-800 mb-1">
          {t.solutionsTitle}
        </label>

        <p className="text-xs text-slate-500 mb-3">
          {t.solutionsHint}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

          {t.solutions.map((option) => (

            <label
              key={option.value}
              className="
                flex items-center gap-3
                p-3 rounded-xl
                border border-slate-200
                hover:bg-emerald-50
                hover:border-emerald-300
                cursor-pointer
                transition
              "
            >

              <input
                type="checkbox"
                checked={
                  formData.servicosInteresse.includes(
                    option.value
                  )
                }
                onChange={() =>
                  toggleCheckbox(
                    "servicosInteresse",
                    option.value
                  )
                }
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />

              <span className="text-sm text-slate-700">
                {option.label}
              </span>

            </label>

          ))}

        </div>

      </div>

    </section>
  );
}

