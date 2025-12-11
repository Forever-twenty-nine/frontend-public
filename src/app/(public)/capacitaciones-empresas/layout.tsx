import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Capacitaciones para Empresas - Formación a Medida",
 description: "Capacitaciones corporativas diseñadas a medida para empresas del sector industrial. Formación práctica y personalizada para mejorar el desempeño de tus equipos.",
 keywords: ["capacitación empresarial", "formación corporativa", "cursos para empresas", "capacitación industrial", "formación in-company", "desarrollo profesional"],
 openGraph: {
 title: "Capacitaciones para Empresas - Formación a Medida | Cursala",
 description: "Capacitaciones corporativas diseñadas a medida para empresas del sector industrial. Formación práctica y personalizada.",
 url: "https://cursala.com/capacitaciones-empresas",
 type: "website",
 images: [
 {
 url: "/images/companyTraining.png",
 width: 1200,
 height: 630,
 alt: "Capacitaciones Empresariales - Cursala",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "Capacitaciones para Empresas - Formación a Medida | Cursala",
 description: "Capacitaciones corporativas diseñadas a medida para empresas del sector industrial",
 images: ["/images/companyTraining.png"],
 },
 alternates: {
 canonical: "https://cursala.com/capacitaciones-empresas",
 },
};

export default function CapacitacionesEmpresasLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <>{children}</>;
}
