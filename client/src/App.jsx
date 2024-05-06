import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar/Navbar';
import AboutPage from './Pages/AboutPage/AboutPage';
import ArticleListPage from './Pages/ArticlesList/ArticleListPage';
import HomePage from './Pages/HomePage/HomePage';
import ArticlePage from './Pages/ArticlePage/ArticlePage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import Index from './Pages/AddArticlePage/Index';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Signup/SignUp';
import ContactPage from './Pages/ContactPage/index';

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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/index" element={<Index />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;