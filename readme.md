# ⏱️ Control Horario – Fullstack Application

Aplicación fullstack para la gestión del registro horario de empleados, desarrollada con arquitectura moderna y desplegada en un entorno real en servidor Linux.

---

## 📌 Descripción

Sistema diseñado para gestionar el control horario de trabajadores cumpliendo con la normativa vigente.

Permite registrar fichajes, gestionar empleados y configurar el sistema de forma dinámica según las necesidades de cada empresa.

---

## 🚀 Tecnologías

- **Backend:** Java 17, Spring Boot  
- **Frontend:** Angular, Tailwind CSS  
- **Mobile:** Ionic (generación de APK con Android Studio)  
- **Base de datos:** MySQL / MariaDB  
- **Infraestructura:** Nginx, systemd, Linux (Ubuntu)  
- **Seguridad:** SSL (Let's Encrypt)  
- **Control de versiones:** Git, GitHub  

---

## 🧠 Funcionalidades

- Registro de entrada y salida de empleados  
- Cálculo automático de horas trabajadas y horas extra  
- Sistema de roles:
  - 👤 Trabajador (fichajes, consulta de horas)
  - 🔐 Administrador (gestión de empleados y horarios)
  - 🏢 Empresa (configuración global)  
- Gestión de usuarios, grupos y horarios  
- Configuración dinámica por empresa  
- Versión móvil para fichajes desde dispositivos Android  

---

## 🏗️ Arquitectura

- Backend estructurado en capas:
  - Controladores
  - Servicios
  - Repositorios (DAO)
- API REST para comunicación frontend-backend  
- Frontend modular basado en Angular  
- Separación clara de responsabilidades  

---

## ⚙️ Despliegue

Aplicación desplegada en entorno real:

- Backend ejecutado como servicio (`systemd`)
- Frontend servido mediante Nginx
- Configuración de dominio y HTTPS con Let's Encrypt
- Base de datos en servidor remoto
- Aplicación accesible desde navegador y móvil

---

## 📱 Aplicación móvil

Se ha desarrollado una versión móvil utilizando **Ionic**, permitiendo:

- Fichaje desde dispositivos móviles  
- Acceso a funcionalidades básicas del sistema  
- Generación de APK mediante Android Studio  

---

## 🧪 Estado del proyecto

- Aplicación funcional en entorno real  
- Despliegue completo realizado  
- Sin tests automatizados (pendiente de implementación futura)  

---

## 📈 Aprendizajes clave

Este proyecto demuestra experiencia en:

- Desarrollo backend con Spring Boot  
- Creación y consumo de APIs REST  
- Integración fullstack (Angular + backend)  
- Modelado y gestión de bases de datos  
- Despliegue en servidores Linux  
- Configuración de servicios y seguridad (SSL)  
- Desarrollo de aplicaciones móviles con Ionic  
- Resolución de problemas en entornos reales  

---

## 📬 Contacto

- GitHub: https://github.com/MOrtBen585  
- Email: mortizbdev@gmail.com  
