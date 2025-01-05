# Rota e Cálculo de Custos de Combustível

Este projeto tem como objetivo calcular a rota entre dois pontos, estimar o consumo de combustível e o custo total da viagem. Utilizando a biblioteca [Leaflet](https://leafletjs.com/) para a visualização de mapas interativos e a API do OpenStreetMap para a geocodificação dos destinos, o projeto calcula a distância, o tempo de viagem, o combustível consumido e o custo baseado no preço por litro do combustível fornecido pelo usuário.

## Funcionalidades

- **Visualização da Rota**: O projeto exibe um mapa com a rota entre o ponto de partida (São Gonçalo) e o destino inserido pelo usuário.
- **Cálculo de Distância e Tempo**: Calcula a distância entre o ponto de partida e o destino e estima o tempo de viagem com base na distância.
- **Cálculo de Consumo e Custo**: Estima o consumo de combustível com base na distância e no consumo médio do veículo (10 km/l), além de calcular o custo da viagem de acordo com o preço por litro informado.
- **Geocodificação de Destinos**: O projeto utiliza a API do OpenStreetMap para converter o nome do destino em coordenadas geográficas.

## Tecnologias Utilizadas

- **HTML**, **CSS** e **JavaScript**
- **Leaflet.js** para visualização de mapas interativos
- **API Nominatim (OpenStreetMap)** para geocodificação de endereços

Este projeto é útil para quem deseja calcular o custo de uma viagem, considerando a distância, o tempo de viagem e o consumo de combustível, com um mapa interativo como base para as rotas.

Link do projeto:

https://iurirod93.github.io/calculex-route/
