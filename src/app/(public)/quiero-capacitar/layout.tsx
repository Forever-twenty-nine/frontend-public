import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Quiero Capacitar - Ofrece Cursos en Cursala",
 description: "¿Eres profesional y quieres compartir tu conocimiento? Únete a Cursala como instructor. Crea y ofrece tus propios cursos en nuestra plataforma.",
 keywords: ["ser instructor", "ofrecer cursos", "dar clases online", "instructor online", "crear cursos", "enseñar en cursala"],
 openGraph: {
 title: "Quiero Capacitar - Sé Instructor en Cursala",
 description: "¿Eres profesional y quieres compartir tu conocimiento? Únete a Cursala como instructor y ofrece tus cursos.",
 url: "https://cursala.com/quiero-capacitar",
 type: "website",
 images: [
 {
 url: "/logo-cursala.png",
 width: 1200,
 height: 630,
 alt: "Quiero Capacitar - Cursala",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "Quiero Capacitar - Sé Instructor en Cursala",
 description: "¿Eres profesional y quieres compartir tu conocimiento? Únete a Cursala como instructor",
 images: ["/logo-cursala.png"],
 },
 alternates: {
 canonical: "https://cursala.com/quiero-capacitar",
 },
};

export default function QuieroCapacitarLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <>{children}</>;
}
