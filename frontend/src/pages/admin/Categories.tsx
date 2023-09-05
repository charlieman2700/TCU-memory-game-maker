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
import { useEffect, useState } from "react";
import {
  CreateNewCategory,
  EraseCategory,
  LoadCategories,
} from "../../../wailsjs/go/app/App";

type Category = {
  ID: number;
  Title: string;
};

export const Categories = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    loadCategories();
  }, []);

  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = async () => {
    const response = await LoadCategories(
      rowsPerPage,
      (page - 1) * rowsPerPage,
    );
    const responseParsed: Category[] = await JSON.parse(response);
    setCategories(responseParsed);
    console.log("setted", categories);
  };

  const onNewCategory = async () => {
    console.log("asdf");
    if (newCategory === "") {
      return;
    }
    console.log(newCategory);
    const result = await CreateNewCategory(newCategory);
    console.log(result);
    setNewCategory("");
    loadCategories();
  };

  const handleEraseCategory = async (categoryId: number) => {
    alert("asd")
    const response = await EraseCategory(categoryId);
    if (response != "OK") {
      return;
    }
    loadCategories();
  };
  // const pages = Math.ceil(users.length / rowsPerPage);
  //

  return (
    <AdminLayout title="Categories">
      <Input
        value={newCategory}
        aria-labelledby="Enter new Category name"
        onChange={(e) => setNewCategory(e.target.value)}
        type="text"
        placeholder="Enter new Category name"
      />
      <Button
        onClick={onNewCategory}
        className="mt-2"
        size="sm"
        color="primary"
      >
        Add new category
      </Button>
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

                  size="sm" color="danger">
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
