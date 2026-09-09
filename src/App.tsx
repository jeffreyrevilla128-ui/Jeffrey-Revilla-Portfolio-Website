import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import FeaturedProjects from './components/sections/FeaturedProjects'
import Contact from './components/sections/Contact'

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App