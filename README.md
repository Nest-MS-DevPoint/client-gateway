# Client Gateway

## Dev

1. Clonar el proyecto
2. Crear un archivo `.env` basado en `.env.template`
3. Levantar el proyecto con `npm run start:dev`

## Nats

```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```