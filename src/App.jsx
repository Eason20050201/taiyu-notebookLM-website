import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import SubjectDetail from './pages/SubjectDetail';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter basename="/taiyu-notebookLM-website">
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/subject/:name" element={<SubjectDetail />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
