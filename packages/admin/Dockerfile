FROM nginx:stable-alpine
COPY nginx/nginx.ecommerce.conf /etc/nginx/conf.d/
#COPY nginx/mime.types /etc/nginx/
COPY nginx/nginx.conf /etc/nginx/
COPY dist /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
