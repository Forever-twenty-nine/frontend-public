"use client";
import React, { useEffect, useState } from "react";
import { getPublicCompanyData } from "@/services/public.service";
import Navbar from "@/app/(public)/shared/Navbar";
import Footer from "@/app/(public)/shared/Footer";

const PrivacyPolicyPage: React.FC = () => {
 // Contenido temporal mientras se configura el endpoint público
 const TEMPORARY_PRIVACY_POLICY = `POLÍTICA DE PRIVACIDAD

POLÍTICA DE PRIVACIDAD – CURSALA - Última actualización: 12/07/2025

En Cursala, nos comprometemos a proteger la privacidad y los datos personales de nuestros usuarios conforme a lo dispuesto por la Ley Nº 25.326 de Protección de Datos Personales de la República Argentina y, cuando corresponda, normativa internacional aplicable. Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos tu información personal cuando accedes a nuestra plataforma de capacitación online.

1. Información que recopilamos
Durante el uso de nuestra plataforma, podemos recopilar los siguientes datos personales:
- Nombre y apellido.
- Dirección de correo electrónico.
- Número de teléfono.
- Información sobre el uso de la plataforma (cursos adquiridos, progreso, historial de navegación interna).
- Dirección IP, datos de geolocalización aproximada, tipo de dispositivo y navegador utilizado.
- Cookies y tecnologías similares (según se detalla en la sección 3).
- Información sobre el uso de la plataforma (cursos visualizados, progreso, historial de navegación interna).

2. Finalidad del tratamiento de datos
Los datos personales recopilados serán utilizados para:
- Proveer acceso a los cursos y funcionalidades disponibles en la plataforma.
- Gestionar el registro de usuario y autenticar tu identidad.
- Enviar comunicaciones administrativas, técnicas o comerciales relacionadas con la plataforma (los usuarios podrán optar por no recibir comunicaciones promocionales).
- Analizar y mejorar la experiencia de usuario en la plataforma.
- Cumplir con obligaciones legales aplicables.

3. Cookies y tecnologías similares
Utilizamos cookies propias y de terceros para:
- Recordar tus preferencias de usuario.
- Elaborar estadísticas de uso y rendimiento.
- Personalizar contenidos y mostrar anuncios relevantes.

Puedes configurar tu navegador para rechazar cookies o recibir alertas antes de que se almacenen, aunque esto podría afectar el funcionamiento de ciertas funcionalidades de la plataforma. Para más detalles, consulta nuestra Política de Cookies.

4. Compartición de datos con terceros
Tus datos personales podrán ser compartidos únicamente con:
- Proveedores de servicios tecnológicos que actúan en calidad de encargados de tratamiento (servicios de alojamiento web, analítica y marketing).
- Autoridades judiciales o administrativas, cuando sea requerido por ley.

En ningún caso vendemos, alquilamos ni comercializamos datos personales a terceros.

5. Transferencias internacionales de datos
Cuando el tratamiento de datos implique transferencias internacionales (por ejemplo, servicios en la nube con servidores fuera de Argentina), garantizamos que dichas transferencias cumplen con la normativa vigente, exigiendo a los proveedores niveles adecuados de protección de datos.

6. Seguridad de la información
Implementamos medidas técnicas, organizativas y legales para proteger la confidencialidad, integridad y disponibilidad de tus datos personales, tales como cifrado, protocolos seguros (SSL/TLS) y controles de acceso restringido.
No obstante, ningún sistema es completamente infalible. Te recomendamos mantener la confidencialidad de tus credenciales y notificar cualquier acceso no autorizado a administracion@cursala.com.ar.

7. Derechos de los titulares de datos
Conforme a la Ley Nº 25.326, los usuarios tienen derecho a:
- Acceder a sus datos personales.
- Solicitar su rectificación, actualización o supresión.
- Solicitar la portabilidad de sus datos en formatos estructurados y de uso común.
- Oponerse al tratamiento de datos para fines específicos.

Para ejercer estos derechos, puedes enviar una solicitud a administracion@cursala.com.ar, acompañada de una copia de tu documento de identidad.
La Dirección Nacional de Protección de Datos Personales (www.argentina.gob.ar/aaip/datospersonales) es el organismo de control encargado de atender denuncias y reclamos relacionados con el incumplimiento de las normas sobre protección de datos personales.

8. Conservación de los datos
Tus datos personales se conservarán durante el tiempo necesario para cumplir con las finalidades indicadas y, posteriormente, durante los plazos exigidos por normativa fiscal o legal.

9. Modificaciones de la política
Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios serán notificados a través de la plataforma y/o por correo electrónico con antelación razonable.

📌 Nota legal: Al utilizar la plataforma Cursala, manifiestas haber leído, comprendido y aceptado esta Política de Privacidad.`;

 const [privacyPolicy, setPrivacyPolicy] = useState<string>(TEMPORARY_PRIVACY_POLICY);
 const [loading, setLoading] = useState(true);
 const [isFromBackend, setIsFromBackend] = useState(false);

 useEffect(() => {
 const fetchData = async () => {
 try {
 setLoading(true);
 const data = await getPublicCompanyData();
 
 if (data?.privacyPolicy) {
 setPrivacyPolicy(data.privacyPolicy);
 setIsFromBackend(true);
 }
 } catch (error: any) {
 console.error("Error al cargar políticas de privacidad:", error);
 } finally {
 setLoading(false);
 }
 };
 fetchData();
 }, []);

 const formatText = (text: string) => {
 const lines = text.split('\n');
 const elements: React.ReactElement[] = [];
 let listItems: React.ReactElement[] = [];
 
 lines.forEach((line, index) => {
 const trimmedLine = line.trim();
 
 // Salto de línea vacío - ignorar para hacerlo más compacto
 if (trimmedLine === '') {
 return;
 }
 
 // Título principal (todo en mayúsculas)
 if (/^[A-ZÁÉÍÓÚÑ\s]+$/.test(trimmedLine) && trimmedLine.length > 3) {
 // Cerrar lista si hay una abierta
 if (listItems.length > 0) {
 elements.push(<ul key={`list-${index}`} className="mb-4 space-y-1 list-disc list-inside">{listItems}</ul>);
 listItems = [];
 }
 elements.push(
 <h2 key={index} className="mt-6 mb-3 text-xl font-bold text-brand-tertiary first:mt-0">
 {trimmedLine}
 </h2>
 );
 return;
 }
 
 // Subtítulo numerado (1. 2. 3.)
 if (/^[0-9]+\./.test(trimmedLine)) {
 // Cerrar lista si hay una abierta
 if (listItems.length > 0) {
 elements.push(<ul key={`list-${index}`} className="mb-4 space-y-1 list-disc list-inside">{listItems}</ul>);
 listItems = [];
 }
 elements.push(
 <h3 key={index} className="mt-5 mb-2 text-lg font-semibold text-brand-tertiary">
 {trimmedLine}
 </h3>
 );
 return;
 }
 
 // Item de lista (-)
 if (trimmedLine.startsWith('-')) {
 const itemText = trimmedLine.substring(1).trim();
 listItems.push(
 <li key={index} className="text-sm text-brand-tertiary pl-2">
 {itemText}
 </li>
 );
 return;
 }
 
 // Nota legal con emoji
 if (trimmedLine.startsWith('📌')) {
 // Cerrar lista si hay una abierta
 if (listItems.length > 0) {
 elements.push(<ul key={`list-${index}`} className="mb-4 space-y-1 list-disc list-inside">{listItems}</ul>);
 listItems = [];
 }
 elements.push(
 <div key={index} className="mt-5 p-3 rounded-lg bg-brand-secondary/10 border-l-4 border-brand-secondary">
 <p className="text-sm font-medium text-brand-tertiary">
 {trimmedLine}
 </p>
 </div>
 );
 return;
 }
 
 // Cerrar lista si hay una abierta
 if (listItems.length > 0) {
 elements.push(<ul key={`list-${index}`} className="mb-4 space-y-1 list-disc list-inside">{listItems}</ul>);
 listItems = [];
 }
 
 // Párrafo normal
 elements.push(
 <p key={index} className="mb-3 text-sm leading-relaxed text-brand-tertiary ">
 {trimmedLine}
 </p>
 );
 });
 
 // Cerrar lista final si queda abierta
 if (listItems.length > 0) {
 elements.push(<ul key="list-final" className="mb-4 space-y-1 list-disc list-inside">{listItems}</ul>);
 }
 
 return elements;
 };

 return (
 <div className="flex min-h-screen flex-col">
 <Navbar />

 {/* Hero Section */}
 <section className="relative z-10 overflow-hidden bg-linear-to-r from-brand-tertiary-lighten/30 to-brand-tertiary-lighten/30 py-12 text-brand-tertiary">
 <div className="container mx-auto text-center">
 <h1 className="mb-3 text-3xl font-bold lg:text-4xl">
 Política de Privacidad
 </h1>
 <p className="text-base">
 Tu privacidad es importante para nosotros
 </p>
 </div>
 </section>

 {/* Main Content */}
 <main className="grow bg-brand-tertiary-lighten/10 ">
 <div className="mx-auto max-w-5xl py-8 px-5 sm:px-8">
 {loading ? (
 <div className="flex justify-center py-20">
 <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-tertiary-lighten border-t-brand-primary "></div>
 </div>
 ) : (
 <div className="rounded-lg bg-white p-5 sm:p-8 shadow-md">
 {privacyPolicy ? (
 <>
 {!isFromBackend && (
 <div className="mb-6 rounded-lg border-l-4 border-brand-secondary bg-brand-secondary/10 p-4">
 <div className="flex items-start space-x-3">
 <svg
 className="h-6 w-6 shrink-0 text-brand-primary"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
 />
 </svg>
 <div>
 <p className="text-sm font-medium text-brand-tertiary">
 Contenido Temporal
 </p>
 <p className="mt-1 text-xs text-brand-tertiary-light">
 Estas son políticas de privacidad genéricas. El contenido
 específico de la empresa será cargado próximamente.
 </p>
 </div>
 </div>
 </div>
 )}
 <div className="prose prose-sm max-w-none">
 {formatText(privacyPolicy)}
 </div>
 </>
 ) : (
 <div className="py-12 text-center">
 <svg
 className="mx-auto h-16 w-16 text-brand-primary "
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
 />
 </svg>
 <h3 className="mt-4 text-xl font-semibold text-brand-tertiary ">
 No hay políticas disponibles
 </h3>
 <p className="mt-2 text-brand-tertiary ">
 Las políticas de privacidad se mostrarán aquí una vez que estén disponibles.
 </p>
 </div>
 )}

 {/* Info adicional */}
 {privacyPolicy && (
 <div className="mt-8 border-t border-brand-secondary pt-8">
 <div className="rounded-lg bg-brand-tertiary/20 p-6">
 <div className="flex items-start space-x-3">
 <svg
 className="h-6 w-6 shrink-0 text-brand-primary"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
 />
 </svg>
 <div>
 <h3 className="text-lg font-semibold text-brand-tertiary">
 ¿Tienes preguntas?
 </h3>
 <p className="mt-1 text-sm text-brand-tertiary">
 Si tienes alguna pregunta sobre nuestras políticas de
 privacidad o el manejo de tu información personal, no
 dudes en contactarnos.
 </p>
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 )}
 </div>
 </main>

 <Footer />
 </div>
 );
};

export default PrivacyPolicyPage;