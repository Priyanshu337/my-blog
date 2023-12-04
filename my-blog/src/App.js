import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutPage from './Pages/AboutPage';
import ArticleListPage from './Pages/ArticleListPage';
import HomePage from './Pages/HomePage';
import ArticlePage from './Pages/ArticlePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>This is my blog Page</h1>
        <Routes>
          <Route path="/" element={HomePage} />
          <Route path="/about" element={AboutPage} />
          <Route path="/articles" element={ArticleListPage} />
          <Route path="/articles/:articleID" element={ArticlePage} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
