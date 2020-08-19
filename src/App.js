import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Titulo do Sistema ${Date.now()}`,
      url: "http://www.tearea.com",
      techs: ["Node", "Express", "TypeScript"],
    };

    const response = await api.post("repositories", repository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    const repositoryIndex = repositories.findIndex((resp) => resp.id === id);
    const newRepositories = [...repositories];
    newRepositories.splice(repositoryIndex, 1);
    setRepositories([...newRepositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
