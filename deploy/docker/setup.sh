#!/bin/bash
docker exec -i tracker_php bash -c "cd backend && composer install"
docker exec -i tracker_php bash -c "mkdir -p backend/var/"
docker exec -i tracker_php bash -c "chmod -R 0777 backend/var/"
docker exec -i tracker_php bash -c "cd backend && ./bin/console d:m:m"
docker exec -i tracker_php bash -c "cd backend && ./bin/console app:create:user starsfm@gmail.com"

docker exec -i tracker_front bash -c "npm ci"

#docker exec -i radar_php bash -c "mkdir -p backend/public/vendor/ace && cp -a /var/www/ace/ace-builds-1.2.6/* /var/www/pep/backend/public/vendor/ace"