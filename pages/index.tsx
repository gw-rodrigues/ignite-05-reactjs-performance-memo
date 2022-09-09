import type { NextPage } from "next";
import {
  FormEvent,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { SearchResults } from "../components/SearchResults";

type Product = {
  id: number;
  price: number;
  priceFormatted?: string;
  title: string;
};

interface ProductsResultsProps {
  products: Array<Product>;
  totalPrice: number;
}

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ProductsResultsProps>({
    totalPrice: 0,
    products: [],
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault(); //evitar que atualize a página

    if (!search.trim()) {
      //verifica search está vazio incluindo espaço em branco.
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    /**
     * GERALMENTE A FORMATAÇÃO CÁLCULOS DOS DADOS E FEITO NA HORA DA BUSCA!
     * no momento busca info enviar ficar criando useMemo, etc...
     */
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    const products = data.map((product: Product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });
    const totalPrice = data.reduce((total: number, product: Product) => {
      return total + product.price;
    }, 0);
    /**
     * ----------------------------------------------------------------------
     */

    setResults({ totalPrice, products });
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
      <SearchResults
        results={results.products}
        totalPrice={results.totalPrice}
        onAddToWishlist={addToWishlist}
      />
    </div>
  );
};

export default Home;
