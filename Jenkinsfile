pipeline {
    agent any

    stages {

        stage('seesaw back - Add Secret File') { // credentials에 저장해놓은 application.properties 파일 복사
	        steps {
    	        withCredentials([file(credentialsId: 'seesaw-application', variable: 'File')]) {
        	        script {
                        sh 'cp $File /var/jenkins_home/workspace/seesaw_back/back/seesaw/src/main/resources'
                    }
		        }
	        }
        }

        stage('seesaw back - Gradle Build') { // Gradle 빌드 스테이지: Spring Boot 프로젝트를 빌드합니다.
            steps {
                dir('back/seesaw') { // 'backend/seesaw' 디렉터리 내에서 작업을 실행합니다.
                    sh 'chmod +x gradlew' // gradlew 실행 권한 부여
                    sh './gradlew clean build -x test' // gradlew를 사용해 프로젝트를 빌드하며 테스트는 제외합니다.
                }
            }

            post {
                success {
                    echo 'gradle build success'
                }

                failure {
                    echo 'gradle build failed'
                }
            }
        }

        stage('seesaw back - Docker Build') { // Docker 이미지 빌드 스테이지: Dockerfile을 기반으로 이미지를 빌드합니다.
            steps {
                dir('back/seesaw') {
                    sh 'docker build -t seesaw_back:latest .' // 이미지를 빌드합니다
                }
            }

            post {
                success {
                    echo 'docker build success'
                }

                failure {
                    echo 'docker build failed'
                }
            }
        }

        stage('seesawbank back - Add Secret File') { // credentials에 저장해놓은 application.properties 파일 복사
	        steps {
    	        withCredentials([file(credentialsId: 'seesawbank-application', variable: 'File')]) {
        	        script {
                        sh 'cp $File /var/jenkins_home/workspace/seesawbank_back/back/seesaw/src/main/resources'
                    }
		        }
	        }
        }

        stage('seesawbank back - Gradle Build') { // Gradle 빌드 스테이지: Spring Boot 프로젝트를 빌드합니다.
            steps {
                dir('back/seesawbank') { // 'backend/seesawbank' 디렉터리 내에서 작업을 실행합니다.
                    sh 'chmod +x gradlew' // gradlew 실행 권한 부여
                    sh './gradlew clean build -x test' // gradlew를 사용해 프로젝트를 빌드하며 테스트는 제외합니다.
                }
            }

            post {
                success {
                    echo 'gradle build success'
                }

                failure {
                    echo 'gradle build failed'
                }
            }
        }

        stage('seesawbank back - Docker Build') { // Docker 이미지 빌드 스테이지: Dockerfile을 기반으로 이미지를 빌드합니다.
            steps {
                dir('back/seesawbank') {
                    sh 'docker build -t seesawbank_back:latest .' // 이미지를 빌드합니다
                }
            }

            post {
                success {
                    echo 'docker build success'
                }

                failure {
                    echo 'docker build failed'
                }
            }
        }

         stage('front - Docker Build') {
            steps {
                dir('font') {
                    sh sh "docker build -t seesaw_front:latest ." // 이미지를 빌드합니다
                }
            }

             post {
                success {
                    echo 'docker build success'
                }

                failure {
                    echo 'docker build failed'
                }
            }
        }


        stage('deploy') {// 배포 스테이지: 이전에 실행 중인 'seesawbank_back' 컨테이너를 제거하고 새로운 이미지로 컨테이너를 실행
            steps {
                // 실행중인 컨테이너 제거
                sh 'docker rm -f seesaw_back'
                sh 'docker rm -f seesawbank_back'
                sh 'docker rm -f seesaw_front'
                
                // 새로운 이미지 실행
                sh 'docker run -d --name seesaw_back -p 8080:8080 -u root seesaw_back:latest'
                sh 'docker run -d --name seesawbank_back -p 8081:8081 -u root seesawbank_back:latest'
                sh 'docker run -d --name seesaw_front -p 5000:5000 -u root seesaw_front:latest'
            }

            post {
                success {
                    echo 'deploy success'
                }

                failure {
                    echo 'deploy failed'
                }
            }
        }


        stage('Finish') { // 완료 스테이지: 더이상 사용되지 않는 Docker 이미지를 제거합니다.
            steps {
                sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}' // 사용되지 않는 이미지를 제거합니다.
            }
        }
    }
}
