import "./App.css";
import Navbar from "./Components/NavBar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navbar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
