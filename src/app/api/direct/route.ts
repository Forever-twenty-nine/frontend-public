import { NextResponse } from "next/server";
import { conf } from "@/config/env";
import type { NextRequest } from "next/server";

function extractHeaders(requestHeaders: Headers) {
  const headersObj: Record<string, string> = {};
  requestHeaders.forEach((value, key) => {
    headersObj[key] = value;
  });
  return headersObj;
}

async function extractBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    return await request.formData();
  }
  return await request.json();
}

async function forwardRequest(
  method: "get" | "post" | "put" | "patch" | "delete",
  request: NextRequest,
) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "";

  try {
    const headers = extractHeaders(request.headers);
    let body: any;

    // Manejar autenticación desde query parameter (para videos)
    const tokenFromQuery = searchParams.get("token");
    if (tokenFromQuery) {
      // Agregar el token como header Authorization
      headers["authorization"] = tokenFromQuery.startsWith("Bearer ")
        ? tokenFromQuery
        : `Bearer ${tokenFromQuery}`;
    }

    if (["post", "put", "patch"].includes(method)) {
      body = await extractBody(request);
      if (body instanceof FormData) {
        delete headers["content-type"];
      }
    }

    // Detect if this is a binary response (images, videos, files, PDFs)
    const isBinaryResponse =
      path.includes("/image") ||
      path.includes("/video") ||
      path.includes("/download") ||
      path.includes("/publicdownload") ||
      path.includes(".pdf");

    // Construir la URL del backend
    // Este es un route handler de Next.js que corre en el servidor
    const baseUrl = process.env.NEXT_PUBLIC_URL_BACK || 'http://localhost:8080/api/v1';
    const targetUrl = `${baseUrl}/direct?path=${encodeURIComponent(path)}`;

    // Limpiar headers problemáticos
    delete headers["host"];
    delete headers["connection"];
    delete headers["content-length"];

    // Hacer la petición usando fetch nativo
    const response = await fetch(targetUrl, {
      method: method.toUpperCase(),
      headers,
      body: ["POST", "PUT", "PATCH"].includes(method.toUpperCase())
        ? body
        : undefined,
    });

    // Preparar headers para la respuesta
    const responseHeaders: Record<string, string> = {};

    // Headers importantes para el frontend (especialmente para archivos binarios)
    const importantHeaders = [
      "content-type",
      "content-range",
      "accept-ranges",
      "content-length",
      "cache-control",
      "etag",
      "last-modified",
      "content-disposition",
    ];

    importantHeaders.forEach((headerName) => {
      const value = response.headers.get(headerName);
      if (value) {
        responseHeaders[headerName] = value;
      }
    });

    // Si no hay content-type, usar por defecto según el tipo de respuesta
    if (!responseHeaders["content-type"]) {
      responseHeaders["content-type"] = isBinaryResponse
        ? "application/octet-stream"
        : "application/json";
    }

    // Manejar respuestas 304 (Not Modified) correctamente
    if (response.status === 304) {
      return new NextResponse(null, {
        status: 304,
        headers: responseHeaders,
      });
    }

    // Para respuestas de error (4xx), manejar correctamente
    if (response.status >= 400) {
      try {
        const contentType = response.headers.get("content-type") || "";
        let responseData;

        if (contentType.includes("application/json")) {
          // Para respuestas JSON
          responseData = await response.text();
        } else {
          // Para respuestas no-JSON
          const textResponse = await response.text();
          responseData = JSON.stringify({ message: textResponse });
        }

        return new NextResponse(responseData, {
          status: response.status,
          headers: { "content-type": "application/json" },
        });
      } catch (e) {
        console.error("Error processing error response:", e);
        return new NextResponse(
          JSON.stringify({
            message: "Error processing response",
            original: "Error reading response",
          }),
          {
            status: response.status,
            headers: { "content-type": "application/json" },
          },
        );
      }
    }

    // Manejar respuestas exitosas
    let responseData;
    const contentType = response.headers.get("content-type") || "";

    if (isBinaryResponse) {
      // Para respuestas binarias (PDFs, imágenes, archivos, videos)
      // Usar stream en lugar de arrayBuffer para mejor manejo de archivos grandes
      return new NextResponse(response.body, {
        status: response.status,
        headers: responseHeaders,
      });
    } else {
      // Para respuestas de texto/JSON
      const textData = await response.text();
      responseData = textData;

      if (contentType.includes("application/json")) {
        responseHeaders["content-type"] = "application/json";
      }
    }

    return new NextResponse(responseData, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(`❌ Error en la petición ${method.toUpperCase()}:`, error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : `Error en la petición ${method.toUpperCase()}`,
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  return forwardRequest("get", request);
}

export async function POST(request: NextRequest) {
  return forwardRequest("post", request);
}

export async function PUT(request: NextRequest) {
  return forwardRequest("put", request);
}

export async function DELETE(request: NextRequest) {
  return forwardRequest("delete", request);
}

export async function PATCH(request: NextRequest) {
  return forwardRequest("patch", request);
}
