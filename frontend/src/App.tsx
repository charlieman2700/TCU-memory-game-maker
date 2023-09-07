import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SelectDatabase } from "./pages/SelectDatabase";
import { SelectImageFolder } from "./pages/SelectImageFolder";
import { SelectMode } from "./pages/SelectMode";
import { Categories } from "./pages/admin/Categories/Categories";
import { Games } from "./pages/admin/Games";
import { EditCategory } from "./pages/admin/Categories/EditCategory";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selectDatabase" element={<SelectDatabase />} />
        <Route path="/selectImageFolder" element={<SelectImageFolder />} />
        <Route path="/selectMode" element={<SelectMode />} />

        <Route path="/admin">
          <Route path="games" element={<Games />} />
          <Route path="categories">
            <Route path="" element={<Categories />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>
        </Route>
        {
          // <Route path="/admin/categories/edit/{id}" element={<Categories />} />
          // <Route path="users">
          //        <Route path=":userId" element={<ProfilePage />} />
          //        <Route path="me" element={...} />
          //      </Route>
        }
      </Routes>
    </HashRouter>
  );
}
export default App;
