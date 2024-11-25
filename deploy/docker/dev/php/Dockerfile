#
# Image versions
#
ARG PHP_VERSION=7.4.33
# ARG PHP_VERSION=7.2.24
ARG INSTALLER_DIGEST=sha256:991c3c4b0f3b9888ab6506fe6eba42305efdc71d302fb09f2ed6ebfa6e085197

# https://github.com/mlocati/docker-php-extension-installer
FROM mlocati/php-extension-installer@${INSTALLER_DIGEST} as php-extension-installer
FROM php:${PHP_VERSION}-fpm-buster

# Install PHP extensions
COPY --from=php-extension-installer /usr/bin/install-php-extensions /usr/bin/
RUN docker-php-ext-install calendar
RUN install-php-extensions \
        bcmath \
        gd \
        imap \
        intl \
        soap \
        xmlrpc \
        zip \
    && rm -rf /usr/bin/install-php-extensions


# Install packages
RUN apt-get update && apt-get install -y git libgmp-dev libpng-dev zip unzip wget

# Install php extentions
RUN docker-php-ext-install pdo pdo_mysql gmp gd

ENV COMPOSER_ALLOW_SUPERUSER 1
# Install composer
RUN php -r "readfile('https://getcomposer.org/installer');" | php\
    && chmod +x composer.phar\
    && mv composer.phar /usr/local/bin/composer

# Install php xdebug extension
ADD https://pecl.php.net/get/xdebug-3.1.6 /tmp/xdebug.tar.gz
RUN mkdir -p /usr/src/php/ext/xdebug\
    && tar xf /tmp/xdebug.tar.gz -C /usr/src/php/ext/xdebug --strip-components=1\
    && docker-php-ext-configure xdebug\
    && docker-php-ext-install xdebug\
    && rm /tmp/xdebug.tar.gz

RUN mkdir -p /var/www/tracker/backend/var
RUN chmod -R 0777 /var/www/tracker/backend/var
# RUN apt install mc

WORKDIR /var/www/tracker
#
# # Setup norzechowicz/aceeditor-bundle
# RUN mkdir -p /var/www/ace \
#     && wget -O v1.2.6.tar.gz https://github.com/ajaxorg/ace-builds/archive/v1.2.6.tar.gz \
#     && tar -xvf v1.2.6.tar.gz -C /var/www/ace && rm v1.2.6.tar.gz
#
# # Setup pdftk
# RUN wget -O /usr/bin/pdftk "https://gitlab.com/api/v4/projects/5024297/packages/generic/pdftk-java/v3.3.2/pdftk" \
#     && chmod a+x /usr/bin/pdftk