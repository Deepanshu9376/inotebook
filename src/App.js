// import { Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/NoteState";
import Alert from "./Components/ALert";

function App() {
  return (
    <div className="App">
      <NoteState>
        <div >
          <Router>
            <NavigationBar />
            <Alert message="This is danger to"/>
            <Routes >
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </Router>
        </div>
      </NoteState>
    </div>
  );
}

export default App;
