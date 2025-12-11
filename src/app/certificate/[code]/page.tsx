"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface CertificateData {
  isValid: boolean;
  student: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    dni?: string;
  };
  course: {
    _id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    duration?: number;
  };
  teacher: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    professionalDescription?: string;
    professionalSignatureUrl?: string;
  } | null;
  certificateInfo: {
    generatedAt: string;
    generatedBy: string;
    certificateId: string;
  };
}

const CertificateValidation: React.FC = () => {
  const params = useParams();
  const code = params.code as string;
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateCertificate = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulated API call - replace with actual service
        // Nota: el backend expone la ruta como /api/v1/validate/:verificationCode (sin el prefijo /certificate)
        // Por eso aquí debe llamarse /validate y no /certificate/validate para evitar 404.
        const response = await fetch(`/api/fetch?path=/validate/${code}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Certificado no válido o no encontrado");
        }

        const data = await response.json();
        setCertificateData(data.data);
      } catch (err: any) {
        console.error("Error validating certificate:", err);
        setError(err.message || "Error al validar el certificado");
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      validateCertificate();
    }
  }, [code]);

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Validando certificado...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 flex min-h-screen items-center justify-center">
        <div className="dark:bg-gray-800 w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="text-red-600 dark:text-red-400 h-8 w-8"
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
            </div>
            <h1 className="text-gray-900 mb-2 text-2xl font-bold dark:text-white">
              Certificado No Válido
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-primary px-6 py-2 text-white transition-colors hover:bg-primary/90"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (!certificateData || !certificateData.isValid) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 flex min-h-screen items-center justify-center">
        <div className="dark:bg-gray-800 w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="text-red-600 dark:text-red-400 h-8 w-8"
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
            </div>
            <h1 className="text-gray-900 mb-2 text-2xl font-bold dark:text-white">
              Certificado No Válido
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              El código QR escaneado no corresponde a un certificado válido.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header with validation success */}
        <div className="dark:bg-gray-800 mb-8 rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <svg
                className="h-10 w-10 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-gray-900 mb-2 text-3xl font-bold dark:text-white">
              ✓ Certificado Válido
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Este certificado ha sido verificado exitosamente
            </p>
          </div>

          {/* Certificate Preview (Diseño con header y footer degradé) */}
          <div className="border-gray-200 dark:border-gray-600 relative overflow-hidden rounded-xl border bg-white shadow-xl print:shadow-none">
            {/* Header Azul con Degradé */}
            <div className="flex h-24 items-center justify-between bg-linear-to-r from-primary via-[#0A6FB3] to-[#0A5FA0] px-6 md:h-28 md:px-10">
              <Image
                src="/images/logo/logo-02-A-white.svg"
                alt="Cursala Logo"
                width={180}
                height={70}
                className="h-12 w-auto object-contain drop-shadow md:h-14"
                priority
                onError={(e: any) => {
                  e.currentTarget.src = "/images/logo/logo-02-A-white.svg";
                }}
              />
              <span className="select-none text-right text-sm font-semibold italic tracking-wide text-white md:text-base">
                Certificado de PARTICIPACIÓN
              </span>
            </div>

            {/* Cuerpo */}
            <div className="px-8 py-10 text-center md:px-14 md:py-14">
              <h2 className="text-gray-800 mb-8 text-3xl font-extrabold tracking-wide dark:text-white md:text-4xl">
                Se certifica que:
              </h2>
              <p className="mb-6 text-4xl font-bold leading-tight text-primary md:text-5xl">
                {certificateData.student.firstName}{" "}
                {certificateData.student.lastName}
              </p>
              <p className="text-gray-700 dark:text-gray-200 mb-2 text-lg md:text-xl">
                De la empresa / usuario:
              </p>
              <p className="text-gray-900 mb-8 text-xl font-semibold dark:text-white md:text-2xl">
                {certificateData.student.username}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm font-medium uppercase tracking-wide md:text-base">
                Participó del curso
              </p>
              <p className="text-gray-900 mb-6 text-2xl font-semibold dark:text-white md:text-3xl">
                "{certificateData.course.name}"
              </p>
              <div className="text-gray-600 dark:text-gray-300 flex flex-col items-center gap-2 text-sm md:text-base">
                {formatDate(certificateData.course.startDate) &&
                  formatDate(certificateData.course.endDate) && (
                    <p>
                      Dictado entre{" "}
                      {formatDate(certificateData.course.startDate)} y{" "}
                      {formatDate(certificateData.course.endDate)}.
                    </p>
                  )}
                <p>
                  Certificado N°:{" "}
                  <span className="font-mono text-gray-800 dark:text-gray-200">
                    {certificateData.certificateInfo.certificateId}
                  </span>
                </p>
              </div>
              {/* Firma / Profesor */}
              <div className="mt-12 flex flex-col items-end">
                <div className="w-64 pt-2 text-right">
                  {certificateData.teacher ? (
                    <>
                      {/* Firma profesional si existe */}
                      {certificateData.teacher.professionalSignatureUrl && (
                        <div className="mb-2 flex justify-end">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/api/direct?path=/user/${encodeURIComponent(certificateData.teacher.professionalSignatureUrl)}/image`}
                            alt="Firma profesional"
                            className="h-auto w-auto max-h-15 max-w-30 object-contain"
                            onError={(e: any) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <p className="text-gray-900 text-sm font-semibold dark:text-white md:text-base">
                        {certificateData.teacher.firstName}{" "}
                        {certificateData.teacher.lastName}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                        INSTRUCTOR CURSALA
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-900 text-sm font-semibold dark:text-white md:text-base">
                        Cursala
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                        PLATAFORMA EDUCATIVA
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Azul con Degradé */}
            <div className="flex h-14 items-center justify-end bg-linear-to-r from-primary via-[#0A6FB3] to-[#0A5FA0] px-8 md:px-10">
              <span className="text-sm font-semibold tracking-wide text-white md:text-base">
                www.cursala.com.ar
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Student Information */}
          <div className="dark:bg-gray-800 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-gray-900 mb-4 flex items-center text-xl font-bold dark:text-white">
              <svg
                className="mr-2 h-5 w-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Información del Estudiante
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Nombre:
                </span>
                <p className="text-gray-900 dark:text-white">
                  {certificateData.student.firstName}{" "}
                  {certificateData.student.lastName}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Email:
                </span>
                <p className="text-gray-900 dark:text-white">
                  {certificateData.student.email}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Usuario:
                </span>
                <p className="text-gray-900 dark:text-white">
                  {certificateData.student.username}
                </p>
              </div>
            </div>
          </div>

          {/* Course Information */}
          <div className="dark:bg-gray-800 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-gray-900 mb-4 flex items-center text-xl font-bold dark:text-white">
              <svg
                className="mr-2 h-5 w-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Información del Curso
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Curso:
                </span>
                <p className="text-gray-900 dark:text-white">
                  {certificateData.course.name}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Descripción:
                </span>
                <p className="text-gray-900 dark:text-white">
                  {certificateData.course.description}
                </p>
              </div>
              {formatDate(certificateData.course.startDate) && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Fecha de inicio:
                  </span>
                  <p className="text-gray-900 dark:text-white">
                    {formatDate(certificateData.course.startDate)}
                  </p>
                </div>
              )}
              {formatDate(certificateData.course.endDate) && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    Fecha de finalización:
                  </span>
                  <p className="text-gray-900 dark:text-white">
                    {formatDate(certificateData.course.endDate)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Teacher Information */}
          {certificateData.teacher && (
            <div className="dark:bg-gray-800 rounded-lg bg-white p-6 shadow-lg lg:col-span-2">
              <h3 className="text-gray-900 mb-4 flex items-center text-xl font-bold dark:text-white">
                <svg
                  className="mr-2 h-5 w-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Información del Profesor
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Nombre:
                    </span>
                    <p className="text-gray-900 dark:text-white">
                      {certificateData.teacher.firstName}{" "}
                      {certificateData.teacher.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Email:
                    </span>
                    <p className="text-gray-900 dark:text-white">
                      {certificateData.teacher.email}
                    </p>
                  </div>
                </div>
                {certificateData.teacher.professionalDescription && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Descripción profesional:
                    </span>
                    <p className="text-gray-900 mt-1 dark:text-white">
                      {certificateData.teacher.professionalDescription}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certificate Details */}
          <div className="dark:bg-gray-800 rounded-lg bg-white p-6 shadow-lg lg:col-span-2">
            <h3 className="text-gray-900 mb-4 flex items-center text-xl font-bold dark:text-white">
              <svg
                className="mr-2 h-5 w-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Detalles de Verificación
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  ID del Certificado:
                </span>
                <p className="text-gray-900 font-mono text-sm dark:text-white">
                  {certificateData.certificateInfo.certificateId}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Generado el:
                </span>
                <p className="text-gray-900 dark:text-white">
                  {formatDate(certificateData.certificateInfo.generatedAt)}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Generado por:
                </span>
                <p className="text-gray-900 dark:text-white">
                  {(() => {
                    const gb = certificateData.certificateInfo.generatedBy;
                    if (gb && typeof gb === "object") {
                      const first = (gb as any).firstName || "";
                      const last = (gb as any).lastName || "";
                      const full = `${first} ${last}`.trim();
                      return full || (gb as any)._id || "—";
                    }
                    return gb || "—";
                  })()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="dark:bg-gray-800 mt-8 rounded-lg bg-white p-6 text-center shadow-lg">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Este certificado fue generado automáticamente por el sistema Cursala
            y es válido hasta la fecha actual.
          </p>
          {/* Código de verificación oculto según nueva política */}
        </div>
      </div>
    </div>
  );
};

export default CertificateValidation;
