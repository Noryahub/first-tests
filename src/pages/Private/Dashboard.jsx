import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { StatsCards } from "./StatsCards";
import { AlarmClock, BookCopy, Clock9, FileStack, Users } from "lucide-react";
import { UsersTab } from "@/components/UsersTab";
import { BooksTab } from "@/components/BooksTab";
import BasicBars from "@/components/BarCharts";
import { AuthContext } from "@/context/ExpressAuthContext";
import {ExemplairesTab} from "@/components/ExemplairesTab"
export const Dashboard = () =>{
  // Récupération de l'utilisateur courant depuis le contexte de express
  const { user, loading } = React.useContext(AuthContext);
  //const [userStats, setUserStats] = useState
  console.log("DASHBOARD", user, loading)
    return(
      <><div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
        
        <h1 className="text-xl font-bold">Hello, <span className="text-sky-500">{user?.nom}</span>!</h1><p>Jan 12,2025 |Thursday, 12:00 PM</p>
        </div>
      </div><div className="flex flex-wrap gap-4 py-4">
          <StatsCards title="Utilisateurs totals" amount="10400" icon={<Users size={20} />} />
          <StatsCards title="Livre Emprunté" amount="1632" icon={<FileStack size={20} />} />
          <StatsCards title="Livre En Stock" amount="5020" icon={<BookCopy size={20} />} />
          <StatsCards title="Retards" amount="3252" icon={<AlarmClock size={20} />} />
        </div>
        <div className=" flex flex-row gap-4 py-4 w-full">
          <div className="w-180">
          <UsersTab />
          </div>
          <div className="w-180">
            <BooksTab />
          </div>
        </div>
        <div className="flex flex-row w-full py-4">
          <div className="w-1/2 pr-2"><ExemplairesTab/></div>
          <div className="w-1/2 "><BasicBars /></div>
        </div>
        </>
    );
}
export default Dashboard;