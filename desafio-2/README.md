## Descrição

Utilizando `docker-compose` para organizar a publicação de uma aplicação escrita em `Node` integrada a um banco de dados `Mysql` utilizando `nginx` como servidor HTTP.

## Instruções de publicação

### Ligar

```console
$ cp .env-sample .env
$ docker-compose up -d
```

### Desligar

```console
$ docker-compose stop
```

## Instruções de uso

### Abrir no navegador

URL de acesso: http://localhost:8080/