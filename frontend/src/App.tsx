import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SelectDatabase } from "./pages/SelectDatabase";
import { SelectImageFolder } from "./pages/SelectImageFolder";
import { SelectMode } from "./pages/SelectMode";
import { Categories } from "./pages/admin/Categories";
import { Games } from "./pages/admin/Games";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selectDatabase" element={<SelectDatabase />} />
        <Route path="/selectImageFolder" element={<SelectImageFolder />} />
        <Route path="/selectMode" element={<SelectMode />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/games" element={<Games />} />


      </Routes>


    </HashRouter>
  );
}
export default App;
