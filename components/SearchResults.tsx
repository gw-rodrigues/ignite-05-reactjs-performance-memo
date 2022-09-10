//import { useMemo } from "react";
import { List, ListRowRenderer } from "react-virtualized";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    priceFormatted?: string;
    title: string;
  }>;
  totalPrice: number;
  onAddToWishlist: (id: number) => void;
}
export function SearchResults({
  results,
  totalPrice,
  onAddToWishlist,
}: SearchResultsProps) {
  // MOVIDO FORMATAÇÃO - MELHORIA, NAO EXECUTAR SEMPRE CÁLCULO
  //   const totalPrice = useMemo(() => {
  //     return results.reduce((total, product) => {
  //       return total + product.price;
  //     }, 0);
  //   }, [results]);

  // <Component totalPrice={} />

  /**
   * CRIANDO rowRenderer do virtualization
   *
   * Que vai retornar o componente anterior, criado. No componente usamos a variável recebida dos props e aplicar index do virtualization "results[index]"
   * !!! sempre deve ter <div> por volta item/componente que será retornado.
   *   --- <div> receberá duas propriedades:
   *   ----- key - identificador único
   *   ----- style - é quem vai controlar se o elemento está, estará ou nao visível em tela.
   *
   */
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>
      {/**
       * VIRTUALIZATION - quando formos usar, terá de usar:
       * height - tamanho lista (existe do import o autoSizer - para automaticamente definir)
       * rowHeight - tamanho linha
       * width - largura
       * overscanRowCount - quantos items pré-carregados (para baixo ou para cima) antes ou depois da lista que está visível na tela/browser
       * rowCount - quanto items tem a lista
       * rowRenderer -  função que vai renderizar cada um dos items da lista (podemos usar tipagem importando "ListRowRenderer")
       *
       */}

      <List
        height={300}
        rowHeight={25}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/**
       * old code
       */
      /* {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          /> 
        );
      })} */}
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
 *
 *
 *
 * Virtualização - Virtualization (Permite que mostre em tela, no html, somente items que estão visíveis no tela/browser do user)
 * - Quando user tem muita informação nao tela que nao irá ver, maior parte dela, como um scroll de 1000 items. Maior parte dos items nao serão vistos.
 * -- Existem várias bibliotecas para fazer esse processo.
 * -- vamos user "react-virtualized"
 * --- importar as tipagens "yarn add @types/react-virtualized -D" , se nao irá dar erro.
 */
