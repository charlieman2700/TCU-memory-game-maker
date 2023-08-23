// import { SelectDatabase Greet} from "../wailsjs/go/main/App";

import { CreateDatabase, SetDatabase } from "../../wailsjs/go/main/App";

// 
export const SelectDatabase = () => {


  async function handleClickSetDatabae(){
    const result = await SetDatabase();
  }

  async function handleClickCreateDatabase(){
    const result = await CreateDatabase();
  }

  return (
    <div className="bg-secondary flex h-screen flex-col justify-center items-center">
      SelectDatabase
      <button onClick={handleClickSetDatabae}  className="bg-cyan-800 text-white rounded w-3/12 px-2">
        Select Database file
      </button>
      <button onClick={handleClickCreateDatabase }  className="bg-cyan-800 text-white rounded px-2">
        Create New Database file
      </button>
    </div>
  );
};
