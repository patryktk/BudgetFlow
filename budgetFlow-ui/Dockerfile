# Etap 1: Budowanie aplikacji Angular
FROM node:18-alpine AS build

WORKDIR /app

# Kopiowanie plików konfiguracyjnych
COPY package.json package-lock.json ./
RUN npm install

# Kopiowanie reszty kodu
COPY . .

# Budowanie aplikacji
RUN npm run build --prod

# Etap 2: Serwowanie aplikacji za pomocą Nginx
FROM nginx:1.21.6-alpine

# Usunięcie domyślnej konfiguracji Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Kopiowanie zbudowanej aplikacji do katalogu Nginx
COPY --from=build /app/dist/budget-flow-ui /usr/share/nginx/html

# Ustawienie domyślnej komendy dla kontenera
CMD ["nginx", "-g", "daemon off;"]

# Eksponowanie portu 80
EXPOSE 80
