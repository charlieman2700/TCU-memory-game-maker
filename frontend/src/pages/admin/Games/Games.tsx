import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EraseGame, LoadGames } from "../../../../wailsjs/go/app/App";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { cleanLongTexts } from "../../../utils";

type Game = {
  ID: number;
  Title: string;
  Description: string;
};

export const Games = () => {
  const navigate = useNavigate();

  useEffect(() => {
    loadGames();
    console.log("Re render");
  }, []);

  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  async function loadGames() {
    const response = (await LoadGames(
      rowsPerPage,
      (page - 1) * rowsPerPage,
    )) as Game[];

    setGames(response);
  }

  async function handleEraseGame(id: number) {
    try {
      await EraseGame(id);
      loadGames();
    } catch (error) {
      console.log(error);
    }
  }
  function handleEditGame(id: number) {
    // TODO:  Implement edit game
    console.log(id);
  }

  function handleAddGameButton() {
    navigate("newGame");
  }


  return (
    <AdminLayout title="Games">
      <Table className="mt-4">
        <TableHeader>
          <TableColumn className="text-center">
            <span>Title</span>
          </TableColumn>
          <TableColumn className="text-center">
            <span>Description</span>
          </TableColumn>
          <TableColumn className="text-center">
            <span>Edit</span>
          </TableColumn>
          <TableColumn className="text-center">
            <span className="text-center">Erase</span>
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent="No Games yet">
          {games.map((game) => (
            <TableRow key={game.ID} className="text-center ">
              <TableCell>{game.Title}</TableCell>
              <TableCell>{cleanLongTexts(game.Description)}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditGame(game.ID)}
                  size="sm"
                  color="success"
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEraseGame(game.ID)}
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
      <Button
        onClick={handleAddGameButton}
        type="submit"
        className="ml-auto mt-2 flex self-end "
        size="md"
        color="primary"
      >
        Add new Game
      </Button>
    </AdminLayout>
  );
};
