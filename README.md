# k6 Load Tests

Este projeto configura um ambiente local para executar testes de carga em uma API de registro de usuários, utilizando InfluxDB e Grafana para monitoramento de desempenho. O setup utiliza Docker Compose para gerenciar os serviços.

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados na sua máquina:

- Docker
- Docker Compose

### Variáveis de Ambiente

Crie um arquivo `.env` no diretório raiz do projeto com as seguintes variáveis:

```plaintext

INFLUXDB_USERNAME=admin123
INFLUXDB_USERNAME=admin123
INFLUXDB_PASSWORD=admin123
GRAFANA_USERNAME=admin123
GRAFANA_PASSWORD=admin123

```

### Passos para Executar o Projeto

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/ventu-ra/k6.git
   cd k6
   ```

2. **Criar e configurar o arquivo `.env`:**

   ```bash
   touch .env
   ```

   Adicione as variáveis de ambiente necessárias conforme mencionado acima.

3. **Iniciar os serviços:**

   ```bash
   docker-compose up -d
   ```

   Este comando iniciará todos os serviços definidos no arquivo `docker-compose.yml` em modo desacoplado.

4. **Acessar os serviços:**

   - **API:** A API de registro de usuários estará acessível em `http://localhost:3333`.
   - **InfluxDB:** Por padrão, o InfluxDB não possui uma interface web exposta. Interaja com ele via API em `http://localhost:8086`.
   - **Grafana:** Acesse o Grafana em `http://localhost:3000`.

### Executar os Testes de Carga

Para executar os testes de carga utilizando k6, utilize o seguinte comando:

```bash
docker-compose run --rm k6 run /tests/exemplo.js
```

Este comando irá executar os testes de carga definidos no arquivo `exemplo.js` dentro do container k6 e enviar os resultados para o InfluxDB.

### Monitoramento e Testes

- **Dashboard do Grafana:** Configure seu dashboard do Grafana para monitorar as métricas coletadas pelo InfluxDB.
- **Testes de Carga com k6:** O serviço k6 está configurado para enviar os resultados dos testes de carga para o InfluxDB. Personalize e execute seus scripts k6 para realizar testes de carga na API.

### Parar os Serviços

Para parar e remover todos os serviços em execução, use:

```bash
docker-compose down
```

Isso irá parar todos os serviços e remover os containers.

### Solução de Problemas

Se você encontrar algum problema:

- Verifique se todas as variáveis de ambiente estão corretamente configuradas no arquivo `.env`.
- Verifique os logs do Docker para quaisquer mensagens de erro usando:

  ```bash
  docker-compose logs <nome_do_serviço>
  ```

- Verifique se as portas necessárias não estão sendo usadas por outras aplicações.

### Conclusão

Este setup fornece um ambiente completo para desenvolver, monitorar e testar a API de registro de usuários. Para quaisquer dúvidas ou suporte adicional, consulte a documentação do projeto ou entre em contato com os mantenedores do projeto.
