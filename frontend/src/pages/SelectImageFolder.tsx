import { Button } from "../Components/Button";
import {SelectImageFolder as SIF} from "../../wailsjs/go/main/App";

export const SelectImageFolder = () => {
  async function handleClickSetImageFolder() {
    console.log('asd');
    
    const result = await SIF()

  }
  return (
    <div className="flex h-screen flex-col  items-center  justify-center bg-secondary  ">
      <h1>Select Image Folder</h1>

      <Button onClick={handleClickSetImageFolder}>Select Image Folder</Button>
    </div>
  );
};
