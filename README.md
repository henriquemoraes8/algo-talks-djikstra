# README

Esse projeto foi criado como parte do processo de entrevista para BEXS

## Especificações

* Linguagem: Javascript
* Execução: linha de comando
* IDE: WebStorm

## Configurações e dependências

O projeto se mantém simples sem nenhuma library de dependência

## Modelos

Para melhor manipular os dados em questão, algumas classes foram criadas:

* Vertex: representa um vértice do grafo de aeroportos. ele possui um custo e um endpoint que seria 
o destino.

* Node: representa um node no grafo durante o processamento. Diferente do *Vertex*, um Node também guarda o caminho
visitado até o presente momento junto com o custo mínimo do ponto de partida.

## Cálculo da rota mais eficiente

Para calcularmos a rota devemos levar alguns fatores em consideração:

* Aeroportos são representados exclusivamente por letras maiúsculas

* O documento de leitura possui uma possível rota por linha

* Os aeroportos e custos são sempre representados separados por vírgula

* custos são sempre positivas

* As rotas são bidirecionais

O cálculo da rota mais eficiente é um típico problema de encontrar o caminho mais curto 
em um grafo cujas arestas possuem um peso. O algorítmo mais adequado para essa situação é o de Dijkstra. O algorítimo é 
executado da seguinte maneira:

* Começamos pela localização do candidato

* Criamos um hash com todos os nomes de aeroportos mapeando para o valor do menor custo do ponto de partida. Inicializamos o 
local de partida como custo 0 e os demais com custo infinito

* Mantemos uma array `seen` dos nodes que ja processamos e não precisam ser revisitados

* Utilizado as classes `Node` e `PriorityQueue` que serão discutidas abaixo, colocamos o primeiro node (aeroporto) no queue.

* Enquanto o queue não estiver vazio:

    * Popar o primeiro node com menor custo total
    
    * Para cada caminho com endpoint não visitado ligando a esse node, verifique se o custo mínimo ao endpoint é maior
    que a custo do node atual + o custo do caminho. Se sim, atualizamos o custo minimo ao endpoint e o caminho atual
    baseado no último node
    
    * Marcar o node atual como visto. 
    
    * Se o node visto é o local do destino, quebramos o ciclo e retornamos o node com o custo total a ele e o caminho. Caso contrário repetimos o processo

### Node

Utilizamos uma classe Node para conseguir trabalhar o progresso do algoritmo:
```cassandraql
{ cost: Int, location: String, path: String }
```

O Node implementa `prototype.valueOf` de uma forma que o Node com custo menor deva ser priorizado. Implementando dessa forma
nos permite sempre poparmos o melhor node do `PriorityQueue` e executarmos o algorítmo de forma gananciosa. Essa implementação é
análoga a implementar `Comparable` em algumas outras linguagens

### Priority Queue

Utilizamos um heap binário para o melhor aproveitamento de performance. O heap implementa 3 metodos:

* push para adicionar um objeto

* pop para retirar um objeto priorizado

* length para saber o tamanho do queue

O método de implementação escolhido visa simplicidade e eficiência. Embora não existe uma estrutura de dados para referenciar
os branches da árvore, podemos facilmente simular o heap binário com uma array onde, dado um Node em *index*, seu branch esquerdo 
estará em *index * 2* e o direito estará em *index * 2 + 1* e que sempre um child será menor que seu parent. Assim, sempre teremos
o node com menor custo possível na raiz

O heap binário possui no pior caso uma performance *O(log n)* já que no máximo um objeto deve atravessar a altura da árvore completa. 
Então quando adicionamos um objeto ao queue, vamos recursivamente subindo esse Node na árvore até o pai imediato ser maior
ou ele chegar na raiz.

Similarmente, ao popar um objeto, nós trocamos o último item com o primeiro (garantido ser o maior elemento) e popamos esse elemento 
do queue. Depois, recursivamente descemos o primeiro Node na árvore até ele ser imediatamente maior que os filhos ou chegar ao fim da árvore

Note que a implementação de `valueOf` sendo o valor negativo do custo nos permite que o `PriorityQueue` priorize o menor valor
ao invés do maior

### Complexidade

Considerando um grafo totalmente conectado:

Para evitar o consumo de memória no stack de chamadas de métodos, preferimos uma solução iterativa ao invés de recursiva.

O loop continua enquanto ainda temos vértices para visitar, e para cada vértice devemos comparar os caminhos (arestas). 
Considerando o total de Locais *L* e o total de caminhos bidirecionais *C* nós temos uma execução de *O(L + C)*. Note
que no algoritmo nos não processamos arestas de locais ja visitados e por isso a complexidade não se multiplica.

Porém, devemos considerar tambem o processamento do heap binário que é executado dentro do loop, dando uma complexidade
total de 

`O((L + C) log L)`

Obviamente ainda temos heurísticas implementadas para cessar o loop assim que o destino for marcado como visitado, evitando 
assim o processamento do grafo inteiro

### Error handling

O programa implementa algumas safeguards para processar corretamente, são elas:

* Se `start` ou `end` não existem no grafo, uma Exception é emitida

* Processamos um aeroporto com um regex para evitar espaços em branco ou caracteres indevidos

* Processamos um custo com um regex para evitar espaços em branco ou caracteres indevidos

* Se não houver um caminho do início até o destino, um Exception é gerado com mensagem adequada

* Como apenas depois de processar todos os nodes nós o marcamos como visto, múltiplas rotas iguais com
custos diferentes não afetará a capacidade do programa de encontrar o caminho mais eficiente

### Testes

Como está especificado para não utilizar nenhuma library, os testes foram implementados manualmente com logs
no console. O escopo dos testes se limitam à validação de modelos e tratamento da rota mais eficiente.

Para rodar os testes basta executar

`node bexs-route-finder.test`

Alguns cases testados:

* Validação do modelo `Vertex`
* Validação do modelo `Node`
* Validação de melhores rotas no grafo original
* Validação de melhores rotas caso a rota seja a mesma mas possui diferentes custos. Análogo a cotar com diferentes
companhias aéreas
* Validação caso o destino final seja igual ao inicial
* Tratamento de erro caso não exista um ponto de partida
* Tratamento de erro caso não exista um destino final
* Tratamento de erro caso não exista uma rota entre o ponto de partida e o destino final

### Execução

Para executar o programa, basta entrar no diretório pela linha de comando e executar

`node bexs-route-finder <input-file.txt> <start> <end>`

O primeiro argumento é o nome do arquivo com as rotas, o segundo seria o ponto de partida e o terceiro
é o destino

