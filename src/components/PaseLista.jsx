import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  Timestamp
} from "firebase/firestore";

function PaseLista({ grupo }) {
  const [alumnos, setAlumnos] = useState([]);
  const [asistencias, setAsistencias] = useState({});
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const obtenerAlumnos = async () => {
      const snapshot = await getDocs(collection(db, `grupos/${grupo}/alumnos`));
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAlumnos(lista);
    };
    obtenerAlumnos();
  }, [grupo]);

  const guardarAsistencias = async () => {
    for (const alumno of alumnos) {
      const estado = asistencias[alumno.id] || "Ausente";
      await setDoc(doc(db, `asistencias/${grupo}/${fecha}`, alumno.id), {
        nombre: alumno.nombre,
        estado,
        timestamp: Timestamp.now()
      });
    }
    alert("Asistencia guardada correctamente.");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pase de Lista - Grupo {grupo}</h2>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="border p-2 mb-4"
      />
      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno.id} className="mb-2">
            {alumno.nombre}
            <select
              className="ml-4 border p-1"
              value={asistencias[alumno.id] || "Ausente"}
              onChange={(e) =>
                setAsistencias((prev) => ({
                  ...prev,
                  [alumno.id]: e.target.value
                }))
              }>
              <option value="Presente">Presente</option>
              <option value="Ausente">Ausente</option>
              <option value="Justificada">Justificada</option>
            </select>
          </li>
        ))}
      </ul>
      <button
        onClick={guardarAsistencias}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Guardar Asistencia
      </button>
    </div>
  );
}

export default PaseLista;