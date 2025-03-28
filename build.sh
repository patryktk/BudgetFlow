#!/bin/bash

# Nazwa projektu
PROJECT_NAME="budgetflow"

# Lista mikroserwisów
SERVICES=("users-service" "groups-service" "gateway" "expenses-service" "eureka-server" "config-server")
FRONTEND="budgetFlow-ui"

# Funkcja do budowania mikroserwisów Spring Boot
build_backend() {
    for SERVICE in "${SERVICES[@]}"; do
        echo "🔨 Budowanie obrazu dla $SERVICE..."
        cd "$SERVICE" || exit
        ./mvnw clean package -DskipTests
        docker build -t "$PROJECT_NAME/$SERVICE:latest" .
        cd ..
    done
}

# Funkcja do budowania frontendu Angular
build_frontend() {
    echo "🎨 Budowanie obrazu dla $FRONTEND..."
    cd "$FRONTEND" || exit
    npm install
    npm run build --prod
    docker build -t "$PROJECT_NAME/$FRONTEND:latest" .
    cd ..
}

# Uruchamianie funkcji
build_backend
#build_frontend

echo "✅ Wszystkie obrazy zostały zbudowane!"
