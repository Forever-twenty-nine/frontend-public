"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ICourseRequestForm {
 name: string;
 email: string;
 phoneNumber: string;
 countryCode: string;
 message: string;
}

export const CourseRequestForm: React.FC = () => {
 const {
 register,
 handleSubmit,
 formState: { errors },
 reset,
 } = useForm<ICourseRequestForm>();
 const [formLoading, setFormLoading] = React.useState(false);

 const onSubmit: SubmitHandler<ICourseRequestForm> = async (data) => {
 setFormLoading(true);
 // Aquí deberías enviar los datos a tu backend o servicio
 setTimeout(() => {
 setFormLoading(false);
 reset();
 alert("¡Solicitud enviada!");
 }, 1000);
 };

 return (
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
 {...register("name", { required: "Este campo es obligatorio" })}
 placeholder="Tu nombre completo"
 className="w-full rounded-lg border border-brand-tertiary bg-white px-4 py-2.5 text-brand-tertiary transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
 disabled={formLoading}
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
 placeholder="tu@email.com"
 className="w-full rounded-lg border border-brand-tertiary bg-white px-4 py-2.5 text-brand-tertiary transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
 disabled={formLoading}
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
 {...register("countryCode", {
 required: "Requerido",
 pattern: {
 value: /^[0-9]{1,4}$/,
 message: "Código inválido",
 },
 })}
 className="w-20 rounded-lg border border-brand-tertiary bg-white px-4 py-2.5 text-center text-brand-tertiary transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
 disabled={formLoading}
 />
 <input
 type="tel"
 id="phoneNumber"
 placeholder="11 2345 6789"
 {...register("phoneNumber", {
 required: "El teléfono es obligatorio",
 minLength: {
 value: 10,
 message: "Debe tener al menos 10 dígitos",
 },
 })}
 className="w-full rounded-lg border border-brand-tertiary bg-white px-4 py-2.5 text-brand-tertiary transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
 disabled={formLoading}
 />
 </div>
 {errors.countryCode && (
 <p className="mt-1 text-sm text-red-600 ">{errors.countryCode.message}</p>
 )}
 {errors.phoneNumber && (
 <p className="mt-1 text-sm text-red-600 ">{errors.phoneNumber.message}</p>
 )}
 </div>
 {/* Mensaje */}
 <div>
 <label htmlFor="message" className="mb-1 block text-sm font-medium text-brand-tertiary ">
 Mensaje
 </label>
 <textarea
 id="message"
 {...register("message", { required: "Este campo es obligatorio" })}
 placeholder="Contanos sobre qué tema te gustaría recibir capacitación. ¡Podemos armarlo para vos!"
 className="w-full rounded-lg border border-brand-tertiary bg-white px-4 py-2.5 text-brand-tertiary transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary"
 rows={4}
 disabled={formLoading}
 />
 {errors.message && (
 <p className="mt-1 text-sm text-red-600 ">{errors.message.message}</p>
 )}
 </div>
 <button
 type="submit"
 className="w-full cursor-pointer rounded-full bg-brand-secondary text-brand-tertiary px-6 py-3 font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:ring-[3px] hover:ring-[#dcab07] duration-300 hover:bg-brand-secondary active:bg-brand-tertiary active:text-white"
 disabled={formLoading}
 >
 {formLoading ? "Enviando..." : "Enviar solicitud"}
 </button>
 </form>
 </div>
 );
};
