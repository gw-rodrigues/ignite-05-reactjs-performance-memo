import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
  onAddToWishlist: (id: number) => void;
}
export function SearchResults({
  results,
  onAddToWishlist,
}: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);

  // <Component totalPrice={} />

  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        );
      })}
    </div>
  );
}
/**
 * 1. Criar uma nova versão do componente - acontece sempre que um componente pai atualizar os componentes filhos iram atualizar/render.
 * 2. Comparar com a versão anterior.
 * 3. Se houverem alterações, vai atualizar o que foi alterado.
 *
 *
 *  useMemo / useCallback
 *
 * useMemo - evitar que alguma coisa que ocupe muito processamento, seja refeito todas vez que este componente renderizar ou componentes filhos. (memorizar cálculos, valor,etc)
 *  - usar para memorization para nao re-calcular este valor, processamento/cálculo pesado, NAO use para cálculos/coisas simples.
 *  - pode ser utilizado, também, em igualdade referencial - comparação de variável, quando:
 *      a variável "totalPrice" criado sem* useMemo e passada para um componente filho, é criado novo ponto/espaço na memória, assim renderizando novamente.
 *      quando utilizamos useMemo evita essa duplicação, mantendo sempre a reference que foi criado primeiramente na memória.
 *
 * useCallback - memorizar um função, nao um valor. (por igualdade referencial)
 * - Todas as vezes que página, variáveis alterarem vai re-criar todas as funções/componentes do zero.
 *  !importante quando um função vai/é repassada para os componentes filhos (ex: addToWishlist() - index.tsx ), o *primeiro componente que é  o filho (e até o pai)
 *   que recebe vai ser renderizado do zero, fazendo assim todos os filhos do primeiro filho, ser renderizado também, que receberam as funções.
 *  -- Também va-le para as funções - useContext*
 */
