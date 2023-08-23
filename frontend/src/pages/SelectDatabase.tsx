// import { SelectDatabase Greet} from "../wailsjs/go/main/App";

import { SetDatabase } from "../../wailsjs/go/main/App";

// 
export const SelectDatabase = () => {


  async function handleClick(){
    const result = await SetDatabase();


  }

  return (
    <div className="bg-secondary flex h-screen flex-col justify-center items-center">
      SelectDatabase
      <button onClick={handleClick}  className="bg-cyan-800 text-white roudned px-2">
        Select Databse file
      </button>
    </div>
  );
};
