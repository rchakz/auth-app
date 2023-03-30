# fresh project

### Install Deno

Este projeto usa Deno! Instale para o seu sistema operacional seguindo as
instruções [aqui](https://deno.land/#installation)

### Variáveis de ​​ambiente

Copie o arquivo `.env.sample` para `.env`:

```sh
cp .env.sample .env
```

Atualize os valores de acordo (se estiver usando o Docker, os valores podem
permanecer como estão).

GitHub client e secret podem ser adquiridos
[aqui](https://github.com/settings/applications/).

### Database

Se estiver usando o Docker, você pode executar a partir deste diretório para
criar um banco de dados mariadb:

```sh
docker-compose start
```

### Uso

Inicie o projeto (isso instalará as dependências na primeira execução):

```
deno task start
```

Isso observará (whatch) o diretório do projeto e reiniciará conforme necessário.
