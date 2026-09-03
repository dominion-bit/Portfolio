import "./App.css";
import BootIntro from "./Components/Bootintro";
import ParticleField from "./Components/Particlefield";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import About from "./Components/About,";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";

function App() {
  return (
    <>
      {/* Shared texture used across sections — see .bg-grid below.
          It only sets background-image/size, so it composes cleanly
          with each section's own bg-[var(--bg-x)] color class. */}
      <style>{`
        .bg-grid {
          background-image:
            linear-gradient(to right, rgba(148, 163, 184, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
          background-size: 44px 44px;
        }
      `}</style>

      <BootIntro />
      <ParticleField />

      <div className="App">
        <Header />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;