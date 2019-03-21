FROM node:10

LABEL maintainer="Antonio Gamez <antoniogamez@us.es>"

# RUN apk --update add --virtual alpine-sdk
RUN apt-get update
RUN apt-get install -y build-essential 
RUN apt-get install -y openssl 
RUN apt-get install -y graphviz 
RUN apt-get install -y ttf-freefont 
RUN apt-get install -y perl 

WORKDIR /usr/local
RUN wget -O minizinc-2.1.6-linux64.tar.gz https://github.com/MiniZinc/libminizinc/releases/download/2.1.6/minizinc-2.1.6-linux64.tar.gz
RUN tar xfz minizinc-2.1.6-linux64.tar.gz 
RUN cp minizinc-2.1.6/bin/* bin/ 
RUN cp -ra minizinc-2.1.6/share/* share/ 
RUN rm -rf minizinc-* 
RUN rm -rf /var/cache/apk/*

WORKDIR /tmp
RUN wget -O gecode-6.1.1.tar.gz https://github.com/Gecode/gecode/archive/release-6.1.1.tar.gz
RUN tar xfz gecode-6.1.1.tar.gz
WORKDIR /tmp/gecode-release-6.1.1/
RUN ./configure && make -j4 && make install
WORKDIR /tmp
RUN rm -rf gecode*


RUN mkdir -p /opt/app

ARG NODE_ENV=production
ARG PORT=80

ENV LD_LIBRARY_PATH=/usr/local/lib
ENV NODE_ENV $NODE_ENV
ENV PORT $PORT

EXPOSE $PORT

WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

CMD [ "node", "index.js" ]
