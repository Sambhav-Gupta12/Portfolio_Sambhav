import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SelectedWork from "./components/SelectedWork";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Journey from "./components/Journey";
import GitHubActivity from "./components/GitHubActivity";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { projects } from "./data/projects";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SelectedWork projects={projects} />
        <About />
        <Technologies />
        <Journey />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
