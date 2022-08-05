Crear Ambiente Virtual
virtualenv venv

Activa Ambiente Virtual
source venv/Scripts/activate

Hacer las Migraciones
py manage.py makemigrations

Ejecutar las Migraciones
py manage.py migrate


crear usuario
python manage.py createsuperuser

iniciar servidor
py manage.py runserver

Crear Requerimientos
pip freeze > requirements.txt

Ver Requerimientos
pip freeze

Instalar Requerimientos
pip install -r requirements.txt



Actualizar paquetes (Cuidado con correr esto)
pip install $(pip list --outdated --format=columns |tail -n +3|cut -d" " -f1) --upgrade




https://github.com/dwdyer/familytree