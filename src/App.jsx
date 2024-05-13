import { BrowserRouter } from "react-router-dom"
import { StyledEngineProvider } from "@mui/material/styles"

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components"

const App = () => {
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </StyledEngineProvider>
    </BrowserRouter>
  )
}

export default App
