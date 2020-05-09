# Startup project

## Frontend init
    cd emuapp
    npm install
    npm run watch

## Start Project
    docker-compose build
    docker-compose up

## Migrate db
    docker exec -it emotionalmappapp_app_1 alembic upgrade head
## Seed db
    docker exec -it emotionalmappapp_app_1 python3 emuapp/seed.py
## Revision db
    docker exec -it emotionalmappapp_app_1 alembic revision --autogenerate -m ""
## Clear db
    docker exec -it emotionalmappapp_app_1 python3 emuapp/clearDB.py
### Enjoy