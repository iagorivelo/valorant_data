import { CosmeticsNav } from '@/components/CosmeticsNav';

export default function CosmeticosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CosmeticsNav />
      {children}
    </>
  );
}
