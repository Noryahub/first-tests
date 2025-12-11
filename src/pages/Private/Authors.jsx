import { AuthorsTab } from "@/components/AuthorsTab";
import React from "react";

export const Authors = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-900">
          Gestion des Auteurs
        </p>
      </div>
      <div>
        <AuthorsTab />
      </div>
    </div>
  );
};

export default Authors;