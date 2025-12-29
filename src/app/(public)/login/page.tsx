import { redirect } from 'next/navigation';
import { conf } from '@/config/env';

export default async function Login() {
  // Redirigir directamente al frontend privado
  redirect(`${conf.frontendPrivateUrl}/login`);
}