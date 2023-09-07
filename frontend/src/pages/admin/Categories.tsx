import { AdminLayout } from "../../layouts/AdminLayout";
import { Button, getKeyValue, Input } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { EventHandler, useEffect, useState } from "react";
import {
  CreateNewCategory,
  EraseCategory,
  LoadCategories,
} from "../../../wailsjs/go/app/App";
import { Category } from "../../models";

export const Categories = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    loadCategories();
    console.log("Re render");
  }, []);

  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = async () => {
    const response = (await LoadCategories(
      rowsPerPage,
      (page - 1) * rowsPerPage,
    )) as Category[];

    setCategories(response);
  };

  const handleCreateCategory = async () => {
    if (newCategory === "") {
      return;
    }
    const result = await CreateNewCategory(newCategory);
    setNewCategory("");
    loadCategories();
  };

  const handleEraseCategory = async (categoryId: number) => {
    const response = await EraseCategory(categoryId);
    if (response != "OK") {
      return;
    }
    loadCategories();
  };

  return (
    <AdminLayout title="Categories">
      <form onSubmit={handleCreateCategory}>
        <Input
          value={newCategory}
          aria-labelledby="Enter new Category name"
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
          placeholder="Enter new Category name"
        />
        <Button type="submit" className="mt-2" size="sm" color="primary">
          Add new category
        </Button>
      </form>
      <Table className="mt-4">
        <TableHeader>
          <TableColumn className="text-center">
            <span>ID</span>
          </TableColumn>
          <TableColumn className="text-center">
            <span>NAME</span>
          </TableColumn>
          <TableColumn className="text-center">
            <span>Edit</span>
          </TableColumn>
          <TableColumn className="text-center">
            <span className="text-center">Erase</span>
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent="No categories">
          {categories.map((category) => (
            <TableRow key={category.ID} className="text-center ">
              <TableCell>{category.ID}</TableCell>
              <TableCell>{category.Title}</TableCell>
              <TableCell>
                <Button className=" " size="sm" color="success">
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEraseCategory(category.ID)}
                  size="sm"
                  color="danger"
                >
                  Erase
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};
