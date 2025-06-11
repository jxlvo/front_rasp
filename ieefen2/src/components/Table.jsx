import React, { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  var dayName = ["domingo", "seg", "ter", "qua", "qui", "sex", "sábado"];
  var now = new Date();
  var today = dayName[now.getDay()];

  const JSON_API_URL =
    "https://front-rasp-bhy7ou5fy-jxlvos-projects.vercel.app/horarios.json";
  const hour = new Date();
  const currentHour = hour.getHours();
  const currentMinute = hour.getMinutes();

  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;
  const updateInterval = 15000;

  // Buscar dados da API
  useEffect(() => {
    axios
      .get(JSON_API_URL)
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
      currentTime >= startTime - 300 &&
      currentTime < endTime
    );
  });

  filteredData.sort((a, b) => {
    const horarioA = a["HORÁRIO_INICIAL"];
    const horarioB = b["HORÁRIO_INICIAL"];

    if (horarioA < horarioB) {
      return -1;
    }
    if (horarioA > horarioB) {
      return 1;
    }
    return 0;
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
    <div className="table-container">
      <div className="c">
        <table id="schedule-table">
          <thead>
            <tr>
              <th>DISCIPLINA</th>
              <th>SALA</th>
              <th>PROFESSOR</th>
              <th>TURMA</th>
              <th>HORÁRIO INICIAL</th>
              <th>HORÁRIO FINAL</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user, index) => (
              <tr key={index}>
                <td>{user.DISCIPLINA}</td>
                <td>{user.SALA}</td>
                <td>{user.PROFESSOR}</td>
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
