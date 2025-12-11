import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Política de Privacidad",
 description: "Política de privacidad de Cursala. Conoce cómo protegemos y manejamos tu información personal, datos de usuario y cumplimiento con normativas de protección de datos.",
 keywords: ["política de privacidad", "protección de datos", "GDPR", "privacidad usuario", "datos personales"],
 openGraph: {
 title: "Política de Privacidad | Cursala",
 description: "Política de privacidad de Cursala. Conoce cómo protegemos tu información personal.",
 url: "https://cursala.com/politica-privacidad",
 type: "website",
 },
 twitter: {
 card: "summary",
 title: "Política de Privacidad | Cursala",
 description: "Política de privacidad de Cursala",
 },
 alternates: {
 canonical: "https://cursala.com/politica-privacidad",
 },
 robots: {
 index: true,
 follow: true,
 },
};

export default function PoliticaPrivacidadLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <>{children}</>;
}
