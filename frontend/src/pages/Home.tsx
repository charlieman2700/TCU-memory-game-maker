import React from "react";
import { Link } from "react-router-dom";
import { LogoSplash } from "../Components/LogoSplash";

export const Home = () => {
  return (
    <div className="bg-secondary flex flex-col h-screen items-center justify-center">
      <div className="w-96">

      <LogoSplash />
      </div>
      <Link
        className="hover:cursor-pointer mt-4 text-white bg-cyan-800 w-[24rem]  py-1 text-center rounded hover:bg-cyan-500 transition-all"
        to="/selectDatabase"
      >
        Start
      </Link>

      {/* <img src={logo} id="logo" alt="logo"/> */}
      {/* <div id="result" className="result">{resultText}</div> */}
      {/* <div id="input" className="input-box"> */}
      {/*     <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/> */}
      {/*     <button className="btn" onClick={greet}>Greet</button> */}
      {/* </div> */}
    </div>
  );
};
