
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
}

export default function PerfilNecessidades({
  formData,
  updateField,
  toggleCheckbox,
}: Props) {
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

          Necessidades & Áreas de Interesse

        </h2>

        <p className="text-xs text-slate-500 mt-2">
          Ajude-nos a identificar os principais desafios e oportunidades
          da sua organização.
        </p>

      </div>


      {/* =====================================================
          PERCEPÇÃO DA 3HC
      ===================================================== */}

      <div>

        <label className="block text-sm font-semibold text-slate-800 mb-2">
          Como vê a 3HC para a sua organização?
        </label>

        <div className="space-y-2">

          {[
            "Parceiro para transformação digital.",
            "Parceiro para eficiência energética e sustentabilidade.",
            "Parceiro para melhoria de processos e gestão.",
            "Gostaria de conhecer melhor as soluções da 3HC.",
          ].map((option) => (

            <label
              key={option}
              className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-emerald-50/50 cursor-pointer transition"
            >

              <input
                type="radio"
                name="primeiraImpressao"
                value={option}
                checked={
                  formData.primeiraImpressao === option
                }
                onChange={(e) =>
                  updateField(
                    "primeiraImpressao",
                    e.target.value
                  )
                }
                className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
              />

              <span className="text-sm text-slate-700">
                {option}
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
          Quais são as áreas prioritárias?
        </label>

        <p className="text-xs text-slate-500 mb-3">
          Selecione as opções relevantes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

          {[
            "Transformação Digital",
            "Tecnologia & Automação",
            "Energia & Eficiência Energética",
            "Sustentabilidade & Ambiente",
            "Gestão & Processos",
            "Pessoas & Capacitação",
          ].map((option) => (

            <label
              key={option}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-emerald-50/50 cursor-pointer transition"
            >

              <input
                type="checkbox"
                checked={formData.areasCriticas.includes(option)}
                onChange={() =>
                  toggleCheckbox(
                    "areasCriticas",
                    option
                  )
                }
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />

              <span className="text-sm text-slate-700">
                {option}
              </span>

            </label>

          ))}

        </div>

      </div>


      {/* =====================================================
          PRINCIPAL DESAFIO
      ===================================================== */}

      <div>

        <label className="block text-sm font-semibold text-slate-800 mb-1">
          Principal desafio ou oportunidade
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
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm transition resize-none"
          placeholder="Descreva brevemente..."
        />

      </div>


      {/* =====================================================
          SOLUÇÕES DE INTERESSE
      ===================================================== */}

      <div>

        <label className="block text-sm font-semibold text-slate-800 mb-1">
          Que soluções despertam maior interesse?
        </label>

        <p className="text-xs text-slate-500 mb-3">
          Pode selecionar mais de uma.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

          {[
            "Sistemas Digitais & Software",
            "Automação & Tecnologia",
            "Energia & Eficiência",
            "Consultoria & Gestão",
            "Sustentabilidade & Ambiente",
            "Formação & Capacitação",
          ].map((option) => (

            <label
              key={option}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-emerald-50/50 cursor-pointer transition"
            >

              <input
                type="checkbox"
                checked={formData.servicosInteresse.includes(option)}
                onChange={() =>
                  toggleCheckbox(
                    "servicosInteresse",
                    option
                  )
                }
                className="rounded text-emerald-600 focus:ring-emerald-500"
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

