import React, { useState, useEffect } from "react";
import axios from "axios";


export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("https://pokeapi.co/api/v2/ability");
      setData(res.data.results);
      setFilteredData(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((value) =>
      value.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search abilities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((ability, index) => (
            <tr key={index}>
              <td>
                <a href={ability.url}>{ability.name}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
