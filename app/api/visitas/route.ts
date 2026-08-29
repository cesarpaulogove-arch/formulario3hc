
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =====================================================
// GET - BUSCAR VISITAS
// =====================================================

export async function GET() {
  try {
    // ===================================================
    // BUSCAR VISITAS NO POSTGRESQL
    // ===================================================

    const visitas = await prisma.visita.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // ===================================================
    // RETORNAR VISITAS
    // ===================================================

    return NextResponse.json(visitas, {
      status: 200,
    });
  } catch (error) {
    // ===================================================
    // MOSTRAR ERRO REAL NO TERMINAL
    // ===================================================

    console.error("❌ ERRO AO BUSCAR VISITAS:");
    console.error(error);

    const mensagemErro =
      error instanceof Error
        ? error.message
        : String(error);

    return NextResponse.json(
      {
        sucesso: false,
        error: "Erro ao buscar visitas.",
        details: mensagemErro,
      },
      {
        status: 500,
      }
    );
  }
}

