import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateNewGame } from "../../../../wailsjs/go/app/App";
import { AdminLayout } from "../../../layouts/AdminLayout";

export const NewGame = () => {
  const navigate = useNavigate();

  const [newGameName, setNewGameName] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");

  const handleCancelButton = () => {
    navigate("../");
  };
  const handleCreateNewGame = () => {
    //TODO: Implement create new game

    
    console.log(newGameName, newGameDescription)
    setNewGameName("");
    setNewGameDescription("");
  };

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
