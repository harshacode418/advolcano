#!/usr/bin/env sh
set -o errexit
set -o pipefail
set -o nounset

python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec gunicorn payments.wsgi:application --bind 0.0.0.0:8000 --workers "${GUNICORN_WORKERS:-3}"

