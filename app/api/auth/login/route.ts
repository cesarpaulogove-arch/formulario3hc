
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PRIVATE_EMAIL =
  process.env.PRIVATE_EMAIL || "";

const PRIVATE_PASSWORD =
  process.env.PRIVATE_PASSWORD || "";

function safeCompare(
  a: string,
  b: string
) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    aBuffer,
    bBuffer
  );
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const email =
      String(body?.email || "")
        .trim()
        .toLowerCase();

    const senha =
      String(body?.senha || "");

    if (!email || !senha) {
      return NextResponse.json(
        {
          error:
            "Informe o e-mail e a palavra-passe.",
        },
        { status: 400 }
      );
    }

    const emailValido =
      email ===
      PRIVATE_EMAIL.trim().toLowerCase();

    const senhaValida =
      PRIVATE_PASSWORD &&
      safeCompare(
        senha,
        PRIVATE_PASSWORD
      );

    if (!emailValido || !senhaValida) {
      return NextResponse.json(
        {
          error:
            "E-mail ou palavra-passe inválidos.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Acesso autorizado.",
    });

    response.cookies.set(
      "3hc_private_session",
      crypto.randomBytes(32).toString("hex"),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Erro no login privado:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Erro interno de autenticação.",
      },
      { status: 500 }
    );
  }
}

