[![Docker Image Version (latest by date)](https://img.shields.io/docker/v/tomarrok/docker-node-api)](https://hub.docker.com/r/tomarrok/docker-node-api)
[![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/tomarrok/docker-node-api)](https://hub.docker.com/r/tomarrok/docker-node-api)
[![Docker Pulls](https://img.shields.io/docker/pulls/tomarrok/docker-node-api)](https://hub.docker.com/r/tomarrok/docker-node-api)
[![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/tomarrok/docker-node-api)](https://hub.docker.com/r/tomarrok/docker-node-api)

# Quick reference
- **Maintained by**: [Tomarrok](https://github.com/tomarrok)
- **Where to get help**: [the Github Documentation](https://github.com/tomarrok/docker-node-api), [Node.js](https://nodejs.org/en/docs/), [Express](https://expressjs.com)

# Supported tags and respective `Dockerfile` links
- `latest`
- `1.1.0`
- `1.0.0`, `1.0.8`, `1.0.9`, `1.0.10`, `1.0.17`, `1.0.19`, `1.0.20`, `1.0.21`, `1.0.22`

# Quick reference (cont.)
- **Where to file issues**: [the Github Issues](https://github.com/tomarrok/docker-node-api/issues)
- **Supported architectures**: ([more info](https://github.com/docker-library/official-images#architectures-other-than-amd64)) `amd64`, `arm32v6`, `arm32v7`, `arm64v8`, `i386`, `ppc64le`, `s390x`
- **Source code**: [Github `tomarrok/docker-node-api`](https://github.com/tomarrok/docker-node-api)

# What is Node.js?
Node.js is a software platform for scalable server-side and networking applications. See [Node.js website](https://nodejs.org/) for up-to-date documentation about Node.js.

# About REST API
REST API (Representational State Transfer Application Program) is an architecture style allows software to communicate with each other over a network or the same device. Most often developers use REST APIs to create web services. REST uses HTTP methods to retrieve and publish data between a client and a server.

# How to use this image?
You have two ways to use this image :
- Use `docker pull tomarrok/docker-node-api` command.
- Download the [Github repository](https://github.com/tomarrok/docker-node-api) and use `docker build .`.

# Configuration
By default, REST API name and listening port are provided by the image Dockerfile with the following parameters :
- `**REST_API_NAME**` : "REST API App"
- `**REST_API_PORT**` : 5000

However, you could provide your own REST API parameters by downloading this image on Github and modifying the `config/app.config.js` file parameters.
```
module.exports = [{
    REST_API_NAME: 'REST API App',
    REST_API_PORT: 5000
}]
```

# License
See [this project license](https://github.com/tomarrok/docker-node-api/blob/master/LICENSE) on Github.
