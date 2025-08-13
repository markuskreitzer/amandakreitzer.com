import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Exhibitions from './pages/Exhibitions';
import Contact from './pages/Contact';
import ContactConfirmation from './pages/ContactConfirmation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="about" element={<About />} />
          <Route path="exhibitions" element={<Exhibitions />} />
          <Route path="contact" element={<Contact />} />
          <Route path="contact/confirmation" element={<ContactConfirmation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
