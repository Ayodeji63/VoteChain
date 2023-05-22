import "./App.css";
import Navbar from "./Components/NavBar/Navbar";
import Login from "./Components/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" />
          <Route exact path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
