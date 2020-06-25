import React, {useState, useEffect} from "react";
import api from '../src/services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: "conceitos-reactjs-app",
        url: "https://github.com/gabrielmendes151/conceitos-reactjs-app",
        techs: ["Spring Boot", "Flutter", "Electron"]
      });
    
    setRepositories([...repositories , response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const index = repositories.findIndex(repository => repository.id === id);
    repositories.splice(index, 1)
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          
          <li key={repository.id}>
            {repository.title}
  
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
