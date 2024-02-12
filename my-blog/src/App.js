import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../src/Component/Navbar/Navbar';
import AboutPage from './Pages/AboutPage/AboutPage';
import ArticleListPage from './Pages/ArticlesList/ArticleListPage';
import HomePage from './Pages/HomePage/HomePage';
import ArticlePage from './Pages/ArticlePage/ArticlePage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import Index from './Pages/AddArticlePage/Index';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticleListPage />} />
          <Route path="/articles/:articleid" element={<ArticlePage />} />
          <Route path="/index" element={<Index />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;