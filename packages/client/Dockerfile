FROM nginx:stable-alpine
COPY ./nginx/entrypoint.sh /usr/share/nginx/
COPY ./nginx/nginx.ecommerce.conf /etc/nginx/conf.d/
COPY dist /usr/share/nginx/html/
RUN chmod +x /usr/share/nginx/entrypoint.sh
ENTRYPOINT ["sh", "/usr/share/nginx/entrypoint.sh"]
