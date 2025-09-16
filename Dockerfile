FROM nginx:1.29.0

RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/the-sahilsuman/currency-convertor.git /usr/share/nginx/html

EXPOSE 80
