"use client";

import React from "react";
import Image from "next/image";
import {
  LockKeyhole,
  Languages,
} from "lucide-react";

import { Idioma } from "./Formulario3HC";

interface FormularioHeaderProps {
  onPrivado?: () => void;
  idioma: Idioma;
  onIdiomaChange: (idioma: Idioma) => void;
}

export default function FormularioHeader({
  onPrivado,
  idioma,
  onIdiomaChange,
}: FormularioHeaderProps) {

  const content = {
    pt: {
      lema: "Lema FACIM 2026",
      lemaTexto:
        "Transformação Digital e Energética Rumo a uma Economia Sustentável",

      titulo:
        "Inquérito 3HC Soluções Inteligentes",

      descricao:
        "Ajude-nos a compreender os desafios e oportunidades da sua organização preenchendo este formulário.",

      areas: "Áreas de atuação",

      consultoria:
        "Consultoria Corporativa",

      assistencia:
        "Assistência Técnica",

      solucoes:
        "Soluções Inteligentes",

      privado:
        "Área Privada",
    },

    en: {
      lema: "FACIM 2026 Theme",

      lemaTexto:
        "Digital and Energy Transformation Towards a Sustainable Economy",

      titulo:
        "3HC Smart Solutions Survey",

      descricao:
        "Help us understand your organization's challenges and opportunities by completing this form.",

      areas: "Areas of Expertise",

      consultoria:
        "Corporate Consulting",

      assistencia:
        "Technical Assistance",

      solucoes:
        "Smart Solutions",

      privado:
        "Private Area",
    },
  };

  const t = content[idioma];

  return (
    <header className="relative overflow-hidden text-white">

      {/* =====================================================
          IMAGEM DE FUNDO
      ===================================================== */}

      <Image
        src="/imagem.jpeg"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />


      {/* =====================================================
          SOBREPOSIÇÃO
      ===================================================== */}

      <div className="absolute inset-0 bg-emerald-950/50" />

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/25 via-teal-800/15 to-emerald-950/35" />


      {/* =====================================================
          ELEMENTOS DECORATIVOS
      ===================================================== */}

      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-teal-300/10 blur-3xl" />


      {/* =====================================================
          CONTEÚDO
      ===================================================== */}

      <div className="relative px-5 sm:px-8 py-6 sm:py-8">


        {/* =====================================================
            LOGOTIPOS
        ===================================================== */}

        <div className="flex justify-center items-center gap-4 sm:gap-8">

          {/* LOGO 3HC */}

          <div
            className="
              flex items-center justify-center
              w-32 h-20
              sm:w-44 sm:h-24
              bg-white
              rounded-2xl
              shadow-2xl
              px-4
              py-3
            "
          >
            <Image
              src="/logo_tipo.png"
              alt="3HC Soluções Inteligentes"
              width={180}
              height={90}
              priority
              className="max-w-full max-h-full object-contain"
            />
          </div>


          {/* DIVISOR */}

          <div className="h-14 sm:h-16 w-px bg-white/40" />


          {/* LOGO FACIM */}

          <div
            className="
              flex items-center justify-center
              w-32 h-20
              sm:w-44 sm:h-24
              bg-white
              rounded-2xl
              shadow-2xl
              px-4
              py-3
            "
          >
            <Image
              src="/facim.png"
              alt="FACIM"
              width={180}
              height={90}
              priority
              className="max-w-full max-h-full object-contain"
            />
          </div>

        </div>


        {/* =====================================================
            LEMA FACIM 2026
        ===================================================== */}

        <div
          className="
            mt-6
            max-w-3xl
            mx-auto
            text-center
            rounded-2xl
            border border-white/20
            bg-black/20
            backdrop-blur-md
            px-5 py-4
            shadow-xl
          "
        >

          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
            {t.lema}
          </p>

          <p className="mt-1.5 text-sm sm:text-base font-semibold text-white leading-relaxed">
            {t.lemaTexto}
          </p>

        </div>


        {/* =====================================================
            INQUÉRITO
        ===================================================== */}

        <div className="mt-6 text-center max-w-3xl mx-auto">

          <div className="w-12 h-1 rounded-full bg-emerald-300 mx-auto mb-4" />

          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {t.titulo}
          </h1>

          <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/90">
            {t.descricao}
          </p>

        </div>


        {/* =====================================================
            ÁREAS DE ATUAÇÃO
        ===================================================== */}

        <div
          className="
            mt-7
            max-w-4xl
            mx-auto
            rounded-2xl
            border border-emerald-300/30
            bg-emerald-950/70
            backdrop-blur-md
            px-4 py-5
            shadow-2xl
          "
        >

          <p
            className="
              text-center
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-emerald-200
              mb-4
            "
          >
            {t.areas}
          </p>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            <div
              className="
                rounded-xl
                bg-white
                text-emerald-900
                px-4 py-3
                text-center
                text-sm
                font-bold
                shadow-lg
              "
            >
              {t.consultoria}
            </div>


            <div
              className="
                rounded-xl
                bg-white
                text-emerald-900
                px-4 py-3
                text-center
                text-sm
                font-bold
                shadow-lg
              "
            >
              {t.assistencia}
            </div>


            <div
              className="
                rounded-xl
                bg-white
                text-emerald-900
                px-4 py-3
                text-center
                text-sm
                font-bold
                shadow-lg
              "
            >
              {t.solucoes}
            </div>

          </div>

        </div>


        {/* =====================================================
            CONTROLOS
        ===================================================== */}

        <div className="flex justify-end items-center gap-2 mt-5">


          {/* =================================================
              IDIOMA
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              onIdiomaChange(
                idioma === "pt"
                  ? "en"
                  : "pt"
              )
            }
            className="
              flex
              items-center
              gap-2
              px-3
              py-2.5
              rounded-xl
              bg-black/25
              hover:bg-black/40
              border border-white/25
              backdrop-blur-md
              transition
              text-xs
              font-bold
              shadow-lg
            "
            aria-label="Alterar idioma"
          >

            <Languages size={15} />

            {idioma === "pt"
              ? "EN"
              : "PT"}

          </button>


          {/* =================================================
              ÁREA PRIVADA
          ================================================= */}

          {onPrivado && (
            <button
              type="button"
              onClick={onPrivado}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-black/25
                hover:bg-black/40
                border border-white/25
                backdrop-blur-md
                transition
                text-sm
                font-semibold
                shadow-lg
              "
            >

              <LockKeyhole size={16} />

              <span>
                {t.privado}
              </span>

            </button>
          )}

        </div>

      </div>


      {/* =====================================================
          LINHA INFERIOR
      ===================================================== */}

      <div
        className="
          relative
          h-1
          bg-gradient-to-r
          from-emerald-300
          via-white/70
          to-teal-300
        "
      />

    </header>
  );
}