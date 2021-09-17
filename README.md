# url-shortener

[![Build Status](https://app.travis-ci.com/DaCurse/url-shortener.svg?branch=master)](https://app.travis-ci.com/DaCurse/url-shortener)

## Motivation

This project is a URL Shortener made using [Lerna](https://lerna.js.org/), [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/#/), [React](https://reactjs.org/), [material-ui](https://next.material-ui.com/) and [React Query](https://react-query.tanstack.com/).

I made it mostly for practice and to get familliar with some specific concepts:

- Working with a monorepo
- Testing a NestJS app
- Using React with TypeScript and material-ui
- Working with react-query
- Deploying the whole app using Docker

The app is currently deployed on my website at https://url.dacurse.xyz/, using `docker-compose`, the rest of my website's configuration can be found [here](https://github.com/dacurse/website).

## Running the app

### Migrating database

To create the database, we can run the provided migrations.

Clone and cd into the repository:

```
git clone https://github.com/DaCurse/url-shortener.git
cd url-shortener
```

Install dependencies:

```
yarn
```

Create an empty file for your database:

```
mkdir /tmp/data
touch /tmp/data/db.sqlite
```

cd into the backend package and pass the path to your database in `DB_PATH`:

```
cd packages/backend
NODE_ENV=production DB_PATH=/tmp/data/db.sqlite yarn typeorm migration:run
```

Now your database should have the required structure for the app to work.

### Docker

You can pull a pre-built image from Docker Hub:

```
docker pull dacurse0/url-shortener
```

Or build one yourself:

```
docker build https://github.com/DaCurse/url-shortener.git -t dacurse0/url-shortener:latest
```

#### Running the image

Make sure to mount the directory with your database which should be named `db.sqlite` (In this example `/tmp/data` is used).

```
docker run -d \
 --restart unless-stopped \
 --name url-shortener -p 80:80 \
 --mount type=bind,source=/tmp/data,target=/data \
 dacurse0/url-shortener:latest
```

Or with `docker-compose`:

```yml
---
version: '2.1'
services:
  url:
    image: dacurse0/url-shortener:latest
    container_name: url-shortener
    restart: unless-stopped
    volumes:
      - /tmp/data:/data
    ports:
      - 80:80
```
