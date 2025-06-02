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
- **Base de Datos**: MariaDB
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

- Compatible con cualquier sistema operativo con navegador moderno.
- Java 17
- Node.js y Angular CLI

---

## ⚙️ Instalación

1. **Backend**:  
   - Abrir el proyecto en Eclipse.  
   - Instalar dependencias Maven.  
   - Ejecutar el proyecto Spring Boot.

2. **Frontend**:  
   - Instalar Node.js  
   - `npm install` dentro del proyecto Angular  
   - `ng serve` para iniciar

3. **Base de Datos**:  
   - Instalar MariaDB  
   - Crear esquema y credenciales según configuración del backend.

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
- Actualmente en fase de desarrollo.
- Arquitectura dividida por capas en backend y estructura modular en frontend.

---

## 🚫 Pruebas

- No se han definido pruebas automatizadas por el momento.
- Las pruebas serán consideradas tras la fase de desarrollo funcional.

---

## 🚀 Despliegue

1. Contratar hosting (ej. DonDominio)
2. Subir backend con base de datos configurada
3. Deploy de frontend como SPA o desde el mismo backend (si se empaqueta con `ng build`)

---

## 🔧 Mantenimiento

- Actualizaciones se desarrollan en local y se suben tras validación manual.
- La solución de errores se documentará una vez estable.

---

## 🎓 Conclusión

Este proyecto ha sido una experiencia clave en mi formación como desarrollador fullstack. Agradezco el apoyo de mis profesores del IES Fuentezuelas por su orientación y dedicación.

---

## 📬 Contacto

- **Email**: [me@mortizb.dev](mailto:me@mortizb.dev)
- **GitHub**: [MOrtBen585](https://github.com/MOrtBen585)
