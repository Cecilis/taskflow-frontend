# TaskFlow Pro - Frontend

Interfaz de usuario para la aplicación de gestión de tareas TaskFlow Pro.

![Angular](https://img.shields.io/badge/Angular-19-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 📋 Descripción

Frontend desarrollado en **Angular 19** que consume la API REST del backend TaskFlow Pro. Proporciona una interfaz moderna e intuitiva para gestionar tareas (crear, leer, actualizar, eliminar) utilizando las nuevas características de Angular como Signals y el nuevo control flow.

Este proyecto forma parte de un ejercicio práctico de exploración en el ecosistema Angular/TypeScript como complemento a una trayectoria profesional principal en .NET.

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Angular | 19 | Framework frontend principal |
| TypeScript | 5.x | Lenguaje base |
| Node.js | 18+ | Entorno de ejecución |
| Angular CLI | 19 | Herramientas de desarrollo |
| HttpClient | - | Comunicación con API REST |
| RxJS | 7.x | Programación reactiva |

## 📁 Estructura del Proyecto

```text
taskflow-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── task-list/
│   │   │   ├── task-form/
│   │   │   └── task-item/
│   │   ├── services/
│   │   │   └── task.service.ts
│   │   ├── models/
│   │   │   └── task.model.ts
│   │   ├── app.component.ts
│   │   └── app.config.ts
│   ├── assets/
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── index.html
├── angular.json
├── package.json
└── tsconfig.json
```

```markdown
## 🚀 Cómo Ejecutar Localmente

### Requisitos Previos

| Herramienta | Versión | Instalación |
|-------------|---------|-------------|
| Node.js | 18+ | [Node.js](https://nodejs.org/) |
| Angular CLI | 19 | `npm install -g @angular/cli` |
| Git | - | [Git](https://git-scm.com/) |
| Backend | - | [taskflow-backend](https://github.com/cecilis/taskflow-backend) corriendo en `http://localhost:8080` |
```

### Instalación y Ejecución


#### 1. Clonar el repositorio

```bash
git clone https://github.com/cecilis/taskflow-frontend.git
cd taskflow-frontend
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Configurar la URL del backend (ver sección siguiente)


#### 4. Ejecutar la aplicación
```bash
ng serve
```

La aplicación estará disponible en http://localhost:4200

## ⚙️ Configuración de la API

El frontend necesita conocer la URL del backend para funcionar correctamente.

Edita el archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

Para producción, modifica src/environments/environment.prod.ts con la URL real de tu backend desplegado.

⚠️ Importante: Asegúrate de que el backend esté corriendo antes de ejecutar el frontend.


## 📸 Captura de Pantalla

[TaskFlow Pro - Pantalla principal](/screenshots/main-screen.png)


## 🔄 Próximas Mejoras

- [ ] Mejores estilos y diseño responsive
- [ ] Paginación en la lista de tareas
- [ ] Loading states mientras se cargan los datos
- [ ] Manejo de errores con mensajes amigables al usuario
- [ ] Filtros por estado (completada/pendiente)
- [ ] Fecha de vencimiento para cada tarea
- [ ] Animaciones y transiciones
- [ ] Tests unitarios con Jasmine y Karma

## 👩‍💻 Sobre la Autora

Ingeniero en Informática con más de 15 años de experiencia en desarrollo de software, especializada en el **ecosistema .NET** (C#, MVC, WPF, WebForms, Entity Framework, Azure DevOps). He trabajado intensamente en los sectores de banca, seguros y logística.

Este proyecto frontend representa un ejercicio práctico de exploración en Angular/TypeScript como complemento a mi especialidad principal. **Mi foco profesional principal continúa siendo .NET**.

**Contacto**
- 💼 [LinkedIn](https://www.linkedin.com/in/ligiapuertas/)
- 📧 [ligiapuertas@gmail.com](mailto:ligiapuertas@gmail.com)

## 📄 Licencia

Distribuido bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.

## 🔗 Backend

El backend que consume esta aplicación está disponible en: [taskflow-backend](https://github.com/cecilis/taskflow-backend)

Asegúrate de tenerlo corriendo en `http://localhost:8080` antes de usar el frontend.




