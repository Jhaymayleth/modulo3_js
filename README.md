# SPA Vanilla JavaScript - Rick and Morty

## Descripción

Este proyecto es un ejemplo de cómo construir una SPA (Single Page Application) utilizando únicamente JavaScript Vanilla, sin frameworks ni librerías externas.

La aplicación implementa:

- Routing básico SPA
- Renderizado dinámico de vistas
- Arquitectura modular
- Consumo de APIs REST
- Componentización
- Separación de responsabilidades
- Carga dinámica de archivos HTML
- Buenas prácticas de documentación con JSDoc

---

# Características

## Home

- Muestra estadisticas de la pagina
- Renderiza el total de personajes, localidades y episodios

## Characters

- Consume la api de Rick y Morty
- Renderiza las tarjetas de los personajes con paginado simple

## Ubicaciones

- Renderiza las tarjetas de las ubicaciones con paginado simple

## Episodios

- Renderiza las tarjetas de los episodios con paginado simple y los personajes que aparecen alli 

## Contactos

- Formulario desacoplado

## Quiénes Somos

- Corto about us de la pagina

## Arquitectura SPA

- Navegación sin recargar la página
- Hash Routing
- Carga dinámica de vistas

---

# Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES6+
- Axios API
- ES Modules

---

# Estructura del proyecto

```txt
Rick_And_orty_SPA
├── assets
│   ├── css
│   │   └── styles.css
│   ├── img
│   │   ├── background.jpg
│   │   ├── favicon-package
│   │   │   ├── apple-touch-icon.png
│   │   │   ├── favicon-96x96.png
│   │   │   ├── favicon-code.html
│   │   │   ├── favicon.ico
│   │   │   ├── icon-192.png
│   │   │   ├── icon-512.png
│   │   │   └── site.webmanifest
│   │   └── logo.png
│   └── js
│       ├── app.js
│       ├── components
│       │   ├── characterCard.js
│       │   ├── episodesCard.js
│       │   ├── locationsCard.js
│       │   └── navbar.js
│       ├── pages
│       │   ├── about.js
│       │   ├── characters.js
│       │   ├── contacts.js
│       │   ├── episodes.js
│       │   ├── home.js
│       │   └── locations.js
│       ├── router.js
│       ├── services
│       │   ├── api.js
│       │   └── httpClient.js
│       ├── utils
│       │   └── helpers.js
│       └── views
│           ├── about.html
│           ├── characters.html
│           ├── contacts.html
│           ├── episodes.html
│           ├── home.html
│           └── locations.html
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

# Ejecución del proyecto

## Crear un archivo .env

```bash
VITE_API_URL=https://rickandmortyapi.com/api
VITE_CONTENT_TYPE=application/json
VITE_TIME_OUT=5000
```

## Ejecutar el proyecto

Para ejecutar el proyecto, primero se debe instalar las dependencias y luego realizar el run del proyecto
```bash
npm install
npm run dev
```