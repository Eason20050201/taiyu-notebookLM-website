import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import SubjectDetail from './pages/SubjectDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/subject/:name" element={<SubjectDetail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
