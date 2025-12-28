import { redirect } from 'next/navigation';
import { conf } from '@/config/env';

export default async function Register() {
  // En desarrollo, redirigir directamente sin verificar
  if (process.env.NODE_ENV === 'development') {
    redirect(`${conf.frontendPrivateUrl}/register`);
  }

  // En producción, verificar que el frontend privado esté disponible
  try {
    const res = await fetch(`${conf.frontendPrivateUrl}/register`, {
      method: 'HEAD', // Usar HEAD para verificar sin descargar contenido
    });
    if (res.ok) {
      redirect(`${conf.frontendPrivateUrl}/register`);
    } else {
      redirect('/mantenimiento');
    }
  } catch {
    redirect('/mantenimiento');
  }
}