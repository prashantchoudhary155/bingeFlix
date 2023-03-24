import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./CSS/App.css";

import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";
import Home_Search_Genre_page from "./pages/Home_Search_Genre_page";
import Notfound from "./components/Notfound";

import Moviedetails from "./components/Moviedetails";

function App() {
  return (
    
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home_Search_Genre_page />} />
          <Route
            path="/search/:searchTerm"
            element={<Home_Search_Genre_page />}
          />
          <Route path="/genre/:genreIds" element={<Home_Search_Genre_page />} />
          <Route path="/movie/:movieId" element={<Moviedetails />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <ScrollTop />
      </Router>
  );
}

//routing

// context wrap

export default App;
