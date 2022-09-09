import type { NextPage } from "next";
import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault(); //evitar que atualize a página

    if (!search.trim()) {
      //verifica search está vazio incluindo espaço em branco.
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data);
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []); //se a função depende so parâmetro que esta recebendo ex: id, o array [] pode ficar vazio

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <SearchResults results={results} onAddToWishlist={addToWishlist} />
    </div>
  );
};

export default Home;
