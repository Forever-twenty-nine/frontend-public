"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import HeroSection from "@/app/(public)/sections/HeroSection";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "@/app/(public)/shared/Navbar";
import Footer from "@/app/(public)/shared/Footer";
import { IIWANTOTRAIN } from "@/types/iwanttotrain";
import { requestACourse } from "@/services/formPublicServices";
import { triggerNotification } from "@/utils/swal";

const CompanyTrainingPage: React.FC = () => {
 const [loading, setLoading] = useState(false);

 const {
 register,
 handleSubmit,
 formState: { errors },
 reset,
 } = useForm<IIWANTOTRAIN & { countryCode?: string }>();

	const onSubmit: SubmitHandler<IIWANTOTRAIN & { countryCode?: string }> = async (data) => {
		setLoading(true);
        
		const countryCodeRaw = data.countryCode ?? data.phonePrefix ?? "54";
		const normalizedCountry = countryCodeRaw.startsWith('+')
			? countryCodeRaw.slice(1).replace(/\D/g, '')
			: String(countryCodeRaw).replace(/\D/g, '');
		const normalizedPhone = data.phoneNumber ? data.phoneNumber.replace(/\D/g, '') : '';
		const formData = {
			...data,
			phonePrefix: normalizedCountry,
			phoneNumber: normalizedPhone,
		};

 try {
 await requestACourse(formData);
 triggerNotification(
 "¡Solicitud enviada exitosamente! Nos comunicaremos pronto.",
 "success",
 undefined,
 );
 reset();
 } catch (error) {
 const errorMessage =
 (error as any)?.response?.data?.message ||
 "Error al enviar la solicitud. Por favor, intenta nuevamente.";
 triggerNotification(errorMessage, "error", undefined);
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="flex min-h-screen flex-col">
 <Navbar />
 
 {/* Hero Section */}
 <HeroSection
 title="Capacitaciones para Empresas"
 subtitle="Potenciamos el talento de tu equipo con capacitaciones online o presenciales"
 description="Los mejores cursos para tu equipo te esperan aquí."
 buttonText="Comienza ahora"
 buttonHref="#solicita"
 backgroundImage="/images/sections/hero/capacitacion-empresas.jpg"
 />

 <main className="grow bg-white ">
 <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
 
 {/* Content Section */}
 <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
 <div className="relative h-64 overflow-hidden rounded-lg shadow-xl md:h-80 lg:h-full">
 <Image
 src="/images/frontend/cursala-capacitaciones-empresas.jpg"
 alt="Capacitación empresarial"
 fill
 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
 className="object-cover"
 />
 </div>
 <div className="flex flex-col justify-center space-y-4">
 <h2 className="text-2xl font-bold text-brand-tertiary md:text-3xl">
 Capacitaciones para Empresas.
 </h2>
 <p className="text-base leading-relaxed text-brand-tertiary text-justify ">
 Ofrecemos programas diseñados para potenciar tanto las habilidades técnicas 
 como las habilidades blandas de tu equipo. Incorporamos herramientas de coaching 
 y desarrollo personal para que tus empleados alcancen su máximo potencial.
 </p>
 <p className="text-base leading-relaxed text-brand-tertiary text-justify">
 Diseñamos cursos a medida, adaptados a las necesidades específicas de tu organización. 
 Trabajamos en conjunto para identificar las áreas que requieren refuerzo y elaboramos 
 contenidos relevantes y aplicables al entorno laboral real.
 </p>
 
 {/* WhatsApp Button */}
 <div className="pt-4">
 <button
 onClick={() => window.open("https://wa.me/5492612380499", "_blank")}
 className="cursor-pointer flex items-center gap-3 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl"
 >
 <FaWhatsapp className="text-2xl" />
 Consultar por WhatsApp
 </button>
 </div>
 </div>
 </div>

 {/* Features Grid */}
 <div className="mt-10 mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-tertiary transition-all duration-300 group-hover:bg-brand-secondary">
 <svg className="h-6 w-6 text-white group-hover:text-brand-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
 </svg>
 </div>
 <h3 className="mb-2 text-lg font-semibold text-brand-tertiary group-hover:font-bold ">
 Contenido Personalizado
 </h3>
 <p className="text-sm text-brand-tertiary ">
 Programas diseñados específicamente para las necesidades de tu empresa.
 </p>
 </div>

 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-tertiary transition-all duration-300 group-hover:bg-brand-secondary ">
 <svg className="h-6 w-6 text-white group-hover:text-brand-tertiary " fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
 </svg>
 </div>
 <h3 className="mb-2 text-lg font-semibold text-brand-tertiary group-hover:font-bold ">Enfoque Práctico</h3>
 <p className="text-sm text-brand-tertiary ">
 Herramientas y conocimientos aplicables de inmediato en el trabajo
 </p>
 </div>

 <div className="rounded-xl bg-white border-3 border-solid border-brand-tertiary p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-tertiary/30 group">
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-tertiary transition-all duration-300 group-hover:bg-brand-secondary ">
 <svg className="h-6 w-6 text-white group-hover:text-brand-tertiary " fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
 </svg>
 </div>
 <h3 className="mb-2 text-lg font-semibold text-brand-tertiary group-hover:font-bold ">Modalidad Flexible</h3>
 <p className="text-sm text-brand-tertiary ">
 Capacitaciones presenciales o virtuales según tu preferencia
 </p>
 </div>
 </div>
 </div>
 {/* Form Section */}
 <section id="solicita" className="bg-linear-to-b from-brand-primary/10 to-brand-primary/40 py-12 md:py-16">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
 <div className="mx-auto max-w-3xl pt-10">
 
 <div className="mb-8 text-center">
 <h2 className="mb-3 text-4xl font-bold text-brand-primary ">
 Solicitá una Capacitación
 </h2>
 <p className="text-lg text-brand-tertiary ">
 Contanos sobre qué tema te gustaría recibir capacitación. ¡Podemos armarlo para vos!
 </p>
 </div>

 {/* Form */}
 <div className="rounded-lg bg-white p-6 shadow-2xl shadow-brand-primary-dark/40 md:p-8">
 <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
 {/* Nombre */}
 <div>
 <label htmlFor="name" className="mb-1 block text-sm font-medium text-brand-tertiary ">
 Nombre Completo *
 </label>
 <input
 type="text"
 id="name"
 {...register("name", {
 required: "Este campo es obligatorio",
 })}
 className="w-full rounded-lg border border-brand-tertiary bg-white px-4 py-2.5 text-brand-tertiary transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary "
 disabled={loading}
 />
 {errors.name && (
 <p className="mt-1 text-sm text-red-600 ">{errors.name.message}</p>
 )}
 </div>

 {/* Email */}
 <div>
 <label htmlFor="email" className="mb-1 block text-sm font-medium text-brand-tertiary ">
 Correo Electrónico *
 </label>
 <input
 type="email"
 id="email"
 {...register("email", {
 required: "Este campo es obligatorio",
 pattern: {
 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
 message: "Correo electrónico inválido",
 },
 })}
 className="w-full rounded-lg border border-brand-tertiary bg-white px-4 py-2.5 text-brand-tertiary transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary "
 disabled={loading}
 />
 {errors.email && (
 <p className="mt-1 text-sm text-red-600 ">{errors.email.message}</p>
 )}
 </div>

 {/* Teléfono */}
 <div>
 <label htmlFor="phoneNumber" className="mb-1 block text-sm font-medium text-brand-tertiary ">
 Teléfono
 </label>
	<div className="flex gap-2">
		<input
			type="text"
			placeholder="+54"
			inputMode="numeric"
			pattern="\+?[0-9]*"
			{...register("countryCode", {
				required: "Requerido",
				pattern: {
					value: /^\+?[0-9]{1,4}$/, 
					message: "Código inválido",
				},
			})}
			className="w-20 rounded-lg border border-brand-tertiary bg-white px-4 py-2.5 text-center text-brand-tertiary transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
			disabled={loading}
			onInput={(e) => {
				const v = e.currentTarget.value;
				if (v.startsWith('+')) {
					e.currentTarget.value = '+' + v.slice(1).replace(/\D/g, '');
				} else {
					e.currentTarget.value = v.replace(/\D/g, '');
				}
			}}
		/>
		<input
			type="tel"
			id="phoneNumber"
			inputMode="numeric"
			pattern="[0-9]*"
			placeholder="11 2345 6789"
			{...register("phoneNumber", {
				validate: (v) => !v || v.replace(/\D/g, '').length >= 10 || "Debe tener al menos 10 dígitos",
			})}
			className="w-full rounded-lg border border-brand-tertiary bg-white px-4 py-2.5 text-brand-tertiary transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
			disabled={loading}
			onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ''); }}
		/>
	</div>
	<p className="mt-1 text-xs text-brand-tertiary ">Opcional</p>
	{errors.countryCode && (
		<p className="mt-1 text-sm text-red-600 ">{errors.countryCode.message}</p>
	)}
	{errors.phoneNumber && (
		<p className="mt-1 text-sm text-red-600 ">{errors.phoneNumber.message}</p>
	)}
 </div>

 {/* Empresa */}
 <div>
 <label htmlFor="company" className="mb-1 block text-sm font-medium text-brand-tertiary ">
 Empresa *
 </label>
 <input
 type="text"
 id="company"
 {...register("company", {
 required: "Este campo es obligatorio",
 })}
 className="w-full rounded-lg border border-brand-tertiary bg-white px-4 py-2.5 text-brand-tertiary transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
 disabled={loading}
 />
 {errors.company && (
 <p className="mt-1 text-sm text-red-600 ">{errors.company.message}</p>
 )}
 </div>

 {/* Mensaje */}
 <div>
 <label htmlFor="message" className="mb-1 block text-sm font-medium text-brand-tertiary ">
 Describe tu necesidad de capacitación *
 </label>
 <textarea
 id="message"
 {...register("message", {
 required: "Por favor describe tu necesidad",
 minLength: {
 value: 20,
 message: "La descripción debe tener al menos 20 caracteres",
 },
 })}
 rows={5}
 placeholder="Cuéntanos sobre la capacitación que necesitas: temática, cantidad de personas, modalidad preferida, objetivos..."
 className="w-full resize-none rounded-lg border border-brand-tertiary bg-white px-4 py-2.5 text-brand-tertiary transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary "
 disabled={loading}
 />
 {errors.message && (
 <p className="mt-1 text-sm text-red-600 ">{errors.message.message}</p>
 )}
 </div>

 {/* Submit Button */}
 <button
 type="submit"
 disabled={loading}
 className="w-full cursor-pointer rounded-full bg-brand-secondary text-brand-tertiary px-6 py-3 font-semibold shadow-brand-tertiary/10 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:ring-[3px] hover:ring-[#dcab07] hover:bg-brand-secondary active:bg-brand-tertiary active:text-white"
 >
 {loading ? (
 <span className="flex items-center justify-center">
 <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
 </svg>
 Enviando...
 </span>
 ) : (
 "Solicitar Capacitación"
 )}
 </button>
 </form>
 </div>

 </div>


 </div>
 </section>
 </main>

 <Footer />
 </div>
 );
};

export default CompanyTrainingPage;
