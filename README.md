# Weather MCP
## MCP SERVIDOR DE TESTE

Um MCP Server de previsão do tempo e alertas meteorológicos usando a API do National Weather Service (NWS).
Inclui também um cliente de teste (testClient.ts) que consome o servidor via MCP.

### Pré-requisitos

- Node.js >= 18
- npm

Incluir no package.json:
```json
    "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "test:client": "ts-node src/testClient.ts"
    }
```

### Instalação

Clone o repositório e instale as dependências:
```bash

npm install

```

## Scripts
### Rodar o servidor MCP:
Compilar o TypeScript e inicia o servidor em modo desenvolvimento com:

``` bash

npm run dev

```

O servidor vai rodar usando index.ts (ou build/index.js depois da compilação).
Você verá no console algo como:

`MCP Server is now connected and waiting...`

### Testar com o cliente:

O cliente de teste (testClient.ts) sobe o servidor MCP, lista as ferramentas e chama os métodos get_alerts e get_forecast.

Execute utilizando:

```bash

npm run test:client

```

Saída esperada (exemplo):

``` yaml

    initialize OK
    tools/list: [ 'get_alerts', 'get_forecast' ]

    ALERTAS NO ESTADO DE NOVA YORK: 
    → get_alerts(Nova York):
    Active alerts for NY:

    Event: Rip Current Statement
    Area: Kings (Brooklyn); Southwest Suffolk; Southeast Suffolk; Southern Queens; Southern Nassau
    Severity: Moderate
    Status: Actual
    Headline: Rip Current Statement issued September 5 at 3:15PM EDT until September 6 at 8:00PM EDT by NWS Upton NY
    ---

    CLIMA NA CIDADE DE NOVA YORK:
    → get_forecast(Cidade de Nova York):
    Forecast for 40.7128, -74.006:

    This Afternoon:
    Temperature: 81°F
    Wind: 14 mph S
    Sunny
    ---
    Tonight:
    Temperature: 73°F
    Wind: 8 to 14 mph S
    Mostly Clear
    ---
    Saturday:
    Temperature: 81°F
    Wind: 7 to 17 mph S
    Slight Chance Rain Showers then Showers And Thunderstorms Likely
    ---
    Saturday Night:
    Temperature: 63°F
    Wind: 8 to 14 mph NW
    Showers And Thunderstorms Likely then Showers And Thunderstorms
    ---
    Sunday:
    Temperature: 69°F
    Wind: 9 mph NW
    Showers And Thunderstorms Likely then Chance Light Rain
    ---
    Sunday Night:
    Temperature: 60°F
    Wind: 9 mph NW
    Partly Cloudy
    ---

```

## Resumo dos comandos
Resumo dos comandos necessários para rodar o MCP de teste:
``` bash

npm install
npm run dev
npm run test:client

```

## Ferramentas disponíveis
→ get_alerts:

Obtém alertas meteorológicos para um estado dos EUA.

Argumentos: { state: "NY" }

Exemplo: get_alerts(NY)

→ get_forecast

Obtém a previsão do tempo para uma coordenada geográfica (EUA).

Argumentos: { latitude: 40.7128, longitude: -74.0060 }

Exemplo: get_forecast(40.7128,-74.0060) → Nova York

### Notas

A API weather.gov cobre apenas EUA e territórios.