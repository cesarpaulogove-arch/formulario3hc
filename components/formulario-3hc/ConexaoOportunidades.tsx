
import React from "react";
import { FormularioData } from "./Formulario3HC";

interface Props {
  formData: FormularioData;

  updateField: (
    field: keyof FormularioData,
    value: string | string[]
  ) => void;
}

export default function ConexaoOportunidades({
  formData,
  updateField,
}: Props) {
  return (
    <section className="space-y-4">

      {/* TÍTULO */}

      <div>

        <h2 className="text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2 uppercase tracking-wide">

          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
            3
          </span>

          Conexão & Oportunidades

        </h2>

        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Em sintonia com o lema da FACIM 2026, queremos identificar
          oportunidades de colaboração para uma organização mais
          digital, eficiente e sustentável.
        </p>

      </div>


      {/* PRÓXIMO PASSO */}

      <div>

        <label className="block text-sm font-semibold text-slate-800 mb-2">

          Como gostaria que a 3HC acompanhasse a sua organização?

        </label>

        <div className="space-y-2">

          {[
            "Agendar uma reunião para diagnóstico e oportunidades.",

            "Conhecer soluções digitais e tecnológicas.",

            "Conhecer soluções energéticas e sustentáveis.",

            "Manter contacto para futuras oportunidades.",
          ].map((option) => (

            <label
              key={option}
              className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-emerald-50/50 cursor-pointer transition"
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
                className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
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

