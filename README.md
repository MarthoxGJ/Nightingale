# Nightingale

Nightingale is a simple, data visualizer for emotional data from songs.

## Requirements

- [Docker](https://docs.docker.com/get-docker/) (Optional)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Node.js](https://nodejs.org/en/download/)

## Development

### Using Docker

To build and run the project for the first time, use the following command:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

To build the project without running it, use the following command:

```bash
docker-compose -f docker-compose.dev.yml build
```

Once the project has been built, you can run it using the following command:

```bash
docker-compose -f docker-compose.dev.yml up
```

### Running

To run the project, use the following command:

```bash
yarn start
```

### Using Docker

To build and run the project for the first time, use the following command:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

To build the project without running it, use the following command:

```bash
docker-compose -f docker-compose.prod.yml build
```

Once the project has been built, you can run it using the following command:

```bash
docker-compose -f docker-compose.prod.yml up
```
