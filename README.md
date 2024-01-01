<img src="https://economia.epn.edu.ec/images/img/150.png"  height="200">

# Escuela Politécnica Nacional

 Facultad de Ingeniería de Sistemas
 Cloud Computing

 **integrantes:**

 * José Jiménez
 * Elisa Herrera
 * Mateo Sarzosa
 * Pablo Sarzosa

# Proyecto Pagina Web Cloud Computing


## 1.1 frontend
El frontend es realizado en vite(REACT+TYPESCRIPT) al descargar el repositorio, para ejecutar el frontend es necesario entrar en la carpeta frontend.

```cd frontend```

de ahi es importante el tener instalado globalmente **npm**, ya instalado npm , ya en el directorio , instalar los paquetes necesarios con:

```npm install```

ya con ello es suficiente para proceder con la ejecucion con el comando:
```npm run dev -- --host```

## 2.1.- backend

Se encuentra todo lo relacionado con el backend de la aplicación, en el cual se encuentra la base de datos, los modelos, las vistas y los serializers. 
**realizado en fastapi**

**Nota :** 

* Para la instalación de la api se debe tener instalado python desde 3.10 y venv, luego se debe ejecutar el siguiente comando en la carpeta api
* puede visualizar la documentación de la api en la siguiente url: http://localhost:8000/docs

### 2.1.1 Instalación de entorno virtual

*Ubíquese en la raíz de backend con:
```cd backend```

 y ejecute: 
 
 ```python -m venv venv```

### 2.1.2 Activación de entorno virtual
* Para activar el entorno virtual ejecute:   

* **En bash :** ```. ./venv/bin/activate```   

* **En fish :** ```. ./venv/bin/activate.fish```   


### 2.1.3 Instalación de requerimientos

ya dentro del entorno virtual ejecute el siguiente comando: ```pip install -r requirements.txt```
para instalar las dependencias necesarias

### 2.1.4 Ejecución de la aplicación

* para ejecutar la aplicación ejecute el siguiente comando: ```uvicorn main:app --host 0.0.0.0 --port (puerto de su preferencia, ej 2003) --reload```

### 2.1.5 Salida del entorno virtual

* para salir del entorno virtual ejecute: ```deactivate```

