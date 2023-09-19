import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadCategoryName } from "../../../../wailsjs/go/app/App";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { EditCategory as EC } from "../../../../wailsjs/go/app/App";

export const EditCategory = () => {
  const [newCategory, setNewCategory] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const params = useParams();

  async function setInfo() {
    const id = Number(params.id);
    console.log(id);
    const title = await LoadCategoryName(id);
    setTitle(title);
    setNewCategory(title);
    console.log(title);
  }

  useEffect(() => {
    setInfo();
  }, []);

  const handleEditCategory = async () => {
    if (newCategory === "") {
      return;
    }
    if(newCategory == title){
      navigate("../")
      return;
    }

    const result = await EC(Number(params.id), newCategory);
    if (result == "OK") {
      navigate("../");
    }
  };

  async function handleCancel(){
    navigate("../")

  }

  return (
    <AdminLayout title="Edit Category">
      <form className="flex flex-col" onSubmit={handleEditCategory}>
        <Input
          value={newCategory}
          aria-labelledby="Enter new Category name"
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
          placeholder={title}
        />
        <div className=" ml-auto flex gap-3">
          <Button type="submit" className="mt-2" size="sm" color="primary">
            Change Name
          </Button>
          <Button onClick={handleCancel} type="button" className="mt-2" size="sm" color="danger">
            Cancel
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};
