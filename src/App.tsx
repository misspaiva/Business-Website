import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Philosophy } from '@/components/Philosophy';
import { AreasOfExploration } from '@/components/AreasOfExploration';
import { Projects } from '@/components/Projects';
import { Research } from '@/components/Research';
import { About } from '@/components/About';
import { Diagnostico } from '@/components/Diagnostico';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Philosophy />
        <AreasOfExploration />
        <Projects />
        <Research />
        <About />
        <Diagnostico />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
