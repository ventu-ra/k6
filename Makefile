# Configurações
PORT := 3000
INFLUXDB_PORT := 8086
SCRIPTS_DIR := tests
ENV := development

# Comando para executar testes k6
# K6_RUN_COMMAND := docker-compose run -v $(shell pwd)/$(SCRIPTS_DIR):/tests k6 run --out influxdb=http://localhost:$(INFLUXDB_PORT)/db0 -w /tests/$(notdir $(SCRIPT_PATH))


K6_RUN_COMMAND := docker-compose run -v $(shell pwd)/$(SCRIPTS_DIR):/tests --rm -T k6 run -<tests/$(notdir $(SCRIPT_PATH)) --out influxdb=http://localhost:8086/db0

.DEFAULT_GOAL: help

help: ## Exibe os comandos disponíveis
	@echo "Uso: make <alvo>"
	@awk 'BEGIN {FS = ":.*##"} /^[^@ \t]/ && /:.*##/ { sub(/^[ \t]+/, "", $$1); printf "  \033[36m%-25s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

compose_up: ## Iniciar o serviço
	@docker-compose up -d --build

API: ## Para testar a API se esta cadastrando
	@chmod +x ./script.sh && ./script.sh

docker.stats: ## Exibir estatísticas do Docker
	@docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"

run-k6: ## Executar testes k6. Uso: make run-k6 SCRIPT_PATH=tests/exemplo_k6.js
	@if [ -z "$(SCRIPT_PATH)" ]; then \
		echo "Uso: make run-k6 SCRIPT_PATH=<caminho do script>"; \
		exit 1; \
	fi
	@$(K6_RUN_COMMAND)

exemplo: ## Script de exemplo
	@make run-k6 SCRIPT_PATH=tests/exemplo.js

compose_down: ## Parar e remover todos os contêineres
	@docker-compose down
