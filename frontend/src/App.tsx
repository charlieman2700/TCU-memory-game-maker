import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SelectDatabase } from "./pages/SelectDatabase";
import { SelectImageFolder } from "./pages/SelectImageFolder";
import { SelectMode } from "./pages/SelectMode";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selectDatabase" element={<SelectDatabase />} />
        <Route path="/selectImageFolder" element={<SelectImageFolder />} />
        <Route path="/selectMode" element={<SelectMode />} />
      </Routes>
    </HashRouter>
  );
}
export default App;
