## Pré-requisitos

- Node.js (versão 20.11.0)
- Docker (versão 26.1.1)

## Configuração do Frontend

1. Acesse a pasta do frontend:

    ```bash
    cd frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Verifique se no arquivo `.env` está com a variavel correta apontando para o backend.

4. Execute o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

5. O frontend estará disponível em `http://localhost:3000`.

## Configuração do Backend

1. Acesse a pasta do backend:

    ```bash
    cd backend
    ```

2. Crie um arquivo `.env` com as variáveis de ambiente necessárias (consulte `.env.example` para um exemplo).

3. Construa e inicie os contêineres Docker:

    ```bash
    docker-compose up --build
    ```

4. O backend estará disponível em `http://localhost:4000`.

## Scripts Úteis

### Frontend

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Cria a build de produção.
- `npm start`: Inicia o servidor em modo de produção.

### Backend

- `docker-compose up`: Inicia os serviços definidos no `docker-compose.yml`.
- `docker-compose down`: Para e remove os contêineres.
- `npm run build && npm run start`: Inicia o servidor Node.js fora do Docker (útil para desenvolvimento local).
