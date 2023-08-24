import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SelectDatabase } from "./pages/SelectDatabase";
import { SelectImageFolder } from "./pages/SelectImageFolder";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selectDatabase" element={<SelectDatabase />} />
        <Route path="/selectImageFolder" element={<SelectImageFolder />} />
      </Routes>
    </HashRouter>
  );
}
export default App;
