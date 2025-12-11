import { NextResponse } from "next/server";
import axios from "axios";
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
    return await request.formData(); // 🔹 Maneja subida de archivos correctamente
  }

  return await request.json();
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "";

  try {
    const body = await extractBody(request); // 🔹 Detecta si es JSON o FormData
    const headers = extractHeaders(request.headers);

    // 🔹 Si es FormData, dejamos que Axios maneje `Content-Type`
    if (body instanceof FormData) {
      delete headers["content-type"];
    }

    const axiosConfig = { headers };
    const response = await axios.post(
      `${conf.urlBack}${path}`,
      body,
      axiosConfig,
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("❌ Error en la petición POST: ", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error en la petición POST",
      },
      {
        status:
          axios.isAxiosError(error) && error.response
            ? error.response.status
            : 500,
      },
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "";

  try {
    const axiosConfig = {
      headers: {
        ...extractHeaders(request.headers),
      },
    };

    const response = await axios.get(`${conf.urlBack}${path}`, axiosConfig);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("❌ Error en la petición GET: ", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error en la petición GET",
      },
      {
        status:
          axios.isAxiosError(error) && error.response
            ? error.response.status
            : 500,
      },
    );
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "";

  try {
    const body = await extractBody(request); // 🔹 Detecta si es JSON o FormData
    const headers = extractHeaders(request.headers);

    if (body instanceof FormData) {
      delete headers["content-type"];
    }

    const axiosConfig = { headers };
    const response = await axios.put(
      `${conf.urlBack}${path}`,
      body,
      axiosConfig,
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("❌ Error en la petición PUT: ", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error en la petición PUT",
      },
      {
        status:
          axios.isAxiosError(error) && error.response
            ? error.response.status
            : 500,
      },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "";

  try {
    const axiosConfig = {
      headers: {
        ...extractHeaders(request.headers),
      },
    };
    const response = await axios.delete(`${conf.urlBack}${path}`, axiosConfig);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("❌ Error en la petición DELETE: ", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error en la petición DELETE",
      },
      {
        status:
          axios.isAxiosError(error) && error.response
            ? error.response.status
            : 500,
      },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "";

  try {
    const body = await extractBody(request); // Detecta si es JSON o FormData
    const headers = extractHeaders(request.headers);

    // Si el body es FormData, dejamos que Axios maneje automáticamente el Content-Type
    if (body instanceof FormData) {
      delete headers["content-type"];
    }

    const axiosConfig = { headers };
    const response = await axios.patch(
      `${conf.urlBack}${path}`,
      body,
      axiosConfig,
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("❌ Error en la petición PATCH: ", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error en la petición PATCH",
      },
      {
        status:
          axios.isAxiosError(error) && error.response
            ? error.response.status
            : 500,
      },
    );
  }
}
