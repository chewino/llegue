import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import PaseLista from "./PaseLista";

function PanelDocente() {
  const [grupos, setGrupos] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerGrupos = async () => {
      const snapshot = await getDocs(collection(db, "grupos"));
      const lista = snapshot.docs.map((doc) => doc.id);
      setGrupos(lista);
    };
    obtenerGrupos();
  }, []);

  if (grupoSeleccionado) return <PaseLista grupo={grupoSeleccionado} />;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Panel del Docente</h2>
      <ul>
        {grupos.map((grupo) => (
          <li key={grupo}>
            <button
              className="text-blue-600 underline"
              onClick={() => setGrupoSeleccionado(grupo)}>
              {grupo}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PanelDocente;