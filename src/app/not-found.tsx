import Link from "next/link";

export const metadata = {
  title: "Página no encontrada | Cursala",
  description: "La página que buscas no existe. Regresa al inicio de Cursala.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">Página no encontrada</h2>
        <p className="mt-2 text-gray-600">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}