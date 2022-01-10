## Desafio Go

O resultado esperado é que essa aplicação escrita em [Go][1] escreva uma [saudação personalizada][2] ao ser executada a partir do terminal.

Para concluir do desafio o código fonte foi compilado utilizando como base uma [imagem oficial golang][3] e apenas o arquivo binário gerado foi utilizado na layer final da imagem docker, [otimizada][4] para ter o menor tamanho possível.

[1]: https://go.dev/
[2]: https://gobyexample.com/hello-world
[3]: https://hub.docker.com/_/golang
[4]: https://docs.docker.com/develop/develop-images/multistage-build/

### Entregáveis

- [x] URL imagem docker: [marcoscoelho/codeeducation](https://hub.docker.com/r/marcoscoelho/codeeducation)
- [x] Tamanho: ~1.77MB


## Instruções de publicação

```bash
docker build -t marcoscoelho/codeeducation .
docker login
docker push marcoscoelho/codeeducation
```

## Instruções de uso

```bash
docker run marcoscoelho/codeeducation
```