"use client";

import React, { useState, useEffect, useRef } from "react";
import { getFaqItems, IFaqItem } from "@/services/faq.service";
import Navbar from "@/app/(public)/shared/Navbar";
import Footer from "@/app/(public)/shared/Footer";
import HeroSection from "@/app/(public)/sections/HeroSection";

const AllFAQsPage: React.FC = () => {
    const [allFaqItems, setAllFaqItems] = useState<IFaqItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<IFaqItem[]>([]);
    const [displayedItems, setDisplayedItems] = useState<IFaqItem[]>([]);
    const [openId, setOpenId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const idleCallbackId = useRef<number | null>(null);
    const timeoutId = useRef<number | null>(null);
    const CHUNK_SIZE = 5; // items to append per idle/window tick

    useEffect(() => {
        const loadFaqItems = async () => {
            try {
                setLoading(true);
                const response = await getFaqItems();

                if (response.success) {
                    setAllFaqItems(response.data);
                    setFilteredItems(response.data);
                    // initialize displayedItems with a small subset for progressive render
                    setDisplayedItems(response.data.slice(0, CHUNK_SIZE));
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
    }, []);

    // Filtrar preguntas en el frontend
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredItems(allFaqItems);
            setDisplayedItems(allFaqItems.slice(0, CHUNK_SIZE));
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = allFaqItems.filter(
                (item) =>
                    item.question.toLowerCase().includes(query) ||
                    item.answer.toLowerCase().includes(query)
            );
            setFilteredItems(filtered);
            setOpenId(null); // Cerrar todas las respuestas al filtrar
            setDisplayedItems(filtered.slice(0, CHUNK_SIZE));
        }
    }, [searchQuery, allFaqItems]);

    // Progressive rendering of filteredItems into displayedItems
    useEffect(() => {
        const clearScheduled = () => {
            if (idleCallbackId.current && (window as any).cancelIdleCallback) {
                try { (window as any).cancelIdleCallback(idleCallbackId.current); } catch { }
            }
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            idleCallbackId.current = null;
            timeoutId.current = null;
        };

        // scheduleNext appends a chunk and reschedules itself if needed
        const scheduleNext = () => {
            if ((window as any).requestIdleCallback) {
                idleCallbackId.current = (window as any).requestIdleCallback(() => {
                    setDisplayedItems((prev) => {
                        const nextIndex = prev.length;
                        if (nextIndex >= filteredItems.length) return prev;
                        const nextChunk = filteredItems.slice(nextIndex, nextIndex + CHUNK_SIZE);
                        const newArr = [...prev, ...nextChunk];
                        if (newArr.length < filteredItems.length) {
                            scheduleNext();
                        }
                        return newArr;
                    });
                });
            } else {
                timeoutId.current = window.setTimeout(() => {
                    setDisplayedItems((prev) => {
                        const nextIndex = prev.length;
                        if (nextIndex >= filteredItems.length) return prev;
                        const nextChunk = filteredItems.slice(nextIndex, nextIndex + CHUNK_SIZE);
                        const newArr = [...prev, ...nextChunk];
                        if (newArr.length < filteredItems.length) {
                            scheduleNext();
                        }
                        return newArr;
                    });
                }, 80);
            }
        };

        // Start scheduling only if there are more items to render
        if (displayedItems.length < filteredItems.length) {
            scheduleNext();
        }

        return () => {
            clearScheduled();
        };
    // depend on filteredItems and displayedItems length initial state
    }, [filteredItems]);

    const toggleItem = (itemId: string) => {
        setOpenId(openId === itemId ? null : itemId);
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <HeroSection
                title="Preguntas Frecuentes"
                subtitle="Encuentra respuestas a tus dudas"
                description="Explora nuestra plataforma y accede a los cursos disponibles."
                buttonText="Comenzar ahora"
                buttonHref="#registrarse"
                backgroundImage="/images/sections/hero/preguntas.jpg"
            />
            <main className="grow bg-white ">
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">

                    {/* Search Filter */}
                    <div className="mb-8">
                        <div className="relative max-w-2xl mx-auto">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-brand-tertiary-lighten"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Buscar en preguntas frecuentes..."
                                    className="w-full pl-12 pr-12 py-4 transition-all duration-500 border border-brand-tertiary-lighten rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent shadow-lg"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-tertiary-light hover:text-brand-tertiary cursor-pointer"
                                        aria-label="Limpiar búsqueda"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Results count */}
                            <div className="mt-3 text-center text-sm text-brand-tertiary-light ">
                                {loading ? (
                                    <span>Cargando preguntas...</span>
                                ) : (
                                    <span>
                                        {filteredItems.length === allFaqItems.length
                                            ? `${allFaqItems.length} pregunta${allFaqItems.length !== 1 ? "s" : ""} en total`
                                            : `${filteredItems.length} de ${allFaqItems.length} pregunta${filteredItems.length !== 1 ? "s" : ""}`}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center gap-3 py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
                            <span className="text-brand-tertiary text-lg">
                                Cargando preguntas frecuentes...
                            </span>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="rounded-lg bg-red-50 /20 p-8 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-red-500 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <p className="text-red-600 text-lg font-semibold">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* No results */}
                    {!loading && !error && filteredItems.length === 0 && searchQuery && (
                        <div className="text-center py-12">
                            <svg
                                className="mx-auto h-16 w-16 text-brand-primary mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-brand-tertiary mb-2">
                                No se encontraron resultados
                            </h3>
                            <p className="text-brand-tertiary-light mb-4">
                                No hay preguntas que coincidan con <strong className="text-brand-primary">&quot;{searchQuery}&quot;</strong>
                            </p>
                            <button
                                onClick={clearSearch}
                                className="px-6 py-2 bg-white border border-solid border-brand-tertiary-light text-brand-tertiary-light transition-all cursor-pointer hover:bg-brand-tertiary-light/10 rounded-full font-bold duration-500 hover:ring-2 hover:ring-brand-tertiary-light"
                            >
                                Limpiar búsqueda
                            </button>
                        </div>
                    )}

                    {/* FAQ Items */}
                    {!loading && !error && filteredItems.length > 0 && (
                        <div className="space-y-4">
                            {displayedItems.map((item, index) => {
                                const isOpen = openId === item.id;

                                return (
                                    <div
                                        key={item.id}
                                        className="group relative"
                                        style={{
                                            animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
                                        }}
                                    >
                                        <div
                                            className={`max-w-4xl mx-auto relative border-2 rounded-xl overflow-hidden transition-all duration-300 ${isOpen
                                                    ? "border-brand-tertiary shadow-xl shadow-brand-primary-dark/20 /20 "
                                                    : "border-brand-tertiary-lighten/40 border"
                                                } bg-transparent`}
                                        >
                                            {/* Question */}
                                            <button
                                                onClick={() => toggleItem(item.id)}
                                                className={`w-full px-5 md:px-4 cursor-pointer py-2 flex items-start justify-between gap-4 text-left transition-colors ${isOpen
                                                        ? "bg-white"
                                                        : " bg-brand-tertiary-lighten/5 "
                                                    }`}
                                                aria-expanded={isOpen}
                                                aria-controls={`faq-answer-${item.id}`}
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        {/* Icon indicator */}
                                                        <div className={`shrink-0 mt-1 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen
                                                                ? "bg-brand-primary"
                                                                : "bg-brand-tertiary-lighten/30 group-hover:bg-brand-primary"
                                                            }`}>
                                                            <span className={`text-sm font-bold transition-colors ${isOpen
                                                                    ? "text-white"
                                                                    : "text-brand-tertiary group-hover:text-white"
                                                                }`}>
                                                                ?
                                                            </span>
                                                        </div>

                                                        <div className="flex-1">
                                                            <span className={`font-semibold text-lg block transition-colors ${isOpen
                                                                    ? "text-brand-primary"
                                                                    : "text-brand-tertiary group-hover:text-brand-primary"
                                                                }`}>
                                                                {item.question}
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Chevron Icon */}
                                                <div className={`shrink-0 w-10 h-10 rounded-lg flex items-start justify-center transition-all duration-300 ${isOpen
                                                        ? "bg-transparent rotate-180"
                                                        : " "
                                                    }`}>
                                                    <svg
                                                        className={`w-5 h-5 transition-colors ${isOpen
                                                                ? "text-brand-primary"
                                                                : "text-brand-tertiary-lighten group-hover:text-brand-primary"
                                                            }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2.5}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div>
                                            </button>

                                            {/* Answer */}
                                            <div
                                                id={`faq-answer-${item.id}`}
                                                className={`overflow-hidden transition-all duration-300 ${isOpen ? "bg-brand-section max-h-500 opacity-100" : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                <div className="px-5 md:px-4 pb-5 pt-2 border-t-2 border-brand-tertiary/20 ">
                                                    <div className="flex gap-3">
                                                        {/* Answer indicator */}
                                                        <div className="shrink-0 mt-1 w-8 h-8 rounded-lg bg-linear-to-tr from-brand-tertiary to-brand-tertiary flex items-center justify-center">
                                                            <span className="text-sm font-bold text-white">A</span>
                                                        </div>

                                                        <div className="flex-1 pt-1">
                                                            <p className="text-brand-tertiary leading-relaxed whitespace-pre-line text-base">
                                                                {item.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllFAQsPage;
