# Projeto Fresh Deno

Inspirado por
[CodingGarden - Fresh Spots](https://github.com/CodingGarden/fresh-spots/)

### Instale o Deno

Este projeto usa Deno. Instale para o seu sistema operacional seguindo as
instruções [aqui](https://deno.land/#installation)

### Variáveis de ambiente

Copie o arquivo `.env.sample` para `.env`:

```sh
cp .env.sample .env
```

Atualize os valores de acordo (se estiver usando o Docker, os valores podem
permanecer como estão).

O códigos client e secret do GitHub podem ser adquiridos
[aqui](https://github.com/settings/applications/).

### Banco de Dados

Se estiver usando o Docker, você pode executar a partir deste diretório para
criar um banco de dados postgres:

```sh
docker-compose up
```

```
docker-compose start
```

### Uso

Inicie o projeto (isso instalará as dependências na primeira execução):

```
deno task start
```

Isso observará (watch) o diretório do projeto e reiniciará conforme necessário.

Rodar o linter (deno lint) e formatar os arquivos (deno fmt):

```
deno task flint
```

#### MIGRATIONS

```
deno task migrate:up
```

```
deno task migrate:down
```

## DOCKER

Instale o Docker para o seu sistema operacional seguindo as instruções
[aqui](https://www.docker.com/get-started/)

#### Comandos Docker

Buscar Imagens

```
docker search postgres
```

Baixar Imagem

```
docker pull postgres
```

Listar Imagens

```
docker images
```

Criar o Contêiner, mapear a Porta e o Armazenamento (Volume Docker)

```
docker run -p 5432:5432 -v /tmp/database:/var/lib/postgresql/data -e POSTGRES_PASSWORD=admin -d postgres
```

Listar Contêiners

```
dockers ps -a
```

Listar somente Contêiners em execução

```
dockers ps
```

Encontrar o endereço IP que foi atribuído ao Contêiner

```
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <nome-container>
```

Acessar o Contêiner

```
docker exec -it <nome-container> bash
```

Parar o Contêiner

```
docker stop <nome-container>
```

Iniciar o Contêiner

```
docker start <nome-container>
```

Reiniciar o Contêiner

```
docker restart <nome-container>
```

Remover uma ou várias Imagens

```
docker rmi <id-imagem> <id-da-imagem> ...
```

Remover todas Imagens

```
docker rmi $(docker images -q)
```

Parar todos Contêiners em execução

```
docker stop $(docker ps -a -q)
```

Remover todos Contêiners parados

```
docker rm $(docker ps -a -q)
```

## POSTGRES

#### Comandos Postgres

Conectar Database

```
psql -d <db-name> -U <username> -W
```

Conectar Database Remoto

```
psql -h <db-address> -d <db-name> -U <username> -W
```

Conectar utilizando SSL

```
psql "sslmode=require host=<db-address> dbname=<db-name> user=<username>"
```

Listar Databases

```
\l
```

Mudar de Database

```
\c <db-name>
```

Listar Tabelas

```
\dt
```

Descrever tabela

```
\d <table-name>
```

Descrever tabela detalhada

```
\d+ <table-name>
```

Listar todos Schemas

```
\dn
```

Listar usuários e suas funções (Roles)

```
\du
```

Listar um usuário específico

```
\du <username>
```

Listar todas Functions

```
\df
```

Listar todas Views

```
\dv
```

Salvar uma consulta em um arquivo

```
\o <file-name>
```

Executar comandos a partir de um arquivo

```
\i <file-name>
```

Sair do PSQL

```
\q
```
