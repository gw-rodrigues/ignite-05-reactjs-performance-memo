import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}
export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div>
      {results.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
}
/**
 * 1. Criar uma nova versão do componente - acontece sempre que um componente pai atualizar os componentes filhos iram atualizar/render.
 * 2. Comparar com a versão anterior.
 * 3. Se houverem alterações, vai atualizar o que foi alterado.
 */
