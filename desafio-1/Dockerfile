FROM golang:alpine as building-stage

# Diretório de trabalho
WORKDIR /go/src/app

# Copiando arquivos
COPY . .

# Baixando dependencias
RUN go get -d -v ./...

# Instalado pacote
RUN go install -v ./...

# Compilando aplicação
RUN go build app.go

FROM scratch as deployment-stage

# Diretório de trabalho
WORKDIR /app

# Copiando apenas o executável
COPY --from=building-stage /go/src/app/app /app/hello-world

# Excutando a aplicação
CMD ["./hello-world"]