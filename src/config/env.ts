export const conf = {
  // Usar URL_BACK_SSR para llamadas del servidor (Docker), URL_BACK para cliente
  urlBack: process.env.NEXT_PUBLIC_URL_BACK_SSR || process.env.NEXT_PUBLIC_URL_BACK,
};
