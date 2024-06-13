#!/bin/bash

# Definindo a URL da API
API_URL="http://localhost:3333/signup"

# Definindo os dados de cadastro
EMAIL="user0@example.com"
PASSWORD="senha123"

# Convertendo os dados JSON
DADOS_JSON=$(jq -n --arg email "$EMAIL" --arg password "$PASSWORD" \
              '{email: $email, password: $password}')

# Fazendo a requisição POST para a API
RESPOSTA=$(curl -s -X POST -H "Content-Type: application/json" -d "$DADOS_JSON" $API_URL)

# Verificando o status da requisição
# STATUS_CODIGO=$(echo $RESPOSTA | jq '.statusCode')

echo "Detalhes da resposta:"
echo $RESPOSTA | jq

