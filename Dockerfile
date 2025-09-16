FROM nginx-1.29.0

COPY . /usr/share/ngnix/html

EXPOSE 80

CMD ["echo","image crate suceefully"]
