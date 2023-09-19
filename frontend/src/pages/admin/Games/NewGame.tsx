import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreateNewGame,
  LoadAllCategories,
  LoadCategories,
} from "../../../../wailsjs/go/app/App";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { Category } from "../../../models";

export const NewGame = () => {
  const navigate = useNavigate();

  const [newGameName, setNewGameName] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  });
  async function getCategories() {
    try {
      const categories = await LoadAllCategories();
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancelButton() {
    navigate("../");
  }

  async function handleCreateNewGame(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let response = null;
    try {
      response = await CreateNewGame(newGameName, newGameDescription);
    } catch (error) {
      setNewGameName("");
      return;
    }
    setNewGameName("");
    setNewGameDescription("");
  }

  return (
    <AdminLayout title="Games">
      <h1 className="text-2xl font-semibold">New Game</h1>

      <form className="mt-2 flex flex-col " onSubmit={handleCreateNewGame}>
        <Input
          isRequired={true}
          label="Title"
          labelPlacement="outside"
          value={newGameName}
          aria-labelledby="Enter new game title"
          onValueChange={setNewGameName}
          type="text"
          placeholder="Enter new Category name"
        />
        <Textarea
          value={newGameDescription}
          onValueChange={setNewGameDescription}
          label="Description"
          labelPlacement="outside"
          placeholder="Enter game description"
          className="mt-2"
        />
        <div className="mt-2">
          <Select
            label="Category"
            items={categories}
            isMultiline={true}
            labelPlacement="outside"
            placeholder="Select a category"
            selectionMode="multiple"
            renderValue={(items) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {
                    items.length === 0 ?
                    <Chip>None</Chip>
                    :
                    items.map((item) => (
                    <Chip key={item.data?.ID}>{item.data?.Title || "Unde"}</Chip>
                  ))}
                </div>
              );
            }}
          >
            {categories.map((category) => (
              <SelectItem key={category.ID} value={category.ID}>
                {category.Title}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className=" mt-5 flex  justify-end gap-2  ">
          <Button onClick={handleCancelButton} color="danger">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add new Game
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};
