# Rota de Viagem #

Um turista deseja viajar pelo mundo pagando o menor preço possível independentemente do número de conexões necessárias.
Vamos construir um programa que facilite ao nosso turista, escolher a melhor rota para sua viagem.

Para isso precisamos inserir as rotas através de um arquivo de entrada.

## Input Example ##
```csv
GRU,BRC,10
BRC,SCL,5
GRU,CDG,75
GRU,SCL,20
GRU,ORL,56
ORL,CDG,53
ORL,CDG,8
SCL,ORL,20
```

## Explicando ## 
Caso desejemos viajar de **GRU** para **CDG** existem as seguintes rotas:

1. GRU - BRC - SCL - ORL - CDG ao custo de **$53**
2. GRU - ORL - CGD ao custo de **$64**
3. GRU - CDG ao custo de **$75**
4. GRU - SCL - ORL - CDG ao cusdo de **$48**

O melhor preço é da rota **4** logo, o output da consulta deve ser **CDG - SCL - ORL - CDG**.

### Execução do programa ###
A execução do programa se dará por linha de comando onde o primeiro argumento do programa será o arquivo de rotas a ser carregado e, o segundo argumento será a rota a ser calculada.

```shell
$ mysolution input-routes.csv GRU-CGD
  best route: CDG - SCL - ORL - CDG
```

## Recomendações ##
Para uma melhor fluides da nossa conversa, atente-se aos seguintes pontos:

* Estruture sua aplicação como se produtiva fosse,
* Permita evoluções na solução para discussão nos próximos passos,
* Evite o uso de frameworks ou bibliotecas externas à linguagem,
* Implemente testes unitários,
* Descreva de forma macro, como sua aplicação está estruturada. Somente texto é o suficiente,
* Descreva como executar o programa.