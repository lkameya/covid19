FROM socialengine/nginx-spa:latest
COPY ./build /app 
RUN chmod -R 777 /app