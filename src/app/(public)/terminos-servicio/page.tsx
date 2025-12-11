"use client";
import React, { useEffect, useState } from "react";
import { getPublicCompanyData } from "@/services/public.service";
import Navbar from "@/app/(public)/shared/Navbar";
import Footer from "@/app/(public)/shared/Footer";

// Contenido temporal de términos y condiciones
const TEMPORARY_TERMS_OF_SERVICE = `TÉRMINOS Y CONDICIONES

TÉRMINOS Y CONDICIONES DE USO – CURSALA - Última actualización: 12/07/2025

Bienvenido/a a Cursala, una plataforma de capacitación online. Al acceder o utilizar nuestro sitio web (www.cursala.com.ar) y sus servicios, aceptas estos Términos y Condiciones de uso. Si no estás de acuerdo con alguno de ellos, por favor no utilices la plataforma.

1. Aceptación de los Términos
El uso de la plataforma implica la aceptación expresa e informada de estos Términos y de nuestra Política de Privacidad. Es responsabilidad del usuario revisarlos periódicamente.

2. Registro de usuarios
Para acceder a ciertos servicios deberás crear una cuenta proporcionando información veraz, completa y actualizada.
Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de cualquier actividad realizada bajo tu cuenta.
Nos reservamos el derecho de suspender o cancelar cuentas en caso de uso indebido.

3. Uso permitido
La plataforma debe utilizarse únicamente con fines educativos y lícitos. Está estrictamente prohibido:
- Compartir, reproducir o distribuir contenido protegido sin autorización.
- Infringir derechos de autor o marcas registradas.
- Publicar contenido ofensivo, difamatorio, discriminatorio o ilegal.
- Realizar ingeniería inversa o intentar vulnerar la seguridad de la plataforma.

4. Propiedad intelectual
Todos los contenidos de Cursala (cursos, textos, videos, imágenes, materiales, software) son propiedad de Cursala o de sus respectivos autores y están protegidos por las leyes de propiedad intelectual.
No se permite su copia, reproducción o distribución sin autorización previa y por escrito.
El usuario solo adquiere un derecho de uso personal, no exclusivo e intransferible de los contenidos adquiridos.

5. Subida de contenido por usuarios
Al subir contenido (comentarios, tareas, archivos), declaras que cuentas con los derechos necesarios para hacerlo y otorgas a Cursala una licencia no exclusiva, gratuita y global para utilizar dicho contenido dentro de la plataforma.

6. Disponibilidad del servicio
Cursala se esfuerza por mantener la plataforma disponible y funcional en todo momento. Sin embargo, pueden ocurrir interrupciones temporales por mantenimiento, actualizaciones o factores externos.
No garantizamos la disponibilidad ininterrumpida del servicio.

7. Modificaciones de los términos
Cursala se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados a través de la plataforma y entrarán en vigor inmediatamente.
- Nombre del curso adquirido.
- Motivo detallado de la solicitud.

Nos reservamos el derecho de aprobar o rechazar el reembolso tras evaluar el caso. Los reembolsos aprobados se procesarán por el mismo medio de pago utilizado.
❌ No se aceptarán reembolsos por: cambios de opinión, falta de tiempo, incompatibilidad técnica de dispositivos, o uso indebido de la plataforma.

8. Limitación de responsabilidad
Cursala no garantiza resultados académicos o profesionales derivados del uso de sus cursos.
No somos responsables por interrupciones del servicio, errores en contenidos o pérdidas indirectas.
El usuario es responsable de la adecuada configuración y compatibilidad de sus dispositivos.

9. Modificaciones
Nos reservamos el derecho de actualizar estos Términos y la Política de Privacidad en cualquier momento. Los cambios relevantes se notificarán a través de la plataforma y/o correo electrónico.

10. Jurisdicción y ley aplicable
Estos Términos se rigen por las leyes de la República Argentina. Cualquier conflicto será resuelto por los tribunales ordinarios de la Ciudad de Mendoza, con renuncia expresa a cualquier otro fuero o jurisdicción.

11. Contacto
Para consultas, sugerencias o reclamos, puedes escribirnos a:
📧 admin@cursala.com.ar`;

