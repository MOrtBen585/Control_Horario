# 🕒 Control Horario

**Proyecto de Desarrollo de Aplicaciones Web - TFC**

Este proyecto nace como respuesta a la normativa vigente que obliga a las empresas a registrar el horario laboral de sus trabajadores. Desarrollé esta solución completa, capaz de gestionar entradas/salidas, roles de usuario, y adaptarse a cada empresa mediante configuración dinámica.

---

## 📌 Índice

1. [Introducción](#introducción)  
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)  
3. [Requisitos del Sistema](#requisitos-del-sistema)  
4. [Instalación](#instalación)  
5. [Uso](#uso)  
6. [Desarrollo](#desarrollo)  
7. [Pruebas](#pruebas)  
8. [Despliegue](#despliegue)  
9. [Mantenimiento](#mantenimiento)  
10. [Conclusión](#conclusión)  
11. [Contacto](#contacto)  

---

## 🧭 Introducción

- **Nombre del Proyecto**: Control Horario  
- **Objetivo**: Gestionar la jornada laboral de trabajadores y permitir auditorías por parte del estado.  
- **Autor**: Manuel Ortiz Benítez  
- **Instituto**: IES Fuentezuelas  

---

## 🧑‍💻 Tecnologías Utilizadas

- **Backend**: Spring Boot (Java)
- **Frontend**: Angular + Tailwind CSS
- **Base de Datos**: MariaDB / MySQL
- **Servidor Web**: Nginx
- **Certificados SSL**: Certbot + Let's Encrypt
- **Control de versiones**: Git + GitHub

---

## 💻 Requisitos del Sistema

### Hardware

| Mínimo               | Recomendado         |
|----------------------|---------------------|
| Procesador: 2 GHz     | Procesador: 3 GHz   |
| Memoria RAM: 4 GB     | Memoria RAM: 8 GB   |
| Almacenamiento: 10 GB | Almacenamiento: 20 GB |

### Software

- Sistema Operativo: Ubuntu 22.04 LTS o superior
- Java 17+
- Node.js y Angular CLI
- Nginx
- Certbot
- Ionic (para la app Android)
- Acceso SSH, dominio con DNS configurado, puertos 80 y 443 abiertos

---

## ⚙️ Instalación

### Backend (Spring Boot)

1. Compilar el proyecto y generar el `.jar`.
2. Subir el `.jar` al servidor (por ejemplo: `/home/usuario/app/`) usando `scp`.
3. Conectarse por SSH:
   ```bash
   ssh usuario@IP
   ```

4. Crear archivo `application.properties` con:
   - Configuración del puerto.
   - Conexión a la base de datos remota.
   - Parámetros de JPA y codificación UTF-8.

5. Crear un servicio `systemd` para el backend:
   ```bash
   sudo nano /etc/systemd/system/miapp.service
   ```

   Ejemplo de contenido:
   ```ini
   [Unit]
   Description=MiApp API
   After=network.target

   [Service]
   User=usuario
   ExecStart=/usr/bin/java -jar /home/usuario/app/control-horario.jar --spring.config.location=file:/home/usuario/app/application.properties
   SuccessExitStatus=143

   [Install]
   WantedBy=multi-user.target
   ```

6. Activar y arrancar el servicio:
   ```bash
   sudo systemctl daemon-reexec
   sudo systemctl enable miapp
   sudo systemctl start miapp
   sudo systemctl status miapp
   ```

### Base de Datos (MariaDB / MySQL)

1. Instalar MariaDB:  
   ```bash
   sudo apt update && sudo apt upgrade  
   sudo apt install mariadb-server  
   sudo systemctl start mariadb  
   sudo systemctl enable mariadb  
   sudo mysql_secure_installation
   ```

2. Crear base de datos y usuario:
   ```sql
   CREATE USER 'MANUEL'@'localhost' IDENTIFIED BY 'tu_contraseña';
   GRANT ALL PRIVILEGES ON *.* TO 'MANUEL'@'localhost' WITH GRANT OPTION;
   FLUSH PRIVILEGES;
   CREATE DATABASE BD_TFC;
   ```

### Frontend (Angular)

1. Compilar con Angular CLI:
   ```bash
   ng build --configuration production
   ```

2. Subir contenido de la carpeta `dist/` al servidor:
   ```bash
   scp -r dist/usuario@IP:/var/www/miApp-front/browser/
   ```

3. Ajustar permisos:
   ```bash
   sudo chown -R www-data:www-data /var/www/miApp-front/
   ```

---

## 🧪 Uso

Al iniciar sesión, el usuario recibe una configuración personalizada según su empresa.

### Roles y Funcionalidades

- 👤 **Trabajador**  
  - Fichar entrada/salida  
  - Ver horarios y horas extra

- 🔐 **Administrador**  
  - Alta de trabajadores  
  - Gestión de grupos y horarios  

- 🛠 **Usuario Principal**  
  - Alta de empresa  
  - Configuración general del sistema

---

## 🛠 Desarrollo

- Proyecto desarrollado íntegramente por Manuel Ortiz Benítez.
- Arquitectura dividida por capas en backend y estructura modular en frontend.

---

## 🚫 Pruebas

- No se han definido pruebas automatizadas por el momento.
- Las pruebas serán consideradas tras la fase de desarrollo funcional.

---

## 🚀 Despliegue

### 🧱 Requisitos previos

- Servidor con Ubuntu 22.04 LTS o superior.
- Dominio apuntando al servidor desde la zona DNS.
- Puertos 80 y 443 abiertos en el firewall.
- Acceso SSH.
- Certbot instalado para la gestión de certificados SSL.
- MariaDB/MySQL y Java 17+ instalados.

(El resto continúa desde la sección anterior, ya incluida...)

---

## 🔧 Mantenimiento

- Actualizaciones desarrolladas localmente y subidas tras validación manual.
- Documentación de errores y cambios planificada tras despliegue estable.

---

## 🎓 Conclusión

Este proyecto ha sido una experiencia clave en mi formación como desarrollador fullstack. Agradezco el apoyo de mis profesores del IES Fuentezuelas por su orientación y dedicación.

---

## 📬 Contacto

- **Email**: [me@mortizb.dev](mailto:me@mortizb.dev)  
- **GitHub**: [MOrtBen585](https://github.com/MOrtBen585)
