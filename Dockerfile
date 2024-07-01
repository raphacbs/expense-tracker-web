# Etapa 1: Build da aplicação
FROM node:14 AS build

# Definindo o diretório de trabalho no container
WORKDIR /app

# Copiando o package.json e o yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instalando as dependências
RUN npm install --force

# Copiando todo o código fonte para o diretório de trabalho
COPY . .

# Gerando o build da aplicação
RUN npm build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine

# Copiando o build gerado na etapa anterior para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiando o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expondo a porta 80 para acesso externo
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
