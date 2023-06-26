pipeline {
  agent any

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
          sh 'docker build -t klovers-client:latest .'
//          withCredentials([[
//                $class: "AmazonWebServicesCredentialsBinding",
//                credentialsId: "klovers-credential",
//                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
//                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
//            ]]) {
              docker.withRegistry('https://106809242629.dkr.ecr.ap-northeast-2.amazonaws.com', 'ecr:ap-northeast-2:aws-ecr') {
                  // Your pipeline steps that require Docker login
                  sh 'docker push 106809242629.dkr.ecr.ap-northeast-2.amazonaws.com/klovers-client:latest'
              }
              // sh 'docker login -u AWS -p "$ECR_CREDENTIALS" 106809242629.dkr.ecr.ap-northeast-2.amazonaws.com'
          }
//        }
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