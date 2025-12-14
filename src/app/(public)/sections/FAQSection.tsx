"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getFaqItems, IFaqItem } from "@/services/faq.service";

interface FAQSectionProps {
 className?: string;
 maxItems?: number;
}

const FAQSection: React.FC<FAQSectionProps> = ({ 
 className = "", 
 maxItems = 6 
}) => {
 const [allFaqItems, setAllFaqItems] = useState<IFaqItem[]>([]);
 const [visibleItems, setVisibleItems] = useState<IFaqItem[]>([]);
 const [openId, setOpenId] = useState<string | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
 const loadFaqItems = async () => {
 try {
 setLoading(true);
 const response = await getFaqItems();
 
 if (response.success) {
 setAllFaqItems(response.data);
 setVisibleItems(response.data.slice(0, maxItems));
 } else {
 setError("Error al cargar las preguntas frecuentes");
 }
 } catch (err) {
 setError("Error al cargar las preguntas frecuentes");
 console.error("Error loading FAQ:", err);
 } finally {
 setLoading(false);
 }
 };

 loadFaqItems();
 }, [maxItems]);

 const toggleItem = (itemId: string) => {
 setOpenId(openId === itemId ? null : itemId);
 };

 if (loading) {
 return (
 <section className={`w-full bg-white py-12 md:py-16 ${className}`}>
 <div className="max-w-7xl mx-auto px-4">
 <div className="flex items-center justify-center gap-3">
 <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
 <span className="text-brand-tertiary">
 Cargando preguntas frecuentes...
 </span>
 </div>
 </div>
 </section>
 );
 }

 if (error) {
 return (
 <section className={`w-full bg-white py-12 md:py-16 ${className}`}>
 <div className="container mx-auto px-4">
 <div className="rounded-lg bg-red-50 p-6 text-center">
 <p className="text-red-600">{error}</p>
 </div>
 </div>
 </section>
 );
 }

 const hasMoreItems = allFaqItems.length > maxItems;

 return (
 <section className={`w-full bg-white py-12 md:py-16 ${className}`}>
 <div className="container mx-auto max-w-4xl px-4">
 {/* Header */}
 <div className="mb-8 text-center md:mb-12">
 <h2 className="mb-3 text-3xl font-bold text-brand-tertiary md:text-4xl">
 Preguntas Frecuentes
 </h2>
 <p className="mx-auto max-w-2xl text-base text-brand-tertiary md:text-lg">
 Encuentra respuestas a las preguntas más comunes sobre nuestros cursos
 </p>
 </div>

 {/* FAQ Items */}
 <div className="space-y-3">
 {visibleItems.map((item) => {
 const isOpen = openId === item.id;
 
 return (
 <div
 key={item.id}
 className="overflow-hidden rounded-lg border-2 border-brand-tertiary bg-white transition-shadow"
 >
 {/* Question */}
 <button
	 onClick={() => toggleItem(item.id)}
	 className="flex w-full cursor-pointer items-start justify-between gap-4 px-4 py-4 text-left bg-brand-tertiary-lighten/20 transition-colors md:px-6 group"
	 aria-expanded={isOpen}
	 aria-controls={`faq-answer-${item.id}`}
	 aria-label={isOpen ? `Cerrar respuesta: ${item.question}` : `Abrir respuesta: ${item.question}`}
 >
 <h3 className="flex-1 font-semibold text-lg text-brand-tertiary group-hover:text-brand-primary m-0">
 {item.question}
 </h3>
 
 {/* Icon */}
 <svg
 className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${
 isOpen ? "rotate-180" : ""
 }`}
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M19 9l-7 7-7-7"
 />
 </svg>
 </button>

 {/* Answer */}
 {isOpen && (
 <div
 id={`faq-answer-${item.id}`}
 className="border-t-2 border-brand-tertiary/20 px-4 pb-4 pt-2 md:px-6"
 >
 <p className="leading-relaxed text-brand-tertiary">
 {item.answer}
 </p>
 </div>
 )}
 </div>
 );
 })}
 </div>

 {/* Show All Questions Button */}
 {hasMoreItems && (
 <div className="mt-8 text-center md:mt-10">
 <Link
 href="/preguntas"
 className="inline-flex items-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3 font-semibold text-white shadow-2xl border-2 border-brand-primary transition-all duration-500 hover:bg-black hover:text-white hover:ring-[3px] hover:ring-brand-primary group active:bg-brand-tertiary active:text-white focus:outline-none focus:ring-4 focus:ring-brand-primary "
 >
 <span className="text-white font-bold">Ver todas las preguntas</span>
 <svg
 className="h-5 w-5 transition-transform group-hover:translate-x-1"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M13 7l5 5m0 0l-5 5m5-5H6"
 />
 </svg>
 </Link>
 </div>
 )}
 </div>
 </section>
 );
};

export default FAQSection;
