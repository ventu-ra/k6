# k6 Load Tests

Este projeto configura um ambiente local para executar testes de carga em uma API de registro de usuários, utilizando [K6](https://grafana.com/docs/k6/latest/), [InfluxDB](https://www.influxdata.com/) e Grafana para monitoramento de desempenho. O setup utiliza Docker Compose para gerenciar os serviços.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados na sua máquina:

- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Ambiente Recomendado

Este projeto foi desenvolvido utilizando o sistema Fedora, mas pode ser executado em outros sistemas operacionais, como:

- Qualquer distribuição Linux (Ubuntu, Debian, etc.)
- macOS
- Windows 10/11 (WSL 2 opcional)

Para garantir a compatibilidade e a melhor experiência, é recomendável utilizar um desses sistemas operacionais.

## Estrutura do Projeto

```plaintext
├── docker-compose.yml
├── grafana
│   └── datasource.yml
├── LICENSE
├── Makefile
├── README.md
├── script.sh
└── tests
    ├── exemplo.js
    ├── exemplo_k6.js
    └── teste.js
```

## Passos para Executar o Projeto

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/ventu-ra/k6.git
   cd k6
   ```

2. **Iniciar os serviços:**

   ```bash
   docker-compose up -d
   ```

   Este comando iniciará todos os serviços definidos no arquivo `docker-compose.yml` em modo desacoplado.

3. **Acessar os serviços:**

   - **API:** A API de registro de usuários estará acessível em `http://localhost:3333`.
   - **InfluxDB:** Por padrão, o InfluxDB não possui uma interface web exposta. Interaja com ele via API em `http://localhost:8086`.
   - **Grafana:** Acesse o Grafana em `http://localhost:3000`.

## Executar os Testes de Carga

Para executar os testes de carga utilizando k6, utilize o seguinte comando:

```bash
docker-compose run --rm -T k6 run -<tests/exemplo_k6.js --out influxdb=http://localhost:8086/db0
```

Este comando irá executar os testes de carga definidos no arquivo `exemplo.js` dentro do container k6 e enviar os resultados para o InfluxDB.

## Monitoramento e Testes

- **Dashboard do Grafana:** Configure seu dashboard do Grafana para monitorar as métricas coletadas pelo InfluxDB.
- **Testes de Carga com k6:** O serviço k6 está configurado para enviar os resultados dos testes de carga para o InfluxDB. Personalize e execute seus scripts k6 para realizar testes de carga na API.

## Parar os Serviços

Para parar e remover todos os serviços em execução, use:

```bash
docker-compose down
```

Isso irá parar todos os serviços e remover os containers.

## Solução de Problemas

Se você encontrar algum problema:

- Verifique os logs do Docker para quaisquer mensagens de erro usando:

  ```bash
  docker-compose logs <nome_do_serviço>
  ```

- Verifique se as portas necessárias não estão sendo usadas por outras aplicações.

## Conclusão

Este setup fornece um ambiente completo para desenvolver, monitorar e testar a APIs.
