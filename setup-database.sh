#!/bin/bash
# Script de Setup do Banco de Dados MySQL
# Atividade Avaliativa Individual 03 - Portfolio Academico

echo "========================================"
echo "  Setup do Banco de Dados - Portfolio  "
echo "========================================"
echo ""

# Verifica se o Node.js esta instalado
echo "Verificando instalacao do Node.js..."

if ! command -v node &> /dev/null; then
    echo "ERRO: Node.js nao encontrado!"
    echo "Por favor, instale o Node.js antes de continuar."
    echo "Download: https://nodejs.org/"
    read -p "Pressione Enter para sair..."
    exit 1
fi

NODE_VERSION=$(node --version)
echo "Node.js encontrado! Versao: $NODE_VERSION"
echo ""

# Procura pelo MySQL em locais comuns no macOS
echo "Verificando instalacao do MySQL..."

MYSQL_PATH=""

# Locais comuns do MySQL no macOS
if [ -f "/usr/local/mysql/bin/mysql" ]; then
    MYSQL_PATH="/usr/local/mysql/bin/mysql"
elif [ -f "/opt/homebrew/bin/mysql" ]; then
    MYSQL_PATH="/opt/homebrew/bin/mysql"
elif command -v mysql &> /dev/null; then
    MYSQL_PATH=$(which mysql)
fi

if [ -z "$MYSQL_PATH" ]; then
    echo "ERRO: MySQL nao encontrado!"
    echo "Por favor, instale o MySQL antes de continuar."
    echo "Download: https://dev.mysql.com/downloads/mysql/"
    echo "Ou instale via Homebrew: brew install mysql"
    read -p "Pressione Enter para sair..."
    exit 1
fi

echo "MySQL encontrado em: $MYSQL_PATH"
echo ""

# Solicita credenciais do MySQL
echo "Digite as credenciais do MySQL:"
read -p "Usuario MySQL (padrao: root): " DB_USER
DB_USER=${DB_USER:-root}

read -sp "Senha do MySQL (deixe vazio se nao tiver senha): " DB_PASS
echo ""
echo ""

echo "Criando banco de dados 'portfolio_db'..."

# Cria o banco de dados
if [ -z "$DB_PASS" ]; then
    echo "CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" | "$MYSQL_PATH" -u "$DB_USER" 2>/dev/null
else
    echo "CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" | "$MYSQL_PATH" -u "$DB_USER" -p"$DB_PASS" 2>/dev/null
fi

if [ $? -eq 0 ]; then
    echo "Banco de dados criado com sucesso!"
else
    echo "ERRO ao criar banco de dados!"
    echo "Verifique suas credenciais e tente novamente."
    read -p "Pressione Enter para sair..."
    exit 1
fi

echo ""
echo "Criando arquivo .env..."

# Cria o arquivo .env
cat > .env << EOF
DB_NAME=portfolio_db
DB_USER=$DB_USER
DB_PASS=$DB_PASS
DB_HOST=localhost
DB_DIALECT=mysql
EOF

echo "Arquivo .env criado com sucesso!"
echo ""

echo "========================================"
echo "  Setup concluido com sucesso!         "
echo "========================================"
echo ""
echo "Proximo passo: Execute 'npm install' e depois 'npm start'"
echo ""
read -p "Pressione Enter para sair..."
