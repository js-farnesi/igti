FROM nginx

LABEL labigti
LABEL version="1.0.0" description="Rodando exercícios com NGINX" maintainer="js-farnesi"

RUN cd / && mkdir files && chmod 777 -R files/

COPY . /usr/share/nginx/html/

VOLUME /files/
WORKDIR /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["/usr/sbin/nginx"]
CMD ["-g", "daemon off;"]
