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
     * useCallback | useMemo
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

/**
 * Dividindo código (Code-Splitting) - React lazy | Next/dynamic
 * reactjs.org/docs/code-splitting.html
 *
 * - a funcionalidade ou poder que temos de importar algum arquivo, funcionalidade, componente somente quando for usado, no bundle. (bundle.js ou build.js)
 * - ? bundle.js - tem todas as configurações da nossa app (Next js ve todas as configurações, importações e coloca bundle.js).
 *
 *  - Fazer o carregamento "Lazy loading" fazer so carregamento do componente* apenas quando for exibido em tela, aplicação.
 *  - dynamic from 'next/dynamic' - funciona next ou qualquer app react (react: {lazy} from "react")
 *
 */

/**
 *      Bundle Analyzer
 * !!! usado/analisado antes de colocar o app para produção, para ver quanto importações/pacotes estão impactar na nossa app!
 *
 *  github -> yarn add @next/bundle-analyzer
 *
 * - Vamos analisar o que biblioteca pode e irá fazer nossa app ficar lenta, pesada para carregar se nao for usado corretamente.
 * -- tipo o lodash*
 *
 *  CRIAR e ADD no ficheiro na raiz app - next.config.js
 *
 *   const withBundleAnalyzer = require('@next/bundle-analyzer')({
 *     enabled: process.env.ANALYZE === 'true',
 *   })
 *   module.exports = withBundleAnalyzer({})
 *
 *
 *  EXECUTAR
 * # Analyze is done on build when env var is set
 *   ANALYZE=true yarn build
 */
