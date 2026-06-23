import { redirect } from 'next/navigation';

// A home redireciona para a aba de agentes (rota canônica).
export default function Home() {
  redirect('/agentes');
}
