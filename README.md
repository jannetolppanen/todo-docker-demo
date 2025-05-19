#### running the demo todo-app
- in terminal, navigate to the root of this project and try these commands:

run container
`docker-compose up 

stop container, the container is not removed
`docker-compose  stop`

delete container, data is preserved
`docker compose down`

delete container and volumes
`docker-compose down -v`

When the container is running you can visit the site http://localhost:3000 to see it in action.


---

#### what is docker?
A way to containerize software into one package. The application runs inside a "container" and everyone who runs the container has the same experience. Should remove problems about software working fine on one pc and not working on for someone else.

#### installing docker
- Docker has great documentation about installing on different operating systems. You can either choose a terminal mode or install docker desktop if you prefer a gui
	- https://docs.docker.com/engine/install/
- To find premade images and run your first container visit docker hub
	- https://hub.docker.com/
#### docker image
- Pre-built software package that contains everything needed to run said software.
- Can be downloaded from [Docker Hub](https://hub.docker.com/) or built by using our own Dockerfiles
#### Dockerfile
- Instructions on how to create a docker image.
- `FROM`: What base image to use (example: `FROM node:18-alpine`)
- `WORKDIR`: Working directory of the container
- `COPY`: Copy files from the host machine (our own pc) to the container (virtual pc)
- `RUN`: Run commands during the build process
- `ENV`: Set enviroment variables
- `EXPOSE`: Ports that are used. `EXPOSE 3000:8080` means we are listening to port 3000 on the container and redirecting it to port 8080 on the host machine
- `CMD`: Command that is used after the container is started.
	- `CMD ["npm", "start"]` is the preferred way
		- Can be overridden when the container is started `docker run -it my-node-app npm test`
- A Dockerfile can be turned into an image using `docker build`

#### container
Container is a running instance of an image. You can create a dockerfile and turn it into an image, after running the image you now have a container with all the things defined in the dockerfile

#### docker-compose
- A tool to manage multiple docker containers using a yaml file `docker-compose.yml`
- Defines all the containers needed for the whole project
- Sets up env variables, ports and dependencies
- Volumes for storing data
- Networks for connections between different containers

#### volume
- When we delete a container everything on it disappears. If we want to retain some of that data we can use volumes to fix this. 
- We create a volume (basically a folder) that exists outside the container and we mount the volume into our container. Now our container has access to this folder, the folder is outside the container but the container sees it just like another folder and can read/write into it.
- When we delete the container, the volume still stays because it was outside the container

#### network
- When we create multiple containers for a project we need them 'see' each other. This is when networks come in handy
- If we have a database, a backend and a frontend application, we can use 3 different containers, each running a seperate duty and put them on the same docker network so they can still communicate between each other.

#### example todo-app 

#### folder structure
- `backend`
	- `public`
		- index.html
	- app.js
	- db.js
	- Dockerfile
	- package.json
- `database`
	- init.sql
- docker-compose.yml

- Simple todo app with node backend and mariadb
- Backend folder contains code (unimportant) and the important ==Dockerfile==
```
# Use a prebuilt image of alpine linux running node
FROM node:18-alpine  

# Working directory in the container. Commands given will be given in this folder
WORKDIR /app  

# Copy from package.json from this folder to the root folder of the container
COPY package*.json ./  

# Basic command to install the node project
RUN npm install  

# Copy local files in the Dockerfile directory to the working directory of the container
COPY . .  

# Use port 3000
EXPOSE 3000  

# Run this command after the build and start the node server
CMD ["npm", "start"]
```
- root folder contains ==docker-compose.yml==
```
version: '3'

  

services:

  # MariaDB

  db:
	# using official mariadb image from dockerhub
    image: mariadb:10.6

    container_name: todo-mariadb

    restart: always

	# set up env variables 
    environment:

      MYSQL_ROOT_PASSWORD: password

      MYSQL_DATABASE: tododb

      MYSQL_USER: todouser

      MYSQL_PASSWORD: todopass

	# create volumes to preserve data
    volumes:

      - mariadb_data:/var/lib/mysql

      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql

	# direct host port 3306 to containers port 3306
    ports:

      - "3306:3306"

	# define the network docker creates so the 2 containers can see each other
    networks:

      - todo-network

  

  # Node.js

  app:

    build:
	# what folder to use when building
      context: ./backend

    container_name: todo-node

    restart: always

	# depends on db service so waits until that service is up
    depends_on:

      - db

    environment:

      DB_HOST: db

      DB_USER: todouser

      DB_PASSWORD: todopass

      DB_NAME: tododb

      PORT: 3000

    ports:

      - "3000:3000"

    networks:

      - todo-network

  

networks:

  todo-network:

    driver: bridge

  

volumes:

  mariadb_data:
```


#### Docker desktop
- Docker can be ran from the terminal or using a gui
- When using docker desktop you can still use the terminal, it opens up from the bottom right of the window
- Try running the container and look the different pages (Containers, Images, Volumes) to see what happens.
