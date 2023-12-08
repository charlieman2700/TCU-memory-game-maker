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

const maxVisibleCategoriesCount = 3;
type Category = {
  Title: string;
};

type Game = {
  ID: number;
  Title: string;
  Description: string;
  Categories: Category[];
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

    console.log(response);

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
    navigate(`edit/${id}`);
  }

  function handleAddGameButton() {
    navigate("newGame");
  }

  function renderCategories(game: Game) {
    if (game.Categories.length === 0) {
      return "";
    }
    let categoriesText = game.Categories[0].Title;

    for (
      let index = 1;
      index < game.Categories.length || index === maxVisibleCategoriesCount;
      index++
    ) {
      categoriesText += ", " + game.Categories[index].Title;
    }

    if (game.Categories.length > 3) {
      categoriesText += "...";
    }

    return categoriesText;
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
            <span>Categories</span>
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
                {game.Categories.length === 0 ? (
                  <span className="italic text-gray-400">No Categories</span>
                ) : (
                  <span className="text-gray-600">
                    {renderCategories(game)}
                  </span>
                )}
              </TableCell>
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
