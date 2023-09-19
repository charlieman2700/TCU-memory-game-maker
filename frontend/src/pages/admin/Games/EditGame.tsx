import { Input, Button, Textarea } from "@nextui-org/react";
import { Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetGameInfo,
  LoadAllCategories,
  EditGame as EditGameBE,
  GetCategoriesFromGame,
} from "../../../../wailsjs/go/app/App";
import { AdminLayout } from "../../../layouts/AdminLayout";

export const EditGame = () => {
  const params = useParams();

  const [gameTitle, setGameTitle] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");
  const [categories, setCategories] = useState<SelectProps["options"]>();
  const [selectedCategoriesIDs, setSelectedCategoriesIDs] = useState<number[]>(
    [],
  );

  const navigator = useNavigate();
  useEffect(() => {
    getCategories();
    getGameInformation();
    getCategoriesFromGame();
  }, []);

  async function getCategoriesFromGame() {
    try {
      const getCategories = await GetCategoriesFromGame(Number(params.id));
      const temp: number[] = [];
      for (let i = 0; i < getCategories.length; i++) {
        const cat = getCategories[i];
        temp.push(cat.ID);
      }

      setSelectedCategoriesIDs(() => [...temp]);
      console.log(selectedCategoriesIDs);
    } catch (error) {
      console.log(error);
    }
  }

  async function getGameInformation() {
    try {
      const gameInfo = await GetGameInfo(Number(params.id));
      setGameTitle(gameInfo.Title);
      setNewGameDescription(gameInfo.Description);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategories() {
    try {
      const categoriesFromBE = await LoadAllCategories();
      const temp: SelectProps["options"] = [];

      for (let i = 0; i < categoriesFromBE.length; i++) {
        const hello = categoriesFromBE[i];
        temp.push({
          label: hello.Title,
          value: hello.ID,
        });
      }
      setCategories(() => [...temp]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancelButton() {
    navigator("../");
  }

  async function handleEditGame(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await EditGameBE(
        Number(params.id),
        gameTitle,
        newGameDescription,
        selectedCategoriesIDs,
      );
      setGameTitle("");
      setNewGameDescription("");
      navigator("../");
    } catch (error) {
      setGameTitle("");
      return;
    }
  }

  return (
    <AdminLayout title="Games">
      <h1 className="text-2xl font-semibold">Edit Game</h1>

      <form className="mt-2 flex flex-col " onSubmit={handleEditGame}>
        <Input
          isRequired={true}
          label="Title"
          labelPlacement="outside"
          value={gameTitle}
          aria-labelledby="Enter new game title"
          onValueChange={setGameTitle}
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
          <span className="text-sm font-medium">Categories</span>
          <Select
            mode="multiple"
            value={selectedCategoriesIDs}
            allowClear
            options={categories}
            placeholder="Select categories"
            style={{ width: "100%" }}
            onChange={(value) => {
              setSelectedCategoriesIDs(value);
            }}
          />
        </div>
        <div className=" mt-5 flex  justify-end gap-2  ">
          <Button onClick={handleCancelButton} color="danger">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Edit Game
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};
