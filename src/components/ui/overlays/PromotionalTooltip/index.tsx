"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import InstagramButton from "@/components/ui/icons/IconButton/instagram.icon";
import LinkedInButton from "@/components/ui/icons/IconButton/linkedin.icon";

interface PromotionalTooltipProps {
  children: React.ReactNode;
}

const PromotionalTooltip: React.FC<PromotionalTooltipProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [portalReady, setPortalReady] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // Detectar si es un dispositivo móvil/touch
  useEffect(() => {
    const checkIfMobile = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isMobileViewport = window.innerWidth < 768; // Tailwind md breakpoint
      setIsMobile(hasTouch && isMobileViewport);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Asegurar que el portal esté disponible en cliente
  useEffect(() => {
    setPortalReady(true);
  }, []);

  // Enlaces de redes sociales (copiados del header)
  const socialLinks = {
    whatsapp: () => window.open("https://wa.me/5492612380499", "_blank"),
    mail: () => (window.location.href = "mailto:info@cursala.com.ar"),
    instagram: () =>
      window.open(
        "https://www.instagram.com/cursala.online?igsh=MXhmOGF4MnprODUxNA==",
        "_blank",
      ),
    linkedin: () =>
      window.open(
        "https://www.linkedin.com/company/cursala/?viewAsMember=true",
        "_blank",
      ),
  };

  const socialData = [
    {
      Component: InstagramButton,
      action: socialLinks.instagram,
      name: "Instagram",
    },
    {
      Component: LinkedInButton,
      action: socialLinks.linkedin,
      name: "LinkedIn",
    },
  ];

  // Funciones para manejar interacciones
  const handleShowTooltip = () => {
    setIsVisible(true);
    // Emitir evento global para pausar carousel
    window.dispatchEvent(new CustomEvent("promotionalTooltip:open"));

    // Calcular posición evitando recortes del viewport
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const PADDING = 8;
      const ESTIMATED_WIDTH = 256; // ~ w-64
      const left = Math.min(
        Math.max(rect.left + 32, PADDING),
        window.innerWidth - ESTIMATED_WIDTH - PADDING,
      );
      const top = Math.min(
        Math.max(rect.top + 32, PADDING),
        window.innerHeight - 200, // altura estimada
      );
      setPosition({ top, left });
    }
  };

  const handleHideTooltip = () => {
    setIsVisible(false);
    // Emitir evento global para reanudar carousel
    window.dispatchEvent(new CustomEvent("promotionalTooltip:close"));
  };

  const handleToggleTooltip = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
      e.nativeEvent.stopPropagation();
    }
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);

    // Emitir eventos globales según el nuevo estado
    if (newVisibility) {
      window.dispatchEvent(new CustomEvent("promotionalTooltip:open"));
    } else {
      window.dispatchEvent(new CustomEvent("promotionalTooltip:close"));
    }

    return false;
  };

  const handleMouseEvent = (
    e: React.MouseEvent | React.TouchEvent | React.PointerEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      e.nativeEvent &&
      typeof (e.nativeEvent as any).stopPropagation === "function"
    ) {
      (e.nativeEvent as any).stopImmediatePropagation?.();
      (e.nativeEvent as any).stopPropagation?.();
    }
    return false;
  };

  // Cerrar tooltip cuando se toque fuera (solo en móvil)
  useEffect(() => {
    if (isMobile && isVisible) {
      const handleClickOutside = (e: TouchEvent) => {
        // Solo cerrar si el toque no es en el tooltip o la etiqueta
        const target = e.target as Element;
        if (!target.closest("[data-tooltip]")) {
          setIsVisible(false);
          window.dispatchEvent(new CustomEvent("promotionalTooltip:close"));
        }
      };

      // Agregar un pequeño delay para evitar cierre inmediato
      const timeoutId = setTimeout(() => {
        document.addEventListener("touchstart", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isMobile, isVisible]);

  // Compartido para evitar cierre mientras el puntero entra al portal
  const hoveringPortal = useRef(false);

  return (
    <div className="group relative inline-block" data-tooltip>
      <div
        // Eventos para desktop (hover)
        onMouseEnter={!isMobile ? handleShowTooltip : undefined}
        onMouseLeave={
          !isMobile
            ? () => {
                // pequeño retardo para permitir mover el mouse al portal
                setTimeout(() => {
                  if (!hoveringPortal.current) {
                    handleHideTooltip();
                  }
                }, 80);
              }
            : undefined
        }
        // Eventos para móvil (touch)
        onTouchStart={handleToggleTooltip}
        onTouchEnd={handleMouseEvent}
        onClick={handleToggleTooltip}
        onMouseDown={handleMouseEvent}
        onMouseUp={handleMouseEvent}
        onPointerDown={handleMouseEvent}
        onPointerUp={handleMouseEvent}
        className="relative z-10 cursor-pointer"
        data-tooltip
        style={{
          position: "relative",
          zIndex: 30,
          touchAction: "manipulation",
          userSelect: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 31,
            pointerEvents: "auto",
          }}
          ref={triggerRef}
          onClick={handleToggleTooltip}
          onMouseDown={handleMouseEvent}
          onTouchStart={handleToggleTooltip}
        >
          {children}
        </div>
      </div>

      {isVisible && isMobile && (
        // Modal para móvil - centrado en pantalla
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => {
            setIsVisible(false);
            window.dispatchEvent(new CustomEvent("promotionalTooltip:close"));
          }}
          data-tooltip
        >
          <div
            className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            data-tooltip
          >
            {/* Contenido del tooltip */}
            <div className="text-center">
              <p className="text-gray-800 mb-4 text-sm font-medium">
                ¡Para conseguir códigos promocionales consulta nuestras redes
                sociales!
              </p>

              {/* Botones de redes sociales */}
              <div className="mb-4 flex justify-center space-x-4">
                {socialData.map(({ Component, action, name }, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      action();
                      setIsVisible(false);
                      window.dispatchEvent(
                        new CustomEvent("promotionalTooltip:close"),
                      );
                    }}
                    className="bg-gray-50 hover:bg-gray-100 rounded-full p-3 transition-transform hover:scale-110 active:scale-95"
                    title={name}
                    data-tooltip
                  >
                    <Component />
                  </button>
                ))}
              </div>

              {/* Botón de cerrar */}
              <button
                onClick={() => {
                  setIsVisible(false);
                  window.dispatchEvent(
                    new CustomEvent("promotionalTooltip:close"),
                      );
                }}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 w-full rounded px-4 py-3 text-sm font-medium"
                data-tooltip
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {isVisible &&
        !isMobile &&
        portalReady &&
        position &&
        ReactDOM.createPortal(
          <div
            className="border-gray-200 fixed z-9999 w-64 rounded-lg border bg-white p-4 shadow-xl"
            style={{ top: position.top, left: position.left }}
            onMouseEnter={() => {
              hoveringPortal.current = true;
              handleShowTooltip();
            }}
            onMouseLeave={() => {
              hoveringPortal.current = false;
              setTimeout(() => {
                if (!hoveringPortal.current) {
                  handleHideTooltip();
                }
              }, 80);
            }}
          >
            {/* Contenido del tooltip */}
            <div className="text-center">
              <p className="text-gray-800 mb-3 text-sm font-medium">
                ¡Para conseguir códigos promocionales consulta nuestras redes
                sociales!
              </p>

              {/* Botones de redes sociales */}
              <div className="flex justify-center space-x-3">
                {socialData.map(({ Component, action, name }, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      action();
                    }}
                    className="transition-transform hover:scale-110 active:scale-95"
                    title={name}
                  >
                    <Component />
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default PromotionalTooltip;