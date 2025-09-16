FROM ngnix:latest

COPY . /usr/share/ngnix/html

EXPOSE 80

CMD ["echo","image crate suceefully"]
