# MVP-ARQ-SOF-PUC-FRONTEND

## Como rodar o projeto

docker build -t my-react-app .

docker run -p 80:80 my-react-app

## Sobre o componente externo

O componente externo é uma api pública da coin base que não exige cadastro nem autenticação e esta disponível no endereço:

https://api.coindesk.com/v1/bpi/currentprice.json

A api retorna um json contendo o preço do bitcoin em 3 moedas diferentes.
