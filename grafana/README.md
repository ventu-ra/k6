# Configuração do Grafana - Influxdb

Este documento explica como configurar o Grafana para monitorar os dados coletados pelo InfluxDB.

## Acessar o Grafana

1. **Abrir o Grafana:**

   Abra o navegador e vá para `http://localhost:3000`. O login padrão é `admin` para o usuário e `admin` para a senha.

## Adicionar o InfluxDB como Data Source

1. **Adicionar Data Source:**

   - No Grafana, clique em "Configuration" (ícone de engrenagem) no menu lateral e selecione "Data Sources".
   - Clique no botão "Add data source".
   - Selecione "InfluxDB".

2. **Configurar Data Source:**

   - Configure a URL do InfluxDB como `http://localhost:8086`.
   - Em "Database", digite `db0`.
   - Em "User" e "Password", insira `admin123` (ou as credenciais que você definiu).
   - Clique em "Save & Test" para garantir que o Grafana pode se conectar ao InfluxDB.

## Importar um Dashboard

1. **Importar Dashboard:**

   - No menu lateral, clique em "+" e selecione "Import".
   - Você pode importar um dashboard existente fornecendo o ID do dashboard do Grafana.com ou carregando um arquivo JSON.
   - Por exemplo, para importar o dashboard com ID 2587, digite 2587 e clique em "Load".
   - Após importar, configure o dashboard para usar o data source do InfluxDB configurado anteriormente.
