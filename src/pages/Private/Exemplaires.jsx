import { ExemplairesTab } from "@/components/ExemplairesTab";
import React from "react";

export const Exemplaires = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-900">
          Gestion des Exemplaires
        </p>
      </div>
      <div>
        <ExemplairesTab />
      </div>
    </div>
  );
};

export default Exemplaires;