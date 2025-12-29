import { redirect } from 'next/navigation';
import { conf } from '@/config/env';

export default async function Register() {
  // Redirigir directamente al frontend privado
  redirect(`${conf.frontendPrivateUrl}/register`);
}