const TermAndConditionsPage = () => {
 const [termsContent, setTermsContent] = useState(TEMPORARY_TERMS_OF_SERVICE);
 const [isFromBackend, setIsFromBackend] = useState(false);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const fetchData = async () => {
 try {
 const data = await getPublicCompanyData();
 if (data?.termsOfService) {
 setTermsContent(data.termsOfService);
 setIsFromBackend(true);
 }
 } catch (error: any) {
 console.error("Error al cargar términos de servicio:", error);
 } finally {
 setLoading(false);
 }
 };
 fetchData();
 }, []);

 // Función para formatear el texto con saltos de línea
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
 <h2 key={index} className="mt-6 mb-3 text-xl font-bold text-gray-900 first:mt-0">
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
 
 // Sub-numeración (3.1, 3.2, etc.)
 if (/^[0-9]+\.[0-9]+/.test(trimmedLine)) {
 // Cerrar lista si hay una abierta
 if (listItems.length > 0) {
 elements.push(<ul key={`list-${index}`} className="mb-4 space-y-1 list-disc list-inside">{listItems}</ul>);
 listItems = [];
 }
 elements.push(
 <p key={index} className="mb-2 pl-4 text-sm font-medium text-gray-800">
 {trimmedLine}
 </p>
 );
 return;
 }
 
 // Item de lista (-)
 if (trimmedLine.startsWith('-')) {
 const itemText = trimmedLine.substring(1).trim();
 listItems.push(
 <li key={index} className="text-sm text-gray-700 pl-2">
 {itemText}
 </li>
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
 <p key={index} className="mb-3 text-sm leading-relaxed text-gray-700">
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
 <div className="flex min-h-screen flex-col bg-white">
 <Navbar />

 {/* Hero Section - igual que privacidad */}
 <section className="relative z-10 overflow-hidden bg-linear-to-r from-brand-tertiary-lighten/30 to-brand-tertiary-lighten/30 py-12 text-brand-tertiary">
 <div className="absolute inset-0 bg-black/10"></div>
 <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
 <div className="flex items-center justify-center space-x-3">
 <h1 className="text-3xl font-bold md:text-4xl">
 Términos y Condiciones
 </h1>
 </div>
 <p className="mt-3 text-base text-brand-tertiary">
 Conoce las reglas y condiciones de uso de nuestra plataforma
 </p>
 </div>
 </section>

 {/* Main Content - igual que privacidad */}
 <main className="grow bg-brand-tertiary-lighten/10">
 <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
 {loading ? (
 <div className="flex justify-center py-20">
 <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-brand-primary "></div>
 </div>
 ) : (
 <div className="mx-auto max-w-5xl rounded-lg bg-white p-5 border border-solid border-brand-tertiary-lighten/40">
 {termsContent ? (
 <>
 {!isFromBackend && (
 <div className="mb-5 rounded-lg border-l-4 border-brand-primary bg-brand-primary/10 p-3">
 <div className="flex items-start space-x-2">
 <svg
 className="h-5 w-5 shrink-0 text-brand-primary mt-0.5"
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
 <p className="mt-0.5 text-xs text-brand-tertiary-light">
 Términos genéricos. El contenido específico será cargado próximamente.
 </p>
 </div>
 </div>
 </div>
 )}
 <div className="prose prose-sm max-w-none">
 {formatText(termsContent)}
 </div>
 </>
 ) : (
 <div className="py-12 text-center">
 <svg
 className="mx-auto h-16 w-16 text-gray-400"
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
 <h3 className="mt-4 text-xl font-semibold text-gray-900">
 No hay términos disponibles
 </h3>
 <p className="mt-2 text-gray-600">
 Los términos y condiciones se mostrarán aquí una vez que estén disponibles.
 </p>
 </div>
 )}

 {/* Info adicional */}
 {termsContent && (
 
 <div className="mt-8 border-t border-gray-200 pt-8">
 <div className="rounded-lg bg-brand-tertiary/10 p-6">
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
 <div className="flex-1">
 <h3 className="text-lg font-semibold text-brand-tertiary">
 ¿Tienes preguntas?
 </h3>
 <p className="mt-1 text-sm text-brand-tertiary-light">
 Si tienes alguna pregunta sobre estos términos, contáctanos a través de nuestros canales de soporte.
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

export default TermAndConditionsPage;
