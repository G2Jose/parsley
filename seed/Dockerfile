FROM node:latest

RUN npm install -g babel-cli
RUN mkdir /app/
COPY . /app/

WORKDIR /app/

CMD while true; do if sleep 10 && curl 'elasticsearch:9200'; then babel-node seed.js; curl -XPUT "http://elasticsearch:9200/parsley/_settings" -d '{ "index" : { "max_result_window" : 500000 } }'; break; fi; done

EXPOSE 9200
