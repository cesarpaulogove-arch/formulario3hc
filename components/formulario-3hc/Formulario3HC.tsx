
"use client";

import React, { useState } from "react";

import FormularioHeader from "./FormularioHeader";
import PerfilVisitante from "./PerfilVisitante";
import PerfilNecessidades from "./PerfilNecessidades";
import ConexaoOportunidades from "./ConexaoOportunidades";
import FormularioSucesso from "./FormularioSucesso";
import TabelaRegistos3HC from "./TabelaRegistos3HC";
import LoginPrivado from "./LoginPrivado";

export type Idioma = "pt" | "en";

export interface FormularioData {
  nome: string;
  empresa: string;
  cargo: string;
  contacto: string;
  responsavel: string;
  primeiraImpressao: string;
  areasCriticas: string[];
  maiorDesafio: string;
  servicosInteresse: string[];
  proximoPasso: string;
}

const initialFormData: FormularioData = {
  nome: "",
  empresa: "",
  cargo: "",
  contacto: "",
  responsavel: "",
  primeiraImpressao: "",
  areasCriticas: [],
  maiorDesafio: "",
  servicosInteresse: [],
  proximoPasso: "",
};

export default function Formulario3HC() {

  // =====================================================
  // ESTADOS
  // =====================================================

  const [idioma, setIdioma] = useState<Idioma>("pt");

  const [submitted, setSubmitted] = useState(false);

  const [enviando, setEnviando] = useState(false);

  const [erro, setErro] = useState("");

  const [mostrarLogin, setMostrarLogin] = useState(false);

  const [privadoAutenticado, setPrivadoAutenticado] =
    useState(false);

  const [formData, setFormData] =
    useState<FormularioData>(initialFormData);


  // =====================================================
  // TRADUÇÕES PRINCIPAIS
  // =====================================================

  const textos = {
    pt: {
      erroEnvio: "Não foi possível enviar:",
      enviar: "Enviar Resposta",
      enviando: "A enviar...",
      privacidade:
        "Os seus dados estão protegidos e serão utilizados exclusivamente pela 3HC.",
    },

    en: {
      erroEnvio: "Unable to submit:",
      enviar: "Submit Response",
      enviando: "Submitting...",
      privacidade:
        "Your data is protected and will be used exclusively by 3HC.",
    },
  };

  const t = textos[idioma];


  // =====================================================
  // ALTERAR IDIOMA
  // =====================================================

  const alterarIdioma = (novoIdioma: Idioma) => {
    setIdioma(novoIdioma);
  };


  // =====================================================
  // ATUALIZAR CAMPOS
  // =====================================================

  const updateField = (
    field: keyof FormularioData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  // =====================================================
  // CHECKBOX
  // =====================================================

  const toggleCheckbox = (
    field: "areasCriticas" | "servicosInteresse",
    option: string
  ) => {
    setFormData((prev) => {

      const current = prev[field];

      const exists = current.includes(option);

      return {
        ...prev,

        [field]: exists
          ? current.filter((item) => item !== option)
          : [...current, option],
      };
    });
  };


  // =====================================================
  // ENVIAR FORMULÁRIO
  // =====================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (enviando) return;

    setEnviando(true);
    setErro("");

    try {

      console.log(
        "📤 Enviando formulário:",
        formData
      );

      const response = await fetch(
        "/api/formularios",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const texto = await response.text();

      console.log(
        "📥 Status da API:",
        response.status
      );

      console.log(
        "📥 Resposta da API:",
        texto
      );

      let resultado: any = null;

      try {
        resultado = texto
          ? JSON.parse(texto)
          : null;
      } catch {
        resultado = null;
      }

      if (!response.ok) {

        const mensagem =
          resultado?.details ||
          resultado?.error ||
          texto ||
          `Erro HTTP ${response.status}`;

        throw new Error(mensagem);
      }

      console.log(
        "✅ Formulário registado:",
        resultado
      );

      setSubmitted(true);

    } catch (error) {

      console.error(
        "❌ ERRO AO ENVIAR FORMULÁRIO:",
        error
      );

      const mensagem =
        error instanceof Error
          ? error.message
          : idioma === "pt"
            ? "Ocorreu um erro ao enviar o formulário."
            : "An error occurred while submitting the form.";

      setErro(mensagem);

    } finally {

      setEnviando(false);
    }
  };


  // =====================================================
  // LOGIN PRIVADO
  // =====================================================

  const abrirPrivado = () => {
    setMostrarLogin(true);
    setErro("");
  };


  const fecharPrivado = () => {
    setMostrarLogin(false);
  };


  const loginSucesso = () => {
    setMostrarLogin(false);
    setPrivadoAutenticado(true);
  };


  // =====================================================
  // TERMINAR SESSÃO
  // =====================================================

  const sairPrivado = async () => {

    try {

      await fetch(
        "/api/auth/logout",
        {
          method: "POST",
        }
      );

    } catch (error) {

      console.error(
        "Erro ao terminar sessão:",
        error
      );
    }

    setPrivadoAutenticado(false);
  };


  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {

    setSubmitted(false);

    setErro("");

    setFormData({
      ...initialFormData,
    });
  };


  // =====================================================
  // ÁREA PRIVADA
  // =====================================================

  if (privadoAutenticado) {

    return (
      <main className="min-h-screen bg-slate-950 p-4 sm:p-6">

        <div className="max-w-7xl mx-auto">

          <TabelaRegistos3HC
            onLogout={sairPrivado}
          />

        </div>

      </main>
    );
  }


  // =====================================================
  // FORMULÁRIO ENVIADO
  // =====================================================

  if (submitted) {

    return (
      <FormularioSucesso
        onReset={resetForm}
        idioma={idioma}
      />
    );
  }


  // =====================================================
  // FORMULÁRIO PÚBLICO
  // =====================================================

  return (
    <>

      <main className="min-h-screen bg-slate-950 py-10 px-4 text-slate-800 font-sans">

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-800">

          {/* =================================================
              HEADER
          ================================================= */}

          <FormularioHeader
            onPrivado={abrirPrivado}
            idioma={idioma}
            onIdiomaChange={alterarIdioma}
          />


          {/* =================================================
              FORMULÁRIO
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 space-y-8"
          >

            {/* PERFIL */}

            <PerfilVisitante
              formData={formData}
              updateField={updateField}
              idioma={idioma}
            />


            {/* NECESSIDADES */}

            <PerfilNecessidades
              formData={formData}
              updateField={updateField}
              toggleCheckbox={toggleCheckbox}
              idioma={idioma}
            />


            {/* OPORTUNIDADES */}

            <ConexaoOportunidades
              formData={formData}
              updateField={updateField}
              idioma={idioma}
            />


            {/* ERRO */}

            {erro && (

              <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">

                <strong className="block mb-1">
                  {t.erroEnvio}
                </strong>

                <span>
                  {erro}
                </span>

              </div>

            )}


            {/* ENVIAR */}

            <button
              type="submit"
              disabled={enviando}
              className="
                w-full
                py-4
                bg-gradient-to-r
                from-emerald-600
                to-teal-600
                hover:from-emerald-700
                hover:to-teal-700
                disabled:opacity-60
                disabled:cursor-not-allowed
                text-white
                font-bold
                rounded-2xl
                shadow-xl
                shadow-emerald-600/20
                transition
                flex
                items-center
                justify-center
                gap-2
                text-base
                uppercase
                tracking-wider
              "
            >

              {enviando
                ? t.enviando
                : t.enviar}

            </button>


            {/* PRIVACIDADE */}

            <p className="text-center text-xs text-slate-400">
              {t.privacidade}
            </p>

          </form>

        </div>

      </main>


      {/* =================================================
          LOGIN PRIVADO
      ================================================= */}

      {mostrarLogin && (

        <LoginPrivado
          onClose={fecharPrivado}
          onSuccess={loginSucesso}
          idioma={idioma}
        />

      )}

    </>
  );
}

