import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Quiénes Somos - Capacitación Profesional con Enfoque Práctico",
 description: "Equipo interdisciplinario dedicado a capacitar con enfoque práctico. Brindamos herramientas concretas para mejorar el desempeño laboral. Trabajamos con empresas del sector industrial.",
 keywords: ["sobre nosotros", "cursala", "capacitación empresarial", "formación profesional", "equipo interdisciplinario", "cursos prácticos"],
 openGraph: {
 title: "Quiénes Somos - Capacitación Profesional | Cursala",
 description: "Equipo interdisciplinario dedicado a capacitar con enfoque práctico. Brindamos herramientas concretas para mejorar el desempeño laboral.",
 url: "https://cursala.com/quienes-somos",
 type: "website",
 images: [
 {
 url: "/images/companyTraining.png",
 width: 1200,
 height: 630,
 alt: "Cursala - Capacitación Empresarial",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "Quiénes Somos - Capacitación Profesional | Cursala",
 description: "Equipo interdisciplinario dedicado a capacitar con enfoque práctico",
 images: ["/images/companyTraining.png"],
 },
 alternates: {
 canonical: "https://cursala.com/quienes-somos",
 },
};

export default function QuienesSomosLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <>{children}</>;
}
