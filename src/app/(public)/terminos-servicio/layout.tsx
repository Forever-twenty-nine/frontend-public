import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Términos y Condiciones de Servicio",
 description: "Términos y condiciones de uso de la plataforma Cursala. Conoce las reglas, derechos y responsabilidades al utilizar nuestros servicios de formación online.",
 keywords: ["términos y condiciones", "condiciones de uso", "términos de servicio", "legal", "normativas"],
 openGraph: {
 title: "Términos y Condiciones de Servicio | Cursala",
 description: "Términos y condiciones de uso de la plataforma Cursala.",
 url: "https://cursala.com/terminos-servicio",
 type: "website",
 },
 twitter: {
 card: "summary",
 title: "Términos y Condiciones de Servicio | Cursala",
 description: "Términos y condiciones de uso de la plataforma Cursala",
 },
 alternates: {
 canonical: "https://cursala.com/terminos-servicio",
 },
 robots: {
 index: true,
 follow: true,
 },
};

export default function TerminosServicioLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <>{children}</>;
}
