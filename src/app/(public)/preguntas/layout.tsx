import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Preguntas Frecuentes - FAQ",
 description: "Encuentra respuestas a las preguntas más frecuentes sobre nuestros cursos, inscripciones, modalidades de pago, certificaciones y más. Centro de ayuda Cursala.",
 keywords: ["preguntas frecuentes", "FAQ", "ayuda", "soporte", "dudas cursos", "información inscripción", "certificaciones"],
 openGraph: {
 title: "Preguntas Frecuentes - FAQ | Cursala",
 description: "Encuentra respuestas a las preguntas más frecuentes sobre nuestros cursos, inscripciones, modalidades de pago y certificaciones.",
 url: "https://cursala.com/preguntas",
 type: "website",
 images: [
 {
 url: "/logo-cursala.png",
 width: 1200,
 height: 630,
 alt: "Preguntas Frecuentes - Cursala",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "Preguntas Frecuentes - FAQ | Cursala",
 description: "Encuentra respuestas a las preguntas más frecuentes sobre nuestros cursos",
 images: ["/logo-cursala.png"],
 },
 alternates: {
 canonical: "https://cursala.com/preguntas",
 },
};

export default function PreguntasLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <>{children}</>;
}
