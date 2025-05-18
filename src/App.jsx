import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import PanelDocente from "./components/PanelDocente";
import ConsultaTutor from "./components/ConsultaTutor";

function App() {
  const [tipoUsuario, setTipoUsuario] = useState(null);

  if (!tipoUsuario) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Selecciona tu rol</h1>
        <button onClick={() => setTipoUsuario("docente")} className="mb-4 bg-blue-600 text-white px-6 py-2 rounded">Docente</button>
        <button onClick={() => setTipoUsuario("tutor")} className="bg-green-600 text-white px-6 py-2 rounded">Tutor</button>
      </div>
    );
  }

  return tipoUsuario === "docente" ? <LoginForm /> : <ConsultaTutor />;
}

export default App;
