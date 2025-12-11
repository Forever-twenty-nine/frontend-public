"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import flyer1 from "@/img/images/Flyers_home-01.jpg";
import flyer2 from "@/img/images/Flyers_home-02.jpg";
import flyer3 from "@/img/images/Flyers_home-03.jpg";
import flyer1_movil from "@/img/images/flyer_1-05.jpg";
import flyer2_movil from "@/img/images/Flyers cel-06.jpg";
import flyer3_movil from "@/img/images/Flyers cel-07.jpg";

interface CarouselImage {
 src: any;
 alt: string;
}

const desktopImages: CarouselImage[] = [
 { src: flyer1, alt: "Promoción de cursos - Banner 1" },
 { src: flyer2, alt: "Ofertas especiales - Banner 2" },
 { src: flyer3, alt: "Nuevos cursos disponibles - Banner 3" },
];

const mobileImages: CarouselImage[] = [
 { src: flyer1_movil, alt: "Promoción de cursos - Banner móvil 1" },
 { src: flyer2_movil, alt: "Ofertas especiales - Banner móvil 2" },
 { src: flyer3_movil, alt: "Nuevos cursos disponibles - Banner móvil 3" },
];

interface CarouselSectionProps {
 className?: string;
 autoPlaySpeed?: number;
}

/**
 * Sección de carousel de banners promocionales
 * Muestra banners rotativos con navegación y auto-play
 */

const CarouselSection: React.FC<CarouselSectionProps> = ({
 className = "",
 autoPlaySpeed = 5000,
}) => {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [isMobile, setIsMobile] = useState(false);
 const [isTransitioning, setIsTransitioning] = useState(false);

 const images = isMobile ? mobileImages : desktopImages;

 // Detectar tamaño de pantalla
 useEffect(() => {
 const handleResize = () => {
 setIsMobile(window.innerWidth < 800);
 };

 handleResize();
 window.addEventListener("resize", handleResize);
 return () => window.removeEventListener("resize", handleResize);
 }, []);

 // Navegación
 const goToSlide = useCallback((index: number) => {
 if (isTransitioning) return;
 setIsTransitioning(true);
 setCurrentIndex(index);
 setTimeout(() => setIsTransitioning(false), 500);
 }, [isTransitioning]);

 const goToNext = useCallback(() => {
 goToSlide((currentIndex + 1) % images.length);
 }, [currentIndex, images.length, goToSlide]);

 const goToPrev = useCallback(() => {
 goToSlide((currentIndex - 1 + images.length) % images.length);
 }, [currentIndex, images.length, goToSlide]);

 // Auto-play
 useEffect(() => {
 const interval = setInterval(goToNext, autoPlaySpeed);
 return () => clearInterval(interval);
 }, [goToNext, autoPlaySpeed]);

 // Soporte para gestos táctiles
 const [touchStart, setTouchStart] = useState(0);
 const [touchEnd, setTouchEnd] = useState(0);

 const handleTouchStart = (e: React.TouchEvent) => {
 setTouchStart(e.targetTouches[0].clientX);
 };

 const handleTouchMove = (e: React.TouchEvent) => {
 setTouchEnd(e.targetTouches[0].clientX);
 };

 const handleTouchEnd = () => {
 if (touchStart - touchEnd > 50) {
 goToNext();
 }
 if (touchStart - touchEnd < -50) {
 goToPrev();
 }
 };

 return (
 <section 
 className={`relative w-full overflow-hidden bg-white ${className}`}
 aria-label="Banners promocionales"
 >
 <div className="max-w-7xl mx-auto px-0">
 {/* Contenedor del carousel */}
 <div
 className="relative w-full"
 onTouchStart={handleTouchStart}
 onTouchMove={handleTouchMove}
 onTouchEnd={handleTouchEnd}
 >
 {/* Slides */}
 <div className="relative aspect-video w-full md:aspect-21/9">
 {images.map((image, index) => (
 <div
 key={index}
 className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
 index === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"
 }`}
 >
 <Image
 src={image.src}
 alt={image.alt}
 fill
 className="object-cover"
 priority={index === 0}
 quality={90}
 sizes="100vw"
 />
 </div>
 ))}
 </div>

 {/* Indicadores (dots) */}
 <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-2">
 {images.map((_, index) => (
 <button
 key={index}
 onClick={() => goToSlide(index)}
 className={`h-2 rounded-full transition-all duration-300 ${
 index === currentIndex
 ? "w-8 bg-white shadow-lg"
 : "w-2 bg-white/50 hover:bg-white/75"
 }`}
 aria-label={`Ir al banner ${index + 1}`}
 aria-current={index === currentIndex}
 />
 ))}
 </div>

 {/* Botones de navegación - solo desktop */}
 <button
 onClick={goToPrev}
 className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-all duration-200 hover:bg-black/50 md:flex"
 aria-label="Banner anterior"
 >
 <svg
 className="h-6 w-6"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M15 19l-7-7 7-7"
 />
 </svg>
 </button>

 <button
 onClick={goToNext}
 className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-all duration-200 hover:bg-black/50 md:flex"
 aria-label="Banner siguiente"
 >
 <svg
 className="h-6 w-6"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M9 5l7 7-7 7"
 />
 </svg>
 </button>
 </div>
 </div>
 </section>
 );
};

export default React.memo(CarouselSection);
