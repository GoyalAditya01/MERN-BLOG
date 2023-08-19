import { BrowserRouter as Router,Route,Routes  } from "react-router-dom";
// pages
import About from "./pages/About";
import Article from "./pages/Article";
import Home from "./pages/Home";
import ArticleList from "./pages/ArticleList";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Router>
      <Navbar/>
    <div className="max-w-screen-md mx-auto pt-20" >
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Article/:name" element={<Article/>}/>
      <Route path="/ArticleList" element={<ArticleList/>}/>
     <Route path="*" element={<NotFound/>}/>
      </Routes>    
     </div>
     </Router>
  );
}

export default App;
