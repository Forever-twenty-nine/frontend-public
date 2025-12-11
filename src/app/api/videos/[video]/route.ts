import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ video: string }> },
) {
  // 🔒 Verificar autenticación
  const token = req.headers.get("authorization");
  
  if (!token || !token.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "No autorizado - Token requerido" }, 
      { status: 401 }
    );
  }

  // Verificar que el token sea válido (podrías agregar más validaciones)
  // Por ahora, al menos verificamos que exista un token
  
  const { video } = await params;

  // Ruta absoluta al archivo de video
  const videoPath = path.join(process.cwd(), "videos", video);

  // Verifica que el archivo exista
  if (!fs.existsSync(videoPath)) {
    return NextResponse.json({ error: "Video no encontrado" }, { status: 404 });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.get("range");

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    const file = fs.createReadStream(videoPath, { start, end });
    return new NextResponse(file as any, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize.toString(),
        "Content-Type": "video/mp4",
        "Cache-Control": "no-store",
      },
    });
  } else {
    const file = fs.createReadStream(videoPath);
    return new NextResponse(file as any, {
      status: 200,
      headers: {
        "Content-Length": fileSize.toString(),
        "Content-Type": "video/mp4",
        "Cache-Control": "no-store",
      },
    });
  }
}
