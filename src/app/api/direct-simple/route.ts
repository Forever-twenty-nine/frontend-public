import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "";

  if (!path) {
    return NextResponse.json(
      { error: "El parámetro 'path' es requerido" },
      { status: 400 }
    );
  }

  try {
    // Construir la URL del backend
    // Este route handler corre en el servidor de Next.js
    // Usa la dirección interna de Docker para comunicarse con el backend
    const backendUrl = process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8080/api/v1";
    const targetUrl = `${backendUrl}${path}`;

    // Preparar headers básicos
    const headers: Record<string, string> = {};
    
    // Copiar headers importantes de la petición original
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      headers["authorization"] = authHeader;
    }

    // Manejar autenticación desde query parameter
    const tokenFromQuery = searchParams.get("token");
    if (tokenFromQuery) {
      headers["authorization"] = tokenFromQuery.startsWith("Bearer ") 
        ? tokenFromQuery 
        : `Bearer ${tokenFromQuery}`;
    }

    // Hacer la petición al backend
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: headers,
    });

    // Determinar si es una respuesta binaria
    const isBinaryResponse = path.includes('/image') || 
                           path.includes('/video') || 
                           path.includes('/download') || 
                           path.includes('/publicdownload') || 
                           path.includes('.pdf');

    // Preparar headers de respuesta
    const responseHeaders: Record<string, string> = {};
    
    // Copiar headers importantes
    const importantHeaders = [
      "content-type",
      "content-length", 
      "cache-control", 
      "content-disposition"
    ];

    importantHeaders.forEach(headerName => {
      const value = response.headers.get(headerName);
      if (value) {
        responseHeaders[headerName] = value;
      }
    });

    if (isBinaryResponse) {
      // Para archivos binarios (PDFs, imágenes, etc.)
      const arrayBuffer = await response.arrayBuffer();
      
      // Asegurar content-type correcto para PDFs
      if (!responseHeaders["content-type"] && path.includes('.pdf')) {
        responseHeaders["content-type"] = "application/pdf";
      } else if (!responseHeaders["content-type"]) {
        responseHeaders["content-type"] = "application/octet-stream";
      }
      
      return new NextResponse(arrayBuffer, {
        status: response.status,
        headers: responseHeaders,
      });
    } else {
      // Para respuestas de texto/JSON
      const textData = await response.text();
      return new NextResponse(textData, {
        status: response.status,
        headers: responseHeaders,
      });
    }

  } catch (error) {
    console.error("❌ Error en direct-simple:", error);
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error en la petición",
      },
      { status: 500 }
    );
  }
}