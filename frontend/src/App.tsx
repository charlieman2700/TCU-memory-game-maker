import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SelectDatabase } from "./pages/SelectDatabase";
import { SelectImageFolder } from "./pages/SelectImageFolder";
import { SelectMode } from "./pages/SelectMode";
import { Categories, EditCategory } from "./pages/admin/Categories/index";

import { Games } from "./pages/admin/Games/Games";
import { NewGame } from "./pages/admin/Games/NewGame";
import { EditGame } from "./pages/admin/Games/EditGame";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selectDatabase" element={<SelectDatabase />} />
        <Route path="/selectImageFolder" element={<SelectImageFolder />} />
        <Route path="/selectMode" element={<SelectMode />} />

        <Route path="/admin">
          <Route path="games">
            <Route path="" element={<Games />} />
            <Route path="newGame" element={<NewGame />} />
            <Route path="edit/:id" element={<EditGame />} />
          </Route>
          <Route path="categories">
            <Route path="" element={<Categories />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default App;
