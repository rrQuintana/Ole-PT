# 📌 Configuración del Proyecto Frontend

## 🚀 1. Clonar el Repositorio

```sh
git clone <URL_DEL_REPOSITORIO>
cd frontend
```

## 📦 2. Instalar Dependencias

Asegúrate de tener **Node.js 18+** instalado.

```sh
npm install
```

Si usas **yarn**:

```sh
yarn install
```


## 🏗 3. Ejecutar el Proyecto en Desarrollo

```sh
npm run dev
```

El servidor se iniciará en `http://localhost:3000/`.

## ✅ 4. Checklist Final

✔️ **Node.js instalado** (`node -v`)
✔️ **Dependencias instaladas** (`node_modules` debe existir)
✔️ **El servidor inicia con `npm run dev`**


Con esto, el proyecto está listo para usarse. 🚀

El proyecto utiliza una base de datos en línea, por lo que no es necesario configurar una base de datos local.


---


# 📌 Configuración del Proyecto Backend

Este proyecto es una API desarrollada con **FastAPI**, **SQLAlchemy** y **Alembic** para gestionar trabajadores, ganancias y retiros.

## 📌 **Requisitos**

Asegúrate de tener instalados los siguientes requisitos antes de comenzar:

- Python 3.10+
- PostgreSQL
- pip
- Virtualenv

## 🚀 **Instalación**

### **Clonar el repositorio**
```bash
$ git clone https://github.com/tu-usuario/tu-repo.git
$ cd backend
```

### **Crear y activar entorno virtual**
```bash
$ python -m venv .venv
$ source .venv/bin/activate  # En Mac/Linux
$ .venv\Scripts\activate    # En Windows
```

### **Instalar dependencias**
```bash
$ pip install -r requirements.txt
```


## 🏃 **Ejecutar el Servidor**
```bash
$ uvicorn backend.api.main:app --reload
```

## 🛠 **Comandos Útiles**

- **Recrear migraciones:**
  ```bash
  $ alembic downgrade base
  $ alembic revision --autogenerate -m "Recreating migrations"
  $ alembic upgrade head
  ```

- **Verificar migraciones pendientes:**
  ```bash
  $ alembic current
  ```

- **Ver logs en tiempo real:**
  ```bash
  $ uvicorn backend.api.main:app --reload --log-level debug
  ```

🔥 **¡Listo! Tu API está configurada y en funcionamiento.**