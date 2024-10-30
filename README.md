# Praan Project

**Praan** is a web application with a frontend and backend that offers a way to analyze the data of p1, p2.5 and p10 value in interactive way by using graph and also user can view previous (p) parameters by switching between dates This guide will walk you through setting up the project both locally and using Docker.

## Table of Contents

- [Project Links](#project-links)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Setup](#local-setup)
  - [Clone Repositories](#1-clone-repositories)
  - [Install Dependencies](#2-install-dependencies)
  - [Run the Backend Server](#3-run-the-backend-server)
  - [Run the Frontend Server](#4-run-the-frontend-server)
- [Docker Setup](#docker-setup)
  - [Pull Docker Image for Backend](#1-pull-docker-image-for-backend)
  - [Create Docker Network](#2-create-docker-network)
  - [Run Backend Container](#3-run-backend-container)
  - [Run Frontend in Development Mode](#4-run-frontend-in-development-mode)
- [Additional Notes](#additional-notes)

---

## Project Links

- **Live Application**: [praan.merakishubh.com](https://praan.merakishubh.com)
- **Frontend Repository**: [praanClient](https://github.com/MerakiShubh/praanClient)
- **Backend Repository**: [praanServer](https://github.com/MerakiShubh/praanServer)
- **Docker Hub Container**: [merakishubh/praanserver](https://hub.docker.com/r/merakishubh/praanserver)

## Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 16.x)
- **Docker** (if using Docker setup)
- **MongoDB Atlas** account credentials
- **Cloudinary** account credentials for image storage

## Environment Variables

Create a `.env` file in the root of the backend project directory. Refer to the `.env.sample` provided in the repository for necessary variables.

### Required Environment Variables

```env
NODE_ENV=dev
PORT=5000
CORS_ORIGIN=
MONGODB_URI=<your_mongodb_uri>
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=1
HIVEMQ_BROKER_URL=
HIVEMQ_PORT=
HIVEMQ_USERNAME=
HIVEMQ_PASSWORD=
```


## Leetcode problem

- **Task - 1**: [Longest Increasing path in matrix](https://github.com/MerakiShubh/ChatCord/blob/main/Longest%20Increasing%20Path%20in%20a%20Matrix.cpp)
