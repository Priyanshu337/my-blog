import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import AboutPage from './Pages/AboutPage';
import ArticleListPage from './Pages/ArticleListPage';
import HomePage from './Pages/HomePage';
import ArticlePage from './Pages/ArticlePage';
import NotFoundPage from './Pages/NotFoundPage';
import AddArticlePage from './Pages/AddArticlePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticleListPage />} />
          <Route path="/articles/:articleId" element={<ArticlePage />} />
          <Route path="/addArticles" element={<AddArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;