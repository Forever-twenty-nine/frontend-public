import React from "react";
import Image from "next/image";


interface HeroSectionProps {
 title: string;
 subtitle: string;
 description: string;
 buttonText: string;
 buttonHref: string;
 logoSrc?: string;
 logoAlt?: string;
 backgroundImage?: string; // ruta relativa desde public
}


const HeroSection: React.FC<HeroSectionProps> = ({
 title,
 subtitle,
 description,
 buttonText,
 buttonHref,
 logoSrc = "/logo/cursala-iso.svg",
 logoAlt = "Iso Cursala",
 backgroundImage,
}) => {
 // Imagen de fondo por defecto si no se pasa backgroundImage
 const bgImage = backgroundImage || "/images/sections/hero/cursos.jpg";
 return (
 <section className="relative bg-linear-to-r from-brand-primary to-brand-primary/40 py-10 md:py-10 overflow-hidden">
 {/* Imagen de fondo */}
 <Image
 src={bgImage}
 alt="Fondo hero"
 fill
 className="object-cover object-center opacity-30 pointer-events-none select-none z-0"
 priority
 sizes="100vw"
 />
 <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-3 lg:gap-20">
 <div className="order-2 w-full md:order-1">
 <h1 className="mb-6 mt-4 text-left text-4xl font-bold md:text-4xl text-white">
 {title}
 </h1>
 <p className="text-left text-xl text-white">
 {subtitle}
 </p>
 </div>
 <div className="order-1 md:max-w-2xs w-full md:order-2">
 <div className="bg-linear-to-tr from-brand-tertiary/90 to-brand-tertiary-light/90 shadow-lg shadow-brand-tertiary/20 text-white rounded-xl px-4 py-6 text-center ">
 <p className="text-center">
 {description}
 </p>
 <a href={buttonHref} className="relative mx-auto block mt-6 bg-brand-secondary text-brand-tertiary px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:ring-[3px] hover:ring-[#c99c07] hover:bg-brand-secondary active:bg-brand-tertiary active:text-white ">
 {buttonText}
 <Image
 width={140}
 height={30}
 src={logoSrc}
 alt={logoAlt}
 className="h-8 w-auto absolute top-1 right-2"
 priority
 />
 </a>
 </div>
 </div>
 </div>
 </section>
 );
};

export default HeroSection;
