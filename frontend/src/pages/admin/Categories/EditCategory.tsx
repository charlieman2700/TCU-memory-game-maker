import { Button, Input, Spacer, Table, TableHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
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
    setTitle(await LoadCategoryName(id));
    console.log(title);
  }

  useEffect(() => {
    setInfo();
  }, []);

  const handleCreateCategory = async () => {
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
      <form onSubmit={handleCreateCategory}>
        <Input
          value={newCategory}
          aria-labelledby="Enter new Category name"
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
          placeholder={title}
        />
        <div className="flex gap-3">
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
