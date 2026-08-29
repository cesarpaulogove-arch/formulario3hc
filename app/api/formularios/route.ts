
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================================================
// POST - GUARDAR FORMULÁRIO NO BANCO DE DADOS
// =====================================================

export async function POST(request: NextRequest) {
  try {
    // ===================================================
    // RECEBER DADOS DO FRONTEND
    // ===================================================

    const body = await request.json();

    console.log("📥 Dados recebidos pela API:", body);

    const {
      nome,
      email,
      empresa,
      cargo,
      contacto,
      telefone,

      // NOVO CAMPO
      responsavel,

      primeiraImpressao,
      areasCriticas,
      maiorDesafio,
      servicosInteresse,
      proximoPasso,
      mensagem,
    } = body;

    // ===================================================
    // VALIDAR NOME
    // ===================================================

    if (!nome || String(nome).trim() === "") {
      return NextResponse.json(
        {
          sucesso: false,
          error: "O nome é obrigatório.",
        },
        {
          status: 400,
        }
      );
    }

    // ===================================================
    // VALIDAR EMPRESA / INSTITUIÇÃO
    // ===================================================

    if (
      !empresa ||
      String(empresa).trim() === ""
    ) {
      return NextResponse.json(
        {
          sucesso: false,
          error:
            "A empresa ou instituição é obrigatória.",
        },
        {
          status: 400,
        }
      );
    }

    // ===================================================
    // VALIDAR CONTACTO
    // ===================================================

    const telefoneFinal =
      contacto || telefone
        ? String(contacto || telefone).trim()
        : null;

    if (
      !telefoneFinal ||
      telefoneFinal === ""
    ) {
      return NextResponse.json(
        {
          sucesso: false,
          error: "O contacto é obrigatório.",
        },
        {
          status: 400,
        }
      );
    }

    // ===================================================
    // VALIDAR RESPONSÁVEL
    // ===================================================

    if (
      !responsavel ||
      String(responsavel).trim() === ""
    ) {
      return NextResponse.json(
        {
          sucesso: false,
          error:
            "É obrigatório selecionar o responsável pelo atendimento.",
        },
        {
          status: 400,
        }
      );
    }

    // ===================================================
    // RESPONSÁVEIS PERMITIDOS
    // ===================================================

    const responsaveisPermitidos = [
      "Humberto Heliotrope",
      "Hermenegildo Ildofonso",
      "Helder Marcos",
      "Cesar Gove",
    ];

    const responsavelFinal =
      String(responsavel).trim();

    if (
      !responsaveisPermitidos.includes(
        responsavelFinal
      )
    ) {
      return NextResponse.json(
        {
          sucesso: false,
          error:
            "O responsável selecionado não é válido.",
        },
        {
          status: 400,
        }
      );
    }

    // ===================================================
    // PREPARAR ÁREAS CRÍTICAS
    // ===================================================

    let areasCriticasFinal: string | null = null;

    if (Array.isArray(areasCriticas)) {
      areasCriticasFinal =
        JSON.stringify(areasCriticas);
    } else if (
      areasCriticas !== undefined &&
      areasCriticas !== null &&
      String(areasCriticas).trim() !== ""
    ) {
      areasCriticasFinal =
        String(areasCriticas).trim();
    }

    // ===================================================
    // PREPARAR SERVIÇOS DE INTERESSE
    // ===================================================

    let servicosInteresseFinal:
      | string
      | null = null;

    if (Array.isArray(servicosInteresse)) {
      servicosInteresseFinal =
        JSON.stringify(servicosInteresse);
    } else if (
      servicosInteresse !== undefined &&
      servicosInteresse !== null &&
      String(servicosInteresse).trim() !== ""
    ) {
      servicosInteresseFinal =
        String(servicosInteresse).trim();
    }

    // ===================================================
    // GUARDAR NO POSTGRESQL
    // ===================================================

    const formulario =
      await prisma.formulario.create({
        data: {
          // =================================================
          // IDENTIFICAÇÃO
          // =================================================

          nome: String(nome).trim(),

          email:
            email !== undefined &&
            email !== null &&
            String(email).trim() !== ""
              ? String(email).trim()
              : null,

          empresa:
            String(empresa).trim(),

          cargo:
            cargo !== undefined &&
            cargo !== null &&
            String(cargo).trim() !== ""
              ? String(cargo).trim()
              : null,

          // =================================================
          // RESPONSÁVEL 3HC
          // =================================================

          responsavel:
            responsavelFinal,

          // =================================================
          // CONTACTO
          // =================================================

          telefone:
            telefoneFinal,

          // =================================================
          // PERFIL / NECESSIDADES
          // =================================================

          primeiraImpressao:
            primeiraImpressao !==
              undefined &&
            primeiraImpressao !== null &&
            String(
              primeiraImpressao
            ).trim() !== ""
              ? String(
                  primeiraImpressao
                ).trim()
              : null,

          areasCriticas:
            areasCriticasFinal,

          maiorDesafio:
            maiorDesafio !==
              undefined &&
            maiorDesafio !== null &&
            String(
              maiorDesafio
            ).trim() !== ""
              ? String(
                  maiorDesafio
                ).trim()
              : null,

          servicosInteresse:
            servicosInteresseFinal,

          // =================================================
          // PRÓXIMO PASSO
          // =================================================

          proximoPasso:
            proximoPasso !==
              undefined &&
            proximoPasso !== null &&
            String(
              proximoPasso
            ).trim() !== ""
              ? String(
                  proximoPasso
                ).trim()
              : null,

          // =================================================
          // MENSAGEM
          // =================================================

          mensagem:
            mensagem !==
              undefined &&
            mensagem !== null &&
            String(
              mensagem
            ).trim() !== ""
              ? String(
                  mensagem
                ).trim()
              : null,
        },
      });

    // ===================================================
    // CONFIRMAR SUCESSO
    // ===================================================

    console.log(
      "✅ Formulário guardado com sucesso:",
      formulario.id
    );

    return NextResponse.json(
      {
        sucesso: true,
        mensagem:
          "Formulário registado com sucesso.",
        formulario,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    // ===================================================
    // MOSTRAR ERRO REAL NO TERMINAL
    // ===================================================

    console.error(
      "❌ ERRO REAL AO GUARDAR FORMULÁRIO:"
    );

    console.error(error);

    const mensagemErro =
      error instanceof Error
        ? error.message
        : String(error);

    return NextResponse.json(
      {
        sucesso: false,

        error:
          "Erro ao guardar formulário no banco de dados.",

        details:
          process.env.NODE_ENV ===
          "development"
            ? mensagemErro
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}


// =====================================================
// GET - BUSCAR FORMULÁRIOS
// =====================================================

export async function GET(
  request: NextRequest
) {
  try {

    // ===================================================
    // VERIFICAR SESSÃO PRIVADA
    // ===================================================

    const session =
      request.cookies.get(
        "3hc_private_session"
      )?.value;

    if (!session) {

      return NextResponse.json(
        {
          sucesso: false,
          error:
            "Acesso não autorizado.",
        },
        {
          status: 401,
        }
      );

    }

    // ===================================================
    // BUSCAR FORMULÁRIOS
    // ===================================================

    const formularios =
      await prisma.formulario.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    // ===================================================
    // RETORNAR DADOS
    // ===================================================

    return NextResponse.json(
      formularios,
      {
        status: 200,
      }
    );

  } catch (error) {

    // ===================================================
    // MOSTRAR ERRO REAL NO TERMINAL
    // ===================================================

    console.error(
      "❌ ERRO AO BUSCAR FORMULÁRIOS:"
    );

    console.error(error);

    const mensagemErro =
      error instanceof Error
        ? error.message
        : String(error);

    return NextResponse.json(
      {
        sucesso: false,

        error:
          "Erro ao buscar formulários.",

        details:
          process.env.NODE_ENV ===
          "development"
            ? mensagemErro
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}

