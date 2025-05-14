# Documentación del Proyecto de Desarrollo de Aplicaciones Web

## 1. Introducción
- **Nombre del Proyecto**: Control Horario
- **Descripción**: Debido a la nueva reforma que entra en vigor este año, que obliga a las empresas a tener un control de las horas de los trabajadores, voy a desarrollar una aplicación capaz de almacenar los horarios y permitir que cada trabajador fiche en la hora de entrada y salida, registrando todo para posibles auditorías por parte del estado y de los inspectores.
- **Tecnologías Utilizadas**: 
  - Backend: Framework Spring
  - Frontend: Angular con Tailwind CSS

## 2. Requisitos del Sistema
- **Hardware**: 
  - **Especificaciones Mínimas**: Procesador de 2 GHz, 4 GB de RAM, 10 GB de espacio en disco.
  - **Especificaciones Recomendadas**: Procesador de 3 GHz, 8 GB de RAM, 20 GB de espacio en disco.
- **Software**: 
  - Compatible con cualquier sistema operativo que tenga un navegador web actualizado.

## 3. Instalación
- **Pasos para la Instalación**: 
  1. Instalar Eclipse para ejecutar el backend con Spring y Tomcat.
  2. Instalar Node.js y Angular para la parte frontend.
  3. Instalar una base de datos MariaDb
- **Configuración Inicial**: 
  - Las variables de entorno se descargarán de una base de datos específica para cada empresa. El frontend recibirá estas variables del backend y las renderizará en consecuencia.

## 4. Uso
- **Guía de Usuario**: 
  - Al loguearse, el usuario cargará las variables específicas de su empresa para ofrecerle el frontend adecuado.
  - Cada usuario tendrá acceso a diferentes partes de la aplicación según su rol (trabajador, admin, usuario principal).
- **Funcionalidades Principales**: 
  - Interfaz diferente según el usuario logueado.
  - Usuario principal: Gestiona el alta de la empresa y configuraciones de la aplicación.
  - Usuario admin: Gestiona altas de trabajadores, grupos de trabajadores, horarios, horas extras.
  - Usuario trabajador: Ficha en el horario y ve las horas extras y horarios asignados.

## 5. Desarrollo
- **Estructura del Proyecto**: Pendiente de organización.
- **Guía de Desarrollo**: 
  - Solo habrá un único desarrollador (yo).

## 6. Pruebas
- **Tipos de Pruebas**: No se realizarán pruebas inicialmente.
- **Cómo Ejecutar las Pruebas**: No se detallará cómo hacerlas por ahora.

## 7. Despliegue
- **Pasos para el Despliegue**: 
  - Desplegar en un hosting alquilado de dondominio.
- **Configuración de Producción**: 
  - Necesitaré una base de datos, un servidor para el backend y otro para el frontend, o aunarlos en uno solo.

## 8. Mantenimiento
- **Actualizaciones**: 
  - Las actualizaciones se realizarán en local y se subirán cuando estén terminadas.
- **Solución de Problemas**: No se incluirá esta parte hasta que la funcionalidad esté acabada.

## 9. Conclusión
- **Agradecimientos**: A mis profesores del instituto IES las Fuentezuelas.
- **Contacto**: me@mortizb.dev
