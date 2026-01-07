"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createBusinessTraining } from "@/services/formPublicServices";
import { triggerNotification } from "@/utils/swal";

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

		// Preparar datos para el servicio
		const normalizedCountry = data.countryCode?.startsWith('+')
			? data.countryCode
			: `+${data.countryCode.replace(/\D/g, '')}`;
		const normalizedPhone = data.phoneNumber.replace(/\D/g, '');

		const formData = {
			name: data.name.trim(),
			email: data.email.trim(),
			phoneNumber: `${normalizedCountry}${normalizedPhone}`,
			message: data.message.trim(),
		};

		try {
			await createBusinessTraining(formData);
			triggerNotification(
				"¡Solicitud enviada exitosamente! Nos pondremos en contacto pronto.",
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
			setFormLoading(false);
		}
	};

	return (
		<div className="rounded-lg bg-white p-6 shadow-2xl shadow-brand-primary-dark/40 md:p-8">
			<h2 className="mb-6 text-2xl font-bold text-brand-primary text-center">Solicitar un curso personalizado</h2>
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
							disabled={formLoading}
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
								required: "El teléfono es obligatorio",
								validate: (v) => v.replace(/\D/g, '').length >= 10 || "Debe tener al menos 10 dígitos",
							})}
							onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ''); }}
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
