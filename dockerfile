FROM python:3.7

COPY ./backend/requirements.txt /opt/app/backend/
RUN pip install psycopg2
RUN pip install -r /opt/app/backend/requirements.txt
COPY ./backend /opt/app/backend

EXPOSE 5000
ENV PYTHONPATH=/opt/app/backend

WORKDIR /opt/app/backend
RUN flask run --host=0.0.0.0

