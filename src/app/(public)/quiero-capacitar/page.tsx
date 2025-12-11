"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Navbar from "@/app/(public)/shared/Navbar";
import Footer from "@/app/(public)/shared/Footer";
import HeroSection from "@/app/(public)/sections/HeroSection";
import { IIWANTOTRAIN } from "@/types";
import { createIWantToTrain } from "@/services/formPublicServices";
import { triggerNotification } from "@/utils/swal";

const IWantToTrainPage: React.FC = () => {
 const [loading, setLoading] = useState(false);

 const {
 register,
 handleSubmit,
 formState: { errors },
 reset,
 } = useForm<IIWANTOTRAIN>();

 const onSubmit: SubmitHandler<IIWANTOTRAIN> = async (data) => {
 setLoading(true);
 
 // Preparar datos con valores por defecto para campos opcionales
 const formData = {
 ...data,
 phonePrefix: "54", // Argentina por defecto
 phoneNumber: data.phoneNumber || "",
 };

 try {
 await createIWantToTrain(formData);
 triggerNotification(
 "¡Propuesta enviada exitosamente! Nos pondremos en contacto pronto.",
 "success",
 undefined,
 );
 reset();
 } catch (error) {
 const errorMessage =
 (error as any)?.response?.data?.message ||
 "Error al enviar la propuesta. Por favor, intenta nuevamente.";
 triggerNotification(errorMessage, "error", undefined);
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="flex min-h-screen flex-col">
 <Navbar />

 <HeroSection
 title="Quiero Capacitar"
 subtitle="Unite a nuestro equipo de profesionales"
 description="Forma parte de una comunidad educativa que potencia el aprendizaje."
 buttonText="Postúlate ahora"
 buttonHref="#postulate"
 backgroundImage="/images/sections/hero/quiero-capacitar.jpg"
 />

 <main className="grow bg-gray-50 ">
 <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
 
 {/* Content Section */}
 <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
 <div className="relative h-64 overflow-hidden rounded-lg shadow-xl md:h-80 lg:h-full min-h-[350px]">
 <Image
 src="/images/frontend/cursala-quiero-capacitar.jpg"
 alt="Únete como instructor"
 fill
 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
 className="object-cover"
 />
 </div>
 <div className="flex flex-col justify-center">
 <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
 Súmate a Nuestro Equipo
 </h2>
 <p className="mb-4 text-base leading-relaxed text-gray-700 md:text-lg text-justify">
 Si tienes vocación por enseñar y quieres formar parte de una comunidad que valora 
 la educación de calidad, este es el lugar ideal para ti.
 </p>
 <p className="text-base leading-relaxed text-gray-700 md:text-lg text-justify">
 Completa el formulario y nuestro equipo analizará tu propuesta. Te contactaremos 
 para coordinar una reunión y contarte cómo funciona Cursala.
 </p>
 </div>
 </div>
 </div>

 <section id="postulate" className="bg-linear-to-b from-brand-primary/10 to-brand-primary/40 py-12 md:py-16">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
 <div className="mx-auto max-w-3xl pt-10">
 <div className="mb-8 text-center">
 <h3 className="mb-3 text-4xl font-bold text-brand-primary ">
 Envía tu Propuesta
 </h3>
 </div> 
 {/* Form */}
 <div className="rounded-lg bg-white p-6 shadow-2xl shadow-brand-primary-dark/40 md:p-8">
 <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
 {/* Nombre */}
 <div>
 <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700 ">
 Nombre Completo *
 </label>
 <input
 type="text"
 id="name"
 {...register("name", {
 required: "Este campo es obligatorio",
 })}
 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary :border-blue-400"
 disabled={loading}
 />
 {errors.name && (
 <p className="mt-1 text-sm text-red-600 ">{errors.name.message}</p>
 )}
 </div>

 {/* Email */}
 <div>
 <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700 ">
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
 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary :border-blue-400"
 disabled={loading}
 />
 {errors.email && (
 <p className="mt-1 text-sm text-red-600 ">{errors.email.message}</p>
 )}
 </div>

 {/* Teléfono */}
 <div>
 <label htmlFor="phoneNumber" className="mb-1 block text-sm font-medium text-gray-700 ">
 Teléfono
 </label>
 <input
 type="tel"
 id="phoneNumber"
 {...register("phoneNumber")}
 placeholder="11 2345 6789"
 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary :border-blue-400"
 disabled={loading}
 />
 <p className="mt-1 text-xs text-gray-500 ">Opcional - Formato: código de área + número</p>
 </div>

 {/* Empresa */}
 <div>
 <label htmlFor="company" className="mb-1 block text-sm font-medium text-gray-700 ">
 Empresa / Institución
 </label>
 <input
 type="text"
 id="company"
 {...register("company")}
 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary :border-blue-400"
 disabled={loading}
 />
 <p className="mt-1 text-xs text-gray-500 ">Opcional</p>
 </div>

 {/* Mensaje */}
 <div>
 <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700 ">
 Describe tu propuesta de curso *
 </label>
 <textarea
 id="message"
 {...register("message", {
 required: "Por favor describe tu propuesta",
 minLength: {
 value: 20,
 message: "La descripción debe tener al menos 20 caracteres",
 },
 })}
 rows={5}
 placeholder="Cuéntanos sobre el curso que te gustaría dictar: temática, duración estimada, a quién va dirigido, tu experiencia en el área..."
 className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary :border-blue-400"
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
 className="w-full cursor-pointer rounded-full bg-brand-secondary text-brand-tertiary px-6 py-3 font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:ring-[3px] hover:ring-[#dcab07] duration-300 hover:bg-brand-secondary active:bg-brand-tertiary active:text-white"
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
 "Enviar Propuesta"
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

export default IWantToTrainPage;