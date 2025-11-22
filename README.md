# API de Ruleta

API REST para gestionar ruletas con apuestas a números o colores.

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env`:

```
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
```

## Ejecutar

```bash
npm start
```

## Endpoints

### 1. Crear ruleta
**POST** `/api/roulette`

Respuesta: ID de la ruleta creada

### 2. Abrir ruleta
**PATCH** `/api/roulette/:id/open`

Abre una ruleta para recibir apuestas

### 3. Realizar apuesta
**POST** `/api/roulette/:id/bet`

Body:
```json
{
  "userName": "Juan",
  "betType": "number",
  "number": 15,
  "amount": 100
}
```
o
```json
{
  "userName": "María",
  "betType": "color",
  "color": "red",
  "amount": 50
}
```

- `betType`: "number" o "color"
- `number`: 0-36 (solo para apuestas a número)
- `color`: "red" o "black" (solo para apuestas a color)
- `amount`: monto de la apuesta (máx. 10000)

### 4. Cerrar ruleta
**PATCH** `/api/roulette/:id/close`

Cierra la ruleta, genera resultado y calcula ganancias.

Respuesta: número y color ganador, estado de todas las apuestas

### 5. Listar ruletas
**GET** `/api/roulette`

Retorna todas las ruletas y sus datos
