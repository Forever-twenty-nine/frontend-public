import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Cursos Online - Capacitaciones Profesionales",
 description: "Explora nuestra amplia variedad de cursos online especializados. Formación profesional con certificación y modalidades flexibles.",
 keywords: ["cursos online", "capacitación profesional", "formación online", "certificaciones", "e-learning", "cursos especializados"],
 openGraph: {
 title: "Cursos Online - Capacitaciones Profesionales | Cursala",
 description: "Explora nuestra amplia variedad de cursos online especializados. Formación profesional con certificación y modalidades flexibles.",
 url: "https://cursala.com/cursos",
 type: "website",
 images: [
 {
 url: "/logo-cursala.png",
 width: 1200,
 height: 630,
 alt: "Cursos Online - Cursala",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "Cursos Online - Capacitaciones Profesionales | Cursala",
 description: "Explora nuestra amplia variedad de cursos online especializados",
 images: ["/logo-cursala.png"],
 },
 alternates: {
 canonical: "https://cursala.com/cursos",
 },
};

export default function CursosLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <>{children}</>;
}
