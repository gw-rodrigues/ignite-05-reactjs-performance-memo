/**
 * Como funciona o Memo?
 *
 * (Shallow compare - comparação rasa)
 * {} === {} //false (sempre)
 * Igualdade de comparação - nao verifica dentro do objeto, mais sim, se estes objetos estão ocupando mesmo espaço memória.
 *  como da sempre false irá atualizar todos os componentes.
 *
 * !!! para isso temos que fornecer algumas propriedades !!!
 *
 *
 * Quando devo usar o Memo?
 * - Todas funcionalidades do react for usar prematura ou desnecessária pode torna mais lenta do que necessário.
 *  Porque o memo faz as comparações, as vezes o fluxo do react pode ser mais rápido.
 *
 * Posso usar, deve ser usado em:
 * 1. Pure Functional Components - funções puras (nao depende valores externos/apis/etc)
 *  - Dados mesmo parâmetros vai sempre devolver o mesmo resultado/html/etc.
 * 2. Renders to often - componentes que renderizam de mais, muitas vezes. Pode usar para evitar que renderizam.
 * 3. Re-renders with same props - Renderizam sempre com as mesmas props, em vez de componentes props diferentes.
 * 4. Medium to big size components - Médio para grandes componentes o Memo ganha elevada performance.
 *
 *
 * Como funciona no geral?
 *
 * - Só vai criar uma nova* versão desse componente se nenhum item foi alterado, através das verificações.
 *
 *
 * Quais formas de usar?
 *
 * - Existem duas forma de usar o memo:
 * 1. export const ProductItem = memo(({ product }: ProductItemProps) { ... })
 *
 * 2. function ProductItemComponent({ product }: ProductItemProps) { ... }
 *    //no final do ficheiro
 *    export const ProductItem = memo(ProductItemComponent)
 *
 */
import { memo, useState } from "react";

import lodash from "lodash";

/**
 * Lazy load
 *
 * Precisamos import componente
 * Precisamos import tipagens, se tiver
 * Recebe segundo parâmetro, para passar spinner ou algo gênero caso internet for lenta e demorar a carregar componente.
 */
import dynamic from "next/dynamic";
import { AddProductToWishlistProps } from "./AddProductToWishlist";

const AddProductToWishlistLazy = dynamic<AddProductToWishlistProps>(
  () => {
    // Caso o export do componente for default "export default function ..."
    // return import("./AddProductToWishlist");
    //Caso nao estiver a usar
    return import("./AddProductToWishlist").then(
      (mod) => mod.AddProductToWishlist
    );
  },
  {
    loading: () => <span>Carregando....</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted?: string;
    title: string;
  };
  onAddToWishlist: (id: number) => void;
}
export function ProductItemComponent({
  product,
  onAddToWishlist,
}: ProductItemProps) {
  const [isAddingToWishlist, setIsAddToWishlist] = useState(false);

  //Lazy loading in-line with function

  // async function showFormattedDate() {
  //   const { format } = await import("date-fns");
  //   format();
  // }

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddToWishlist(true)}>
        Adicionar aos Favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlistLazy
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    //vamos comparar as props recebidas (product)
    // Object.is(...) método de comparação custa pouco mais na performance, usado com cuidado, com dados ou componentes complexo.

    // commented to use lodash to get example to analyzer
    //return Object.is(prevProps.product, nextProps.product);

    /**
     * analyzer example
     *
     * Verificando se os dois parâmetros sao iguais comparando profundamente*
     *
     */
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
