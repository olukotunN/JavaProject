pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/olukotunN/JavaProject', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                // Build the Java project using Maven
                sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                // Run tests
                sh 'mvn test'
            }
            post {
                always {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Order Service Docker Image') {
                    steps {
                        script {
                            sh 'docker build -t your-dockerhub-username/order-service:latest -f order-service/Dockerfile .'
                        }
                    }
                }
                stage('Build Product Service Docker Image') {
                    steps {
                        script {
                            sh 'docker build -t your-dockerhub-username/product-service:latest -f product-service/Dockerfile .'
                        }
                    }
                }
                stage('Build User Service Docker Image') {
                    steps {
                        script {
                            sh 'docker build -t your-dockerhub-username/user-service:latest -f user-service/Dockerfile .'
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            parallel {
                stage('Push Order Service Docker Image') {
                    steps {
                        script {
                            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                            sh 'docker push your-dockerhub-username/order-service:latest'
                        }
                    }
                }
                stage('Push Product Service Docker Image') {
                    steps {
                        script {
                            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                            sh 'docker push your-dockerhub-username/product-service:latest'
                        }
                    }
                }
                stage('Push User Service Docker Image') {
                    steps {
                        script {
                            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                            sh 'docker push your-dockerhub-username/user-service:latest'
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'kubectl apply -f k8s/order-service.yaml'
                    sh 'kubectl apply -f k8s/product-service.yaml'
                    sh 'kubectl apply -f k8s/user-service.yaml'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true
        }
        success {
            echo 'Build, push, and deployment succeeded!'
        }
        failure {
            echo 'Build, push, or deployment failed!'
        }
    }
}
