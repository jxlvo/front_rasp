import React, { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  var dayName = ["domingo", "seg", "ter", "qua", "qui", "sex", "sábado"];
  var now = new Date();
  var today = dayName[now.getDay()];

  const hour = new Date();
  const currentHour = hour.getHours();
  const currentMinute = hour.getMinutes();

  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 16;
  const updateInterval = 10000; // 5 segundos

  // Buscar dados da API
  useEffect(() => {
    axios
      .get("horarios.json")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar os dados:", err);
        setData([]);
      });
  }, []);

  // Filtrando os dados pelo dia da semana e horário atual
  const filteredData = data.filter((user) => {
    const [startHour, startMinute] = user["HORÁRIO_INICIAL"]
      .split(":")
      .map(Number);
    const [endHour, endMinute] = user["HORÁRIO_FINAL"].split(":").map(Number);

    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    const currentTime = currentHour * 60 + currentMinute;

    return (
      user["DIA_DA_SEMANA"].trim().toLowerCase() === today &&
      currentTime >= startTime -90  &&
      currentTime < endTime 
    );
  });

  // Atualização automática para alternar os grupos de dados
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => {
        const nextIndex = prev + itemsPerPage;
        return nextIndex >= filteredData.length ? 0 : nextIndex; // Volta para 0 se não houver mais itens suficientes
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [filteredData]);

  // Definindo o grupo de dados atual
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="container">
      <div className="mt-3">
        <table id="table">
          <thead>
            <tr>
              <th>PROFESSOR</th>
              <th>SALA</th>
              <th>DISCIPLINA</th>
              <th>TURMA</th>
              <th>HORÁRIO INICIAL</th>
              <th>HORÁRIO FINAL</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user, index) => (
              <tr key={index}>
                <td>{user.PROFESSOR}</td>
                <td>{user.SALA}</td>
                <td>{user.DISCIPLINA}</td>
                <td align="center">{user["TURMA"]}</td>
                <td align="center">{user["HORÁRIO_INICIAL"]}</td>
                <td align="center">{user["HORÁRIO_FINAL"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
