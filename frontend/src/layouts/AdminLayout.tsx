import { FC, useState } from "react";
import { AdminNavBar } from "../Components/AdminNavBar";
import { CreateNewCategory } from "../../wailsjs/go/app/App";

type Props = {
  children: React.ReactNode;
  title: string;
};

export const AdminLayout: FC<Props> = (props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminNavBar />

      <div className=" flex flex-1  flex-col bg-gray-100 px-4 py-4">
        <div className="flex-1 rounded-2xl bg-gray-50 px-2 py-2 shadow-sm">
          <h1 className="mb-2 text-3xl">{props.title}</h1>
          {props.children}
        </div>
      </div>
    </div>
  );
};
