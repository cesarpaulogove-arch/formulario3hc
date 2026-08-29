
import React from "react";
import { FormularioData } from "./Formulario3HC";

interface Props {
  formData: FormularioData;

  updateField: (
    field: keyof FormularioData,
    value: string | string[]
  ) => void;
}

export default function PerfilVisitante({
  formData,
  updateField,
}: Props) {
  return (
    <section className="space-y-4">

      {/* =====================================================
          TÍTULO
      ===================================================== */}

      <h2 className="text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2 uppercase tracking-wide">

        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
          1
        </span>

        Identificação & Perfil

      </h2>


      {/* =====================================================
          NOME + EMPRESA
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* NOME */}

        <div>

          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            Nome Completo *
          </label>

          <input
            type="text"
            required
            value={formData.nome}
            onChange={(e) =>
              updateField("nome", e.target.value)
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm transition"
            placeholder="Seu nome"
          />

        </div>


        {/* EMPRESA */}

        <div>

          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            Empresa / Instituição *
          </label>

          <input
            type="text"
            required
            value={formData.empresa}
            onChange={(e) =>
              updateField("empresa", e.target.value)
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm transition"
            placeholder="Nome da organização"
          />

        </div>

      </div>


      {/* =====================================================
          RESPONSÁVEL 3HC
      ===================================================== */}

      <div>

        <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
          Responsável 3HC *
        </label>

        <select
          required
          value={formData.responsavel}
          onChange={(e) =>
            updateField(
              "responsavel",
              e.target.value
            )
          }
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm transition"
        >

          <option value="">
            Selecione o responsável...
          </option>

          <option value="Humberto Heliotrope">
            Humberto Heliotrope
          </option>

          <option value="Hermenegildo Ildofonso">
            Hermenegildo Ildofonso
          </option>

          <option value="Helder Marcos">
            Helder Marcos
          </option>

          <option value="Cesar Gove">
            Cesar Gove
          </option>

        </select>

      </div>


      {/* =====================================================
          CARGO + CONTACTO
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* CARGO */}

        <div>

          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            Cargo / Função
          </label>

          <select
            value={formData.cargo}
            onChange={(e) =>
              updateField(
                "cargo",
                e.target.value
              )
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm transition"
          >

            <option value="">
              Selecione...
            </option>

            <option value="Direcao / Gestao">
              Direção / Gestão
            </option>

            <option value="Tecnologia / TI">
              Tecnologia / TI
            </option>

            <option value="Tecnico / Engenharia">
              Técnico / Engenharia
            </option>

            <option value="Financas / Negocios">
              Finanças / Negócios
            </option>

            <option value="Recursos Humanos">
              Recursos Humanos
            </option>

            <option value="Comunicacao / Marketing">
              Comunicação / Marketing
            </option>

            <option value="Outro">
              Outro
            </option>

          </select>

        </div>


        {/* CONTACTO */}

        <div>

          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            Contacto *
          </label>

          <input
            type="text"
            required
            value={formData.contacto}
            onChange={(e) =>
              updateField(
                "contacto",
                e.target.value
              )
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm transition"
            placeholder="WhatsApp ou E-mail"
          />

        </div>

      </div>

    </section>
  );
}

