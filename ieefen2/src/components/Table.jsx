import React, { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/horarios_fen")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <div className="mt-3">
        <table id="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Disciplina</th>
              <th>Docente</th>
              <th>Horário</th>
              <th>Sala</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.disciplina}</td>
                  <td>{user.docente}</td>
                  <td>{user.horario}</td>
                  <td>{user.sala}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
