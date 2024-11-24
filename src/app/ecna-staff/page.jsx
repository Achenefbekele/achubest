import ECNA_Staff from '@/components/ECNA_Staff';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ECNAStaffPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ECNA_Staff />
      </main>
      <Footer />
    </div>
  );
} 