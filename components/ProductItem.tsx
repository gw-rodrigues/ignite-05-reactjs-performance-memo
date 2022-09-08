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
    //vamos comparar as props recebidas (product)
    // Object.is(...) método de comparação custa pouco mais na performance, usado com cuidado, com dados ou componentes complexo.
    return Object.is(prevProps.product, nextProps.product);
  }
);
