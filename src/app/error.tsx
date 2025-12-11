"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <title>Error | Cursala</title>
      <meta name="description" content="Ha ocurrido un error en Cursala. Intenta recargar la página." />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">Error</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">Algo salió mal</h2>
          <p className="mt-2 text-gray-600">
            Ha ocurrido un error inesperado. Intenta recargar la página.
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Intentar de nuevo
          </button>
        </div>
      </main>
    </>
  );
}