import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Searchbar from "./components/Searchbar";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Searchbar />} />
        <Route path="/cityDetails" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
