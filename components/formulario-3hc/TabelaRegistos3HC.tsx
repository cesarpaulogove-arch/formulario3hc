"use client";

import React, { useEffect, useState } from "react";
import {
  RefreshCw,
  LogOut,
  Users,
  Eye,
  FileText,
  AlertCircle,
} from "lucide-react";

// =====================================================
// TIPOS
// =====================================================

interface FormularioRegistro {
  id: number;

  nome: string;

  email?: string | null;

  telefone?: string | null;

  empresa?: string | null;

  cargo?: string | null;

  // NOVO
  responsavel: string;

  primeiraImpressao?: string | null;

  areasCriticas?: string | null;

  maiorDesafio?: string | null;

  servicosInteresse?: string | null;

  proximoPasso?: string | null;

  mensagem?: string | null;

  createdAt: string;
}

interface VisitaRegistro {
  id: number;

  visitante?: string | null;

  pagina?: string | null;

  createdAt: string;
}

interface TabelaRegistos3HCProps {
  onLogout?: () => void;
}

// =====================================================
// COMPONENTE
// =====================================================

export default function TabelaRegistos3HC({
  onLogout,
}: TabelaRegistos3HCProps) {
  // ===================================================
  // ESTADOS
  // ===================================================

  const [formularios, setFormularios] =
    useState<FormularioRegistro[]>([]);

  const [visitas, setVisitas] =
    useState<VisitaRegistro[]>([]);

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] = useState("");

  // ===================================================
  // CARREGAR DADOS
  // ===================================================

  const carregarDados = async () => {
    try {
      setCarregando(true);
      setErro("");

      const [
        resRegistros,
        resVisitas,
      ] = await Promise.all([
        fetch("/api/formularios", {
          method: "GET",
          cache: "no-store",
        }),

        fetch("/api/visitas", {
          method: "GET",
          cache: "no-store",
        }),
      ]);

      // =================================================
      // VERIFICAR FORMULÁRIOS
      // =================================================

      if (!resRegistros.ok) {
        const texto =
          await resRegistros.text();

        let mensagem =
          `Erro ao carregar formulários (${resRegistros.status})`;

        try {
          const dados =
            JSON.parse(texto);

          if (dados?.error) {
            mensagem = dados.error;
          }
        } catch {
          if (texto) {
            mensagem = texto;
          }
        }

        throw new Error(mensagem);
      }

      // =================================================
      // VERIFICAR VISITAS
      // =================================================

      if (!resVisitas.ok) {
        const texto =
          await resVisitas.text();

        let mensagem =
          `Erro ao carregar visitas (${resVisitas.status})`;

        try {
          const dados =
            JSON.parse(texto);

          if (dados?.error) {
            mensagem = dados.error;
          }
        } catch {
          if (texto) {
            mensagem = texto;
          }
        }

        throw new Error(mensagem);
      }

      // =================================================
      // CONVERTER RESPOSTAS
      // =================================================

      const dadosRegistros =
        await resRegistros.json();

      const dadosVisitas =
        await resVisitas.json();

      // =================================================
      // FORMULÁRIOS
      // =================================================

      if (Array.isArray(dadosRegistros)) {
        setFormularios(dadosRegistros);
      } else {
        setFormularios(
          dadosRegistros?.formularios || []
        );
      }

      // =================================================
      // VISITAS
      // =================================================

      if (Array.isArray(dadosVisitas)) {
        setVisitas(dadosVisitas);
      } else {
        setVisitas(
          dadosVisitas?.visitas || []
        );
      }

    } catch (error) {
      console.error(
        "Erro ao carregar dados:",
        error
      );

      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao carregar dados."
      );

    } finally {
      setCarregando(false);
    }
  };

  // ===================================================
  // CARREGAR AO ABRIR
  // ===================================================

  useEffect(() => {
    carregarDados();
  }, []);

  // ===================================================
  // FORMATAR DATA
  // ===================================================

  const formatarData = (
    data: string
  ) => {
    try {
      return new Date(
        data
      ).toLocaleString("pt-PT");
    } catch {
      return data;
    }
  };

  // ===================================================
  // FORMATAR LISTAS JSON
  // ===================================================

  const formatarLista = (
    valor?: string | null
  ) => {
    if (!valor) {
      return "-";
    }

    try {
      const dados = JSON.parse(valor);

      if (Array.isArray(dados)) {
        if (dados.length === 0) {
          return "-";
        }

        return dados.join(" • ");
      }

      return valor;

    } catch {
      return valor;
    }
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="w-full">

      {/* =================================================
          CABEÇALHO
      ================================================= */}

      <div className="bg-white rounded-2xl shadow-xl p-5 mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
              Painel privado
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              Registos 3HC
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Formulários recebidos e visitas registadas.
            </p>

          </div>

          <div className="flex gap-3">

            {/* ATUALIZAR */}

            <button
              type="button"
              onClick={carregarDados}
              disabled={carregando}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-slate-900
                hover:bg-slate-800
                disabled:opacity-50
                text-white
                font-semibold
                transition
              "
            >

              <RefreshCw
                size={17}
                className={
                  carregando
                    ? "animate-spin"
                    : ""
                }
              />

              Atualizar

            </button>

            {/* SAIR */}

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  font-semibold
                  transition
                "
              >

                <LogOut size={17} />

                Sair

              </button>
            )}

          </div>

        </div>

      </div>

      {/* =================================================
          ERRO
      ================================================= */}

      {erro && (
        <div
          className="
            mb-6
            rounded-2xl
            bg-red-50
            border
            border-red-200
            p-5
            text-red-700
          "
        >

          <div className="flex gap-3">

            <AlertCircle
              size={22}
              className="shrink-0"
            />

            <div>

              <p className="font-bold">
                Não foi possível carregar os dados
              </p>

              <p className="text-sm mt-1">
                {erro}
              </p>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          ESTATÍSTICAS
      ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* FORMULÁRIOS */}

        <div className="bg-white rounded-2xl shadow-lg p-5">

          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-emerald-100
                text-emerald-700
                flex
                items-center
                justify-center
              "
            >

              <FileText size={22} />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Formulários
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {formularios.length}
              </p>

            </div>

          </div>

        </div>

        {/* VISITAS */}

        <div className="bg-white rounded-2xl shadow-lg p-5">

          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-blue-100
                text-blue-700
                flex
                items-center
                justify-center
              "
            >

              <Eye size={22} />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Visitas
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {visitas.length}
              </p>

            </div>

          </div>

        </div>

        {/* TOTAL */}

        <div className="bg-white rounded-2xl shadow-lg p-5">

          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-purple-100
                text-purple-700
                flex
                items-center
                justify-center
              "
            >

              <Users size={22} />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Total
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {formularios.length + visitas.length}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          TABELA FORMULÁRIOS
      ================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow-xl
          overflow-hidden
          mb-6
        "
      >

        {/* CABEÇALHO */}

        <div className="p-5 border-b border-slate-200">

          <h3 className="font-bold text-lg text-slate-900">
            Formulários recebidos
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Todos os dados enviados pelos visitantes.
          </p>

        </div>

        {/* CARREGANDO */}

        {carregando ? (

          <div className="p-10 text-center text-slate-500">
            A carregar dados...
          </div>

        ) : formularios.length === 0 ? (

          <div className="p-10 text-center text-slate-500">
            Ainda não existem formulários registados.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[2400px] text-sm">

              {/* CABEÇALHO DA TABELA */}

              <thead className="bg-slate-50">

                <tr>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    ID
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Nome
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    E-mail
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Telefone
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Empresa
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Cargo
                  </th>

                  {/* NOVO */}

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Responsável 3HC
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Primeira impressão
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Áreas críticas
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Maior desafio
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Serviços de interesse
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Próximo passo
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Mensagem
                  </th>

                  <th className="text-left p-4 font-semibold whitespace-nowrap">
                    Data
                  </th>

                </tr>

              </thead>

              {/* DADOS */}

              <tbody>

                {formularios.map((item) => (

                  <tr
                    key={item.id}
                    className="
                      border-t
                      border-slate-100
                      hover:bg-slate-50
                    "
                  >

                    {/* ID */}

                    <td className="p-4">
                      {item.id}
                    </td>

                    {/* NOME */}

                    <td className="p-4 font-semibold whitespace-nowrap">
                      {item.nome}
                    </td>

                    {/* EMAIL */}

                    <td className="p-4 whitespace-nowrap">
                      {item.email || "-"}
                    </td>

                    {/* TELEFONE */}

                    <td className="p-4 whitespace-nowrap">
                      {item.telefone || "-"}
                    </td>

                    {/* EMPRESA */}

                    <td className="p-4">
                      {item.empresa || "-"}
                    </td>

                    {/* CARGO */}

                    <td className="p-4">
                      {item.cargo || "-"}
                    </td>

                    {/* RESPONSÁVEL */}

                    <td className="p-4 font-semibold text-emerald-700 whitespace-nowrap">
                      {item.responsavel || "-"}
                    </td>

                    {/* PRIMEIRA IMPRESSÃO */}

                    <td className="p-4 min-w-[250px] max-w-[350px]">
                      {item.primeiraImpressao || "-"}
                    </td>

                    {/* ÁREAS CRÍTICAS */}

                    <td className="p-4 min-w-[250px] max-w-[350px]">
                      {formatarLista(
                        item.areasCriticas
                      )}
                    </td>

                    {/* MAIOR DESAFIO */}

                    <td className="p-4 min-w-[250px] max-w-[350px]">
                      {item.maiorDesafio || "-"}
                    </td>

                    {/* SERVIÇOS */}

                    <td className="p-4 min-w-[250px] max-w-[350px]">
                      {formatarLista(
                        item.servicosInteresse
                      )}
                    </td>

                    {/* PRÓXIMO PASSO */}

                    <td className="p-4 min-w-[200px] max-w-[300px]">
                      {item.proximoPasso || "-"}
                    </td>

                    {/* MENSAGEM */}

                    <td className="p-4 min-w-[300px] max-w-[450px]">
                      {item.mensagem || "-"}
                    </td>

                    {/* DATA */}

                    <td className="p-4 whitespace-nowrap">
                      {formatarData(
                        item.createdAt
                      )}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* =================================================
          TABELA VISITAS
      ================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow-xl
          overflow-hidden
        "
      >

        <div className="p-5 border-b border-slate-200">

          <h3 className="font-bold text-lg text-slate-900">
            Visitas registadas
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Registos de acesso às páginas da aplicação.
          </p>

        </div>

        {visitas.length === 0 ? (

          <div className="p-10 text-center text-slate-500">
            Ainda não existem visitas registadas.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-slate-50">

                <tr>

                  <th className="text-left p-4 font-semibold">
                    ID
                  </th>

                  <th className="text-left p-4 font-semibold">
                    Visitante
                  </th>

                  <th className="text-left p-4 font-semibold">
                    Página
                  </th>

                  <th className="text-left p-4 font-semibold">
                    Data
                  </th>

                </tr>

              </thead>

              <tbody>

                {visitas.map((item) => (

                  <tr
                    key={item.id}
                    className="
                      border-t
                      border-slate-100
                      hover:bg-slate-50
                    "
                  >

                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4">
                      {item.visitante || "-"}
                    </td>

                    <td className="p-4">
                      {item.pagina || "-"}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      {formatarData(
                        item.createdAt
                      )}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

