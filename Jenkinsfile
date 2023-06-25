pipeline {
    agent any
    stages {

        stage('docker build'){
            steps{
                script{
                    docker.build('kifarm-front')
                }
            }
        }

        stage('docker run'){
            steps{
                sh 'docker ps -f name=kifarm-front -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -f name=kifarm-front -q | xargs -r docker container rm'
                sh 'docker images --no-trunc --all --quiet --filter="dangling=true" | xargs --no-run-if-empty docker rmi'
                sh 'docker run -d --name kifarm-front -p 3000:3000 kifarm-front:latest'

            }
        }

    }
}