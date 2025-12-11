import { UsersTab } from "@/components/UsersTab";
import React from "react";

export const Users = () =>{
    return(
         <><div className="flex flex-col gap-6">
            <div>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-900">
                Utilisateurs connectes
            </p>
            </div>
            <div>
                <UsersTab/>
            </div>
        </div></>
    );
}
export default Users;









