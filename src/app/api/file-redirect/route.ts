import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * API endpoint que genera URLs seguras para descarga de archivos
 * Soluciona el problema de Mixed Content (HTTPS → HTTP) proporcionando 
 * un endpoint HTTPS que redirige al backend HTTP
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get("file");
  const token = searchParams.get("token");

  if (!fileName) {
    return NextResponse.json(
      { error: "Parámetro 'file' es requerido" },
      { status: 400 }
    );
  }

  try {
    // Construir la URL del backend con el archivo
    const backendUrl = process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8080/api/v1";
    const fileUrl = `${backendUrl}/file/${encodeURIComponent(fileName)}/publicdownload`;
    
    // Si hay token, agregarlo como query parameter
    const finalUrl = token ? `${fileUrl}?token=${encodeURIComponent(token)}` : fileUrl;

    // Redirigir directamente al backend
    // Esto permite que el navegador descargue el archivo directamente
    // sin pasar por el proxy de Next.js
    return NextResponse.redirect(finalUrl, 302);

  } catch (error) {
    console.error("Error en file-redirect:", error);
    return NextResponse.json(
      { 
        error: "Error al generar la URL de descarga",
        details: error instanceof Error ? error.message : "Error desconocido"
      },
      { status: 500 }
    );
  }
}