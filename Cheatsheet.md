### Images

| Command         | Description                    | Example                      |
| --------------- | ------------------------------ | ---------------------------- |
| `docker pull`   | Download image from Docker Hub | `docker pull nginx:latest`   |
| `docker build`  | Build image from Dockerfile    | `docker build -t test-app .` |
| `docker images` | List all images                | `docker images`              |

### Containers

| Command          | Description                              | Example                          |
| ---------------- | ---------------------------------------- | -------------------------------- |
| `docker run`     | Create and start a container             | `docker run -d -p 8080:80 nginx` |
| `docker ps`      | List running containers                  | `docker ps`                      |
| `docker ps -a`   | List all containers, also stopped        | `docker ps -a`                   |
| `docker stop`    | Stop a running container                 | `docker stop test-app            |
| `docker start`   | Start a stopped container                | `docker start test-app`          |
| `docker restart` | Restart a container                      | `docker restart test-app`        |
| `docker rm`      | Remove a container                       | `docker rm test-app              |
| `docker logs`    | View container logs                      | `docker logs test-app            |
| `docker exec`    | Execute a command in a running container | `docker exec -it test-app bash`  |

### Flags

|Option|Description|Example|
|---|---|---|
|`-d`|Run container in background (detached mode)|`docker run -d nginx`|
|`-p`|Map port (HOST:CONTAINER)|`docker run -p 8080:80 nginx`|
|`-v`|Mount a volume|`docker run -v /host/path:/container/path nginx`|
|`--name`|Assign a name to the container|`docker run --name web_server nginx`|
|`-e`|Set environment variables|`docker run -e DB_HOST=db nginx`|
|`--network`|Connect to a network|`docker run --network my_network nginx`|

## Docker Compose

| Command                | Description                               | Example                      |
| ---------------------- | ----------------------------------------- | ---------------------------- |
| `docker-compose up`    | Create and start containers               | `docker-compose up -d`       |
| `docker-compose down`  | Stop and remove containers                | `docker-compose down`        |
| `docker-compose stop`  | Stop containers without removing contaner | `docker-compose stop`        |
| `docker-compose start` | Start stopped containers                  | `docker-compose start`       |
| `docker-compose ps`    | List containers                           | `docker-compose ps`          |

## Dockerfile

| Instruction | Description                                                                                                                                    | Example                   |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `FROM`      | Base image to start from                                                                                                                       | `FROM node:18-alpine`     |
| `WORKDIR`   | Set working directory                                                                                                                          | `WORKDIR /app`            |
| `COPY`      | Copy files from host to container                                                                                                              | `COPY . .`                |
| `RUN`       | Execute commands during build process                                                                                                          | `RUN npm install`         |
| `EXPOSE`    | ==Container needs this port, note that it does not really open the port. Port needs to be opened with a -p flag or in the docker-compose.yml== | `EXPOSE 3000`             |
| `CMD`       | Default command to run after container starts                                                                                                  | `CMD ["npm", "start"]`    |
| `ENV`       | Set env variables                                                                                                                              | `ENV NODE_ENV=production` |
