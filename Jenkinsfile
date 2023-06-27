pipeline {
  agent any

  environment {
    AWS_REGION = 'ap-northeast-2'
    DOCKER_REGISTRY = '106809242629.dkr.ecr.ap-northeast-2.amazonaws.com'
    CODECOMMIT_REPO_URL = 'https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/klovers-client'
    CODECOMMIT_CREDENTIALS = 'codecommit-key'
    DOCKER_IMAGE_NAME = "${DOCKER_REGISTRY}/klovers-client"
    DOCKERFILE_PATH = 'Dockerfile'
    ECR_REGISTRY_URL = "${DOCKER_REGISTRY}/klovers-client"
    CONTAINER_NAME="klovers-client"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout([
                $class: 'GitSCM',
                branches: [[name: 'main']],
                userRemoteConfigs: [[url: env.CODECOMMIT_REPO_URL, credentialsId: env.CODECOMMIT_CREDENTIALS]]
        ])
      }
    }

    stage('Build and Push') {
      steps {
        // Build the Docker image and push to ECR
        script {
          def dockerImage = docker.build(env.DOCKER_IMAGE_NAME, "-f ${env.DOCKERFILE_PATH} .")
          withCredentials([usernamePassword(credentialsId: 'aws-ecr', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
            sh 'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $DOCKER_REGISTRY'
            dockerImage.push()
          }
          }
      }
    }

    stage('Deploy') {
      steps {
        // Run the Docker container on the Linux server
        sh 'docker ps -f name=$CONTAINER_NAME -q | xargs --no-run-if-empty docker container stop'
        sh 'docker container ls -a -f name=$CONTAINER_NAME -q | xargs -r docker container rm'
        sh 'docker images --no-trunc --all --quiet --filter="dangling=true" | xargs --no-run-if-empty docker rmi'
        sh 'docker run -d --name $CONTAINER_NAME -p 3000:3000 $DOCKER_IMAGE_NAME:latest'
      }
    }
  }
}