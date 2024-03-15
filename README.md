# simple-nodejs-mongodb-test

This project contains a simple Node.js application designed to test connectivity to a MongoDB instance running in an OpenShift environment. The application attempts to connect to the MongoDB database using credentials provided through OpenShift secrets and exposes a simple HTTP endpoint that reflects the connection status.

## Prerequisites

- An active OpenShift cluster
- `oc` CLI (OpenShift Command Line Interface) installed and configured
- A MongoDB instance running in the same OpenShift cluster
- Docker installed and configured on your machine
- Access to a container registry where you can push the Docker image

### Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/jemaltahir/simple-nodejs-mongodb-test.git
cd simple-nodejs-mongodb-test
```
### Build and Push the Docker Image

Navigate to the project directory and build the Docker image:

```bash
docker build -t <your-registry>/mongodb-test:1.0 .
```

Push the image to your container registry:

```bash
docker push <your-registry>/mongodb-test:1.0
```
Apply the OpenShift configurations:

```bash
oc apply -f nodejs-app-deployment.yaml
oc apply -f nodejs-app-service.yaml
oc apply -f nodejs-app-route.yaml
```