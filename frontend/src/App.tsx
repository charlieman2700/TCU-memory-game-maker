import "./App.css";
import { Greet } from "../wailsjs/go/main/App";
import { LogoSplash } from "./Components/LogoSplash";
import * as ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SelectDatabase } from "./pages/SelectDatabase";

function App() {
  return (
    <HashRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selectDatabase" element={<SelectDatabase />} />

      </Routes>
    </HashRouter>
  );
}
export default App;
