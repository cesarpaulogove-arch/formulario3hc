
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

export default function PerfilVisitante({
  formData,
  updateField,
  idioma = "pt",
}: Props) {

  const content = {
    pt: {
      title: "Identificação & Perfil",

      nome: "Nome Completo *",
      nomePlaceholder: "Seu nome",

      empresa: "Empresa / Instituição *",
      empresaPlaceholder: "Nome da organização",

      responsavel: "Responsável 3HC *",
      responsavelPlaceholder: "Selecione o responsável...",

      cargo: "Cargo / Função",
      cargoPlaceholder: "Selecione...",

      contacto: "Contacto *",
      contactoPlaceholder: "WhatsApp ou E-mail",

      cargos: {
        direcao: "Direção / Gestão",
        tecnologia: "Tecnologia / TI",
        tecnico: "Técnico / Engenharia",
        financas: "Finanças / Negócios",
        rh: "Recursos Humanos",
        comunicacao: "Comunicação / Marketing",
        outro: "Outro",
      },
    },

    en: {
      title: "Identification & Profile",

      nome: "Full Name *",
      nomePlaceholder: "Your name",

      empresa: "Company / Institution *",
      empresaPlaceholder: "Organization name",

      responsavel: "3HC Representative *",
      responsavelPlaceholder: "Select the representative...",

      cargo: "Position / Role",
      cargoPlaceholder: "Select...",

      contacto: "Contact *",
      contactoPlaceholder: "WhatsApp or Email",

      cargos: {
        direcao: "Management / Executive",
        tecnologia: "Technology / IT",
        tecnico: "Technical / Engineering",
        financas: "Finance / Business",
        rh: "Human Resources",
        comunicacao: "Communication / Marketing",
        outro: "Other",
      },
    },
  };

  const t = content[idioma];

  return (
    <section className="space-y-4">

      {/* =====================================================
          TÍTULO
      ===================================================== */}

      <h2 className="text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2 uppercase tracking-wide">

        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
          1
        </span>

        {t.title}

      </h2>


      {/* =====================================================
          NOME + EMPRESA
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* NOME */}

        <div>

          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            {t.nome}
          </label>

          <input
            type="text"
            required
            value={formData.nome}
            onChange={(e) =>
              updateField("nome", e.target.value)
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm transition"
            placeholder={t.nomePlaceholder}
          />

        </div>


        {/* EMPRESA */}

        <div>

          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            {t.empresa}
          </label>

          <input
            type="text"
            required
            value={formData.empresa}
            onChange={(e) =>
              updateField("empresa", e.target.value)
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm transition"
            placeholder={t.empresaPlaceholder}
          />

        </div>

      </div>


      {/* =====================================================
          RESPONSÁVEL 3HC
      ===================================================== */}

      <div>

        <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
          {t.responsavel}
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
            {t.responsavelPlaceholder}
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
            {t.cargo}
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
              {t.cargoPlaceholder}
            </option>

            <option value="Direcao / Gestao">
              {t.cargos.direcao}
            </option>

            <option value="Tecnologia / TI">
              {t.cargos.tecnologia}
            </option>

            <option value="Tecnico / Engenharia">
              {t.cargos.tecnico}
            </option>

            <option value="Financas / Negocios">
              {t.cargos.financas}
            </option>

            <option value="Recursos Humanos">
              {t.cargos.rh}
            </option>

            <option value="Comunicacao / Marketing">
              {t.cargos.comunicacao}
            </option>

            <option value="Outro">
              {t.cargos.outro}
            </option>

          </select>

        </div>


        {/* CONTACTO */}

        <div>

          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            {t.contacto}
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
            placeholder={t.contactoPlaceholder}
          />

        </div>

      </div>

    </section>
  );
}

