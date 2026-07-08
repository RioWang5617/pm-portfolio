import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Works from './pages/Works'
import CaseStudy from './pages/CaseStudy'
import Vibecoding from './pages/Vibecoding'
import Demo from './pages/Demo'
import About from './pages/About'
import { ChatLauncher } from './components/ChatLauncher'

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:slug" element={<CaseStudy />} />
          <Route path="/vibecoding" element={<Vibecoding />} />
          <Route path="/vibecoding/:slug" element={<Demo />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
      <ChatLauncher />
    </>
  )
}
