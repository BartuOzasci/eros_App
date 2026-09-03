import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ScrollToTop from "./components/common/ScrollToTop";
import About from "./pages/About";
import Vaccines from "./pages/Vaccines";
import Groomer from "./pages/Groomer";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/vaccines" element={<Vaccines />} />
          <Route path="/groomer" element={<Groomer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
