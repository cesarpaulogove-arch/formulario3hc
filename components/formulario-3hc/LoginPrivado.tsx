
"use client";

import React, { useState } from "react";
import { X, LockKeyhole, Loader2 } from "lucide-react";

interface LoginPrivadoProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginPrivado({
  onClose,
  onSuccess,
}: LoginPrivadoProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [entrando, setEntrando] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (entrando) return;

    setErro("");
    setEntrando(true);

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "E-mail ou senha inválidos."
        );
      }

      onSuccess();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível entrar."
      );
    } finally {
      setEntrando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-emerald-700 to-teal-700 p-6 text-white flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <LockKeyhole size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Área Privada
              </h2>

              <p className="text-sm text-emerald-100">
                Acesso aos registos 3HC
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <X size={21} />
          </button>

        </div>

        <form
          onSubmit={handleLogin}
          className="p-6 space-y-5"
        >

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              E-mail
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Palavra-passe
            </label>

            <input
              type="password"
              required
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {erro && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={entrando}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold transition flex items-center justify-center gap-2"
          >
            {entrando && (
              <Loader2
                size={18}
                className="animate-spin"
              />
            )}

            {entrando
              ? "A verificar..."
              : "Entrar"}
          </button>

        </form>

      </div>
    </div>
  );
}

