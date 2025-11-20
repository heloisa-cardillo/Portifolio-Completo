# Script de Setup do Banco de Dados MySQL
# Atividade Avaliativa Individual 03 - Portfolio Academico

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup do Banco de Dados - Portfolio  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Procura pelo MySQL em locais comuns
Write-Host "Procurando instalacao do MySQL..." -ForegroundColor Yellow

$possiblePaths = @(
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 5.7\bin\mysql.exe",
    "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\Program Files (x86)\MySQL\MySQL Server 5.7\bin\mysql.exe"
)

$mysqlPath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $mysqlPath = $path
        break
    }
}

if (-not $mysqlPath) {
    $mysqlPath = Get-Command mysql -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source
}

if (-not $mysqlPath) {
    Write-Host "ERRO: MySQL nao encontrado!" -ForegroundColor Red
    Write-Host "Por favor, instale o MySQL antes de continuar." -ForegroundColor Red
    Write-Host "Download: https://dev.mysql.com/downloads/installer/" -ForegroundColor Cyan
    pause
    exit
}

Write-Host "MySQL encontrado em: $mysqlPath" -ForegroundColor Green
Write-Host ""

# Solicita credenciais do MySQL
Write-Host "Digite as credenciais do MySQL:" -ForegroundColor Yellow
$dbUser = Read-Host "Usuario MySQL (padrao: root)"
if ([string]::IsNullOrWhiteSpace($dbUser)) {
    $dbUser = "root"
}

$dbPass = Read-Host "Senha do MySQL (deixe vazio se nao tiver senha)"

Write-Host ""
Write-Host "Criando banco de dados 'portfolio_db'..." -ForegroundColor Yellow

# Cria o banco de dados usando argumentos corretos
$createDbCommand = "CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if ([string]::IsNullOrWhiteSpace($dbPass)) {
    $output = $createDbCommand | & $mysqlPath -u $dbUser 2>&1
} else {
    $output = $createDbCommand | & $mysqlPath -u $dbUser "--password=$dbPass" 2>&1
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "Banco de dados criado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "ERRO ao criar banco de dados!" -ForegroundColor Red
    Write-Host "Detalhes: $output" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Verifique suas credenciais e tente novamente." -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "Criando arquivo .env..." -ForegroundColor Yellow

# Cria o arquivo .env
$envContent = @"
DB_NAME=portfolio_db
DB_USER=$dbUser
DB_PASS=$dbPass
DB_HOST=localhost
DB_DIALECT=mysql
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "Arquivo .env criado com sucesso!" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Setup concluido com sucesso!         " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Proximo passo: Execute 'npm install' e depois 'npm start'" -ForegroundColor Cyan
Write-Host ""
pause
