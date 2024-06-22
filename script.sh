#!/bin/bash

# Defina a URL da API
URL="http://localhost:3333/signup"

# Defina os dados de email e senha
EMAIL="test@example.com"
PASSWORD="pwd123"

# Envie o POST request
curl -X POST $URL \
     -H "Content-Type: application/json" \
     -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}"
