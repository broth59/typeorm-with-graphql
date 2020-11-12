FROM mysql:5.7

ENV MYSQL_USER mysql_user
ENV MYSQL_PASSWORD mysql_password
ENV MYSQL_ROOT_PASSWORD mysql_root_password
ENV MYSQL_DATABASE visitlog

COPY ./scripts/ /docker-entrypoint-initdb.d/

