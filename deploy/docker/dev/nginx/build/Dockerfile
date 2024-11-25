FROM nginx:latest

# Install prerequisites
RUN apt-get update && apt-get install -y \
    gnupg2 \
    ca-certificates \
    lsb-release \
    apt-transport-https \
    curl

# Add Nginx official repository
RUN echo "deb http://nginx.org/packages/debian/ `lsb_release -cs` nginx" \
    > /etc/apt/sources.list.d/nginx.list && \
    curl -fsSL https://nginx.org/keys/nginx_signing.key | apt-key add -

# Update package lists and install Nginx
RUN apt-get update

# Remove default site configuration
RUN rm -f /etc/nginx/conf.d/default.conf
RUN rm -f /etc/nginx/sites-enabled/default