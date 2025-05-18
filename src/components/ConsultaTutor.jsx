import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

function ConsultaTutor() {
  const [grupo, setGrupo] = useState("");
  const [fecha, setFecha] = useState("");
  const [datos, setDatos] = useState([]);

  const buscar = async () => {
    if (!grupo || !fecha) return;
    try {
      const snapshot = await getDocs(collection(db, `asistencias/${grupo}/${fecha}`));
      const datosObtenidos = snapshot.docs.map((doc) => doc.data());
      setDatos(datosObtenidos);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Consulta de Asistencias</h2>
      <input
        type="text"
        placeholder="Grupo"
        value={grupo}
        onChange={(e) => setGrupo(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={buscar} className="bg-blue-500 text-white px-4 py-2 rounded">
        Consultar
      </button>
      <ul className="mt-4">
        {datos.map((item, index) => (
          <li key={index} className="border-b py-1">
            {item.nombre} - {item.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConsultaTutor;