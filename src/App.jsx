import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import About from './pages/About';
import Vaccines from './pages/Vaccines';
import Groomer from './pages/Groomer';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans pt-20 pb-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/vaccines" element={<Vaccines />} />
          <Route path="/groomer" element={<Groomer />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
