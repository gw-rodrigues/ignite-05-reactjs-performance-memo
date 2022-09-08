/**
 * Como funciona o Memo?
 * (Shallow compare - comparação rasa)
 * {} === {} //false (sempre)
 * Igualdade de comparação - nao verifica dentro do objeto, mais sim, se estes objetos estão ocupando mesmo espaço memória.
 *  como da sempre false irá atualizar todos os componentes.
 *
 * !!! para isso temos que fornecer algumas propriedades
 *
 *
 *
 * - Só vai criar uma nova* versão desse componente se nenhum item foi alterado, através das verificações.
 *
 * Existem duas forma de usar o memo:
 * 1. export const ProductItem = memo(({ product }: ProductItemProps) { ... })
 *
 * 2. function ProductItemComponent({ product }: ProductItemProps) { ... }
 *    //no final do ficheiro
 *    export const ProductItem = memo(ProductItemComponent)
 */
import { memo } from "react";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
}
export function ProductItemComponent({ product }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    // Object.is(...) método de comparação custa pouco mais na performance, usado com cuidado, com dados ou componentes complexo.
    return Object.is(prevProps, nextProps);
  }
);
