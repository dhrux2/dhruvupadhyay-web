import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Header />
      <Hero />
      <Philosophy />
      <Projects />
      <TechStack />
      <Footer />
    </main>
  );
}
