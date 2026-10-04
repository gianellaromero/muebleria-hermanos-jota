🪑 E-commerce Mueblería Hermanos Jota

Aplicación web de e-commerce desarrollada como proyecto académico durante los Sprints 3 y 4, con una arquitectura separada en frontend (React) y backend (Node.js + Express).

🚀 Tecnologías utilizadas
Frontend

React

JavaScript

CSS



Backend

Node.js

Express.js

CORS


👥 Integrantes

Gianella Romero

Daiana Elizabeth Villagra

Francisco Garcia Sorrenti

Khiara Razzolini


📁 Estructura del proyecto
/
├── client/      # Frontend desarrollado en React
├── backend/     # API desarrollada con Node.js y Express
└── README.md


▶️ Ejecución


🔹 Backend

cd backend
npm install
node server.js

El backend corre en:
http://localhost:3001

API disponible en:
http://localhost:3001/api/productos


🔹 Frontend

En otra terminal:

cd client
npm install
npm start

El frontend corre en:
http://localhost:3000



🏗️ Arquitectura

El proyecto utiliza una arquitectura separada en dos partes principales: frontend y backend.

Frontend

El frontend está desarrollado con React y se encarga de la interfaz de usuario, la navegación entre las diferentes secciones, la visualización de los productos, el detalle de cada producto y la gestión del carrito de compras.

Backend

El backend está desarrollado con Node.js y Express y funciona como una API encargada de proporcionar los datos de los productos al frontend.


💡 Decisiones tomadas

Se decidió separar el proyecto en frontend y backend para mantener una estructura organizada y permitir que cada parte tenga responsabilidades específicas.

Se utilizó React para desarrollar la interfaz del usuario y trabajar con componentes reutilizables.

Se utilizó Node.js con Express para desarrollar la API del backend y gestionar las solicitudes HTTP.

Se utilizó CORS para permitir la comunicación entre el frontend, que se ejecuta en el puerto 3000, y el backend, que se ejecuta en el puerto 3001.


🔗 Integración

El frontend consume los datos de productos proporcionados por el backend mediante fetch. De esta manera, el frontend obtiene la información desde la API y la utiliza para mostrar los productos en la aplicación.

🛒 Funcionalidades

Catálogo de productos

Visualización del detalle de los productos

Carrito de compras

Navegación entre secciones

Consumo de API

Integración entre frontend y backend

⚠️ Notas importantes

Ejecutar npm install en las carpetas backend y client antes de iniciar los servidores.

El backend debe estar activo para que el frontend pueda obtener los productos desde la API.

Ambos servidores deben ejecutarse de manera independiente.

El frontend utiliza el puerto 3000.

El backend utiliza el puerto 3001.

Se utiliza CORS para permitir la comunicación entre ambos servidores.

📌 Estado del proyecto

✔ Sprint 3 completado (API backend)
✔ Sprint 4 completado (integración frontend-backend)

📄 Licencia

Proyecto desarrollado con fines académicos.