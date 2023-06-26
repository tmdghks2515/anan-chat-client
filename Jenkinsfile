pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        // Checkout code from CodeCommit
        git credentialsId: 'codecommit-key', url: 'https://git-codecommit.ap-northeast-2.amazonaws.com/v1/repos/klovers-client'
      }
    }

    stage('Build and Push') {
      steps {
        // Build the Docker image and push to ECR
        script {
          sh 'docker build -t klovers-client:${env.BUILD_NUMBER} .'
          withCredentials([string(credentialsId: 'codecommit-key', variable: 'codecommit-key')]) {
            sh 'docker login -u AWS -p "$codecommit-key" 106809242629.dkr.ecr.ap-northeast-2.amazonaws.com'
            sh 'docker push 106809242629.dkr.ecr.ap-northeast-2.amazonaws.com/klovers-client:${env.BUILD_NUMBER}'
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        // Run the Docker container on the Linux server
        sh 'docker run -d -p 3000:3000 106809242629.dkr.ecr.ap-northeast-2.amazonaws.com/klovers-client:${env.BUILD_NUMBER}'
      }
    }
  }
}