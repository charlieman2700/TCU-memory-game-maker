import { Input, Button, Textarea } from "@nextui-org/react";
import { Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import {
  GetGameInfo,
  LoadAllCategories,
  EditGame as EditGameBE,
  GetCategoriesFromGame,
  AddTempImage,
  LoadTempImage,
} from "../../../../wailsjs/go/app/App";
import { AdminLayout } from "../../../layouts/AdminLayout";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const EditGame = () => {
  const params = useParams();
  const [files, setFiles] = useState<any>([]);

  const [gameTitle, setGameTitle] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");
  const [categories, setCategories] = useState<SelectProps["options"]>();
  const [selectedCategoriesIDs, setSelectedCategoriesIDs] = useState<number[]>(
    [],
  );

  const manageFileUpdate = (he: any) => {
    console.log(he);

    setFiles(he);
  };

  const navigator = useNavigate();
  useEffect(() => {
    getCategories();
    getGameInformation();
    getCategoriesFromGame();
  }, []);

  interface TempImage {
    type: string;
    bytes: Uint8Array;
  }

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
        <div>
          {/* Crear los metodos load, remove, .... que serviran para establecer un
comportamiento personalizado a las diferetnes etapas del procesamiento que utiliza filepond

La idea es establecer conexiones a diferentes metodos expuestos de wails (Hay que crearlos tambine)
que nos permitiran guardar la imagen en la base de datos

*/}
          <FilePond
            files={files}
            allowMultiple={false}
            server={{
              load: async (source, load, error, progress, abort, headers) => {
                // Should request a file object from the server here
                // Call golang for a file
                // ...
                const tempImage = (await LoadTempImage(source)) as TempImage;
                console.log("TEmpIma", tempImage);

                // Create a Blob from Uint8Array
                const blob = new Blob([tempImage.bytes], {
                  type: tempImage.type,
                });

                // Can call the error method if something is wrong, should exit after
                error("oh my goodness");

                // Can call the header method to supply FilePond with early response header string
                // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders

                // Should call the progress method to update the progress to 100% before calling load
                // (endlessMode, loadedSize, totalSize)
                progress(true, 0, 1024);

                // Should call the load method with a file object or blob when done
                // load(file);
                load(blob);

                // Should expose an abort method so the request can be cancelled
                return {
                  abort: () => {
                    // User tapped cancel, abort our ongoing actions here

                    // Let FilePond know the request has been cancelled
                    abort();
                  },
                };
              },

              process: async (
                fieldName,
                file,
                metadata,
                load,
                error,
                progress,
                abort,
                transfer,
                options,
              ) => {
                console.log(file);
                console.log(progress);
                //Aca tengo los bytes de la imagen
                const buffer = await file.arrayBuffer();
                const text = await file.text();
                const u = new Uint8Array(buffer);
                await AddTempImage(text, file.type);
                // console.log("bytes", `[{$u.}]`);

                progress(true, 100, 100);
                return {
                  abort: () => {
                    abort();
                  },
                };
              },
            }}
            name="files" /* sets the file input name, it's filepond by default */
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
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
