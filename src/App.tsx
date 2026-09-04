import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Philosophy } from '@/components/Philosophy';
import { AreasOfExploration } from '@/components/AreasOfExploration';
import { ProjectsAndSystems } from '@/components/ProjectsAndSystems';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SignalField } from '@/components/SignalField';

function App() {
  return (
    <>
      <Navigation />
      <main id="top">
        <Hero />
        <Philosophy />
        <SignalField />
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
