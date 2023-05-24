import "./App.css";
import Navbar from "./Components/NavBar/Navbar";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from "./Components/HeroPage/HeroPage";
import SubHeroPage from "./Components/SubHeroPage/SubHeroPage";
import Features from "./Components/Features/Features";
import Mission from "./Components/Mission/Mission";
import HowToVote from "./Components/HowToVote/HowToVote";
import Faq from "./Components/Faq/Faq";
import Newsletter from "./Components/Newsletter/Newsletter";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <HeroPage />
                <SubHeroPage />
                <Features />
                <Mission />
                <HowToVote/>
                <Faq/>
                <Newsletter/>
              </>
            }
          />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
