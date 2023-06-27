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
  }

  stages {
    stage('Checkout') {
      steps {
        // Checkout code from CodeCommit
        git credentialsId: 'codecommit-key', url: 'https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/klovers-client', branch: 'main'
      }
    }

    stage('Build and Push') {
      steps {
        // Build the Docker image and push to ECR
        script {
        // sh 'docker build -t klovers-client:latest .'
          def dockerImage = docker.build(env.DOCKER_IMAGE_NAME, "-f ${env.DOCKERFILE_PATH} .")
          withCredentials([usernamePassword(credentialsId: 'aws-ecr', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
            sh 'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $DOCKER_REGISTRY'
            docker.withRegistry(env.DOCKER_REGISTRY, 'ecr:ap-northeast-2') {
              dockerImage.push()
            }
          }
/*              docker.withRegistry('https://106809242629.dkr.ecr.ap-northeast-2.amazonaws.com', 'aws-ecr') {
                  // Your pipeline steps that require Docker login
                  // sh 'aws ecr get-login-password --region ap-northeast-2 | docker login -u AWS -p $(aws ecr get-login-password --region ap-northeast-2) 106809242629.dkr.ecr.ap-northeast-2.amazonaws.com'
                  sh 'docker push 106809242629.dkr.ecr.ap-northeast-2.amazonaws.com/klovers-client:latest'
              }*/
          }
      }
    }

    stage('Deploy') {
      steps {
        // Run the Docker container on the Linux server
        sh 'docker run -d -p 3000:3000 106809242629.dkr.ecr.ap-northeast-2.amazonaws.com/klovers-client:latest'
      }
    }
  }
}