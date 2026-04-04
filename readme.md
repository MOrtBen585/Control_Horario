⏱️ Control Horario – Fullstack Application

Aplicación fullstack para la gestión del registro horario de empleados, desarrollada con arquitectura backend + frontend y desplegada en entorno real.

🚀 Tecnologías
Backend: Java 17, Spring Boot
Frontend: Angular, Tailwind CSS
Base de datos: MySQL / MariaDB
Infraestructura: Nginx, systemd, Linux (Ubuntu)
DevOps: Despliegue manual con SSL (Let's Encrypt)

🧠 Funcionalidades principales
Gestión de fichajes (entrada/salida)
Control de horas trabajadas y extras
Sistema de roles:
Usuario
Administrador
Empresa
Configuración dinámica por empresa

🏗️ Arquitectura
Backend estructurado en capas (controlador, servicio, repositorio)
API REST para comunicación frontend-backend
Frontend modular con Angular

⚙️ Despliegue
Aplicación desplegada en servidor Linux:

Backend ejecutado como servicio systemd
Frontend servido con Nginx
Certificado SSL con Let's Encrypt
