"use client";
import React from "react";
import { GlobalProvider } from "@/context/global.context";
import WhatsAppButton from "@/components/ui/misc/WhatsappFloat";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <GlobalProvider>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {children}

        {/* Botón flotante de WhatsApp */}
        <WhatsAppButton
          phoneNumber="5492612380499"
          message="¡Hola! Me gustaría obtener más información."
        />
      </div>
    </GlobalProvider>
  );
}