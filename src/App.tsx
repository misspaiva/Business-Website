import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Philosophy } from '@/components/Philosophy';
import { AreasOfExploration } from '@/components/AreasOfExploration';
import { ProjectsAndSystems } from '@/components/ProjectsAndSystems';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <>
      <Navigation />
      <main id="top">
        <Hero />
        <Philosophy />
        <AreasOfExploration />
        <ProjectsAndSystems />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
