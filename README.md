# Startup project

## Frontend init
    cd emuapp
    npm install
    npm run watch

## Start Project
    docker-compose build
    docker-compose up

## Database Migration
    docker exec -it emotionalmappapp_app_1 alembic upgrade head
### Enjoy