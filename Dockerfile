FROM node:current-alpine3.21

RUN ["adduser", "-s", "/bin/sh","-h", "/home/host", "host", "-D"]
RUN ["chown","-R", "host", "/home/host"]

# USER host

COPY * /home/host/

WORKDIR /home/host

RUN ["npm", "ci", "--include=prod"]

RUN ["npm", "run", "build"]

CMD ["npm", "run", "start"]