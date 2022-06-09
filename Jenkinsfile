#!groovy
pipeline {
  stages{
    def app 
    stage('clone repository') {
      agent any
      checkout scm  
    }
    stage('Build docker Image'){
      agent any
      app = docker.build("allenant/capa_aplicaciones_redes")
    }
    stage('Test Image'){
      agent any
      app.inside {
        sh 'echo "TEST PASSED"'
      }  
    }
    stage('Push Image'){
      agent any
      docker.withRegistry('https://registry.hub.docker.com', 'DockerhubCredentials') {            
        app.push("${env.BUILD_NUMBER}")            
        app.push("latest")   
      }
    }
    stage('Docker Build') {
      agent any
      steps {
        sh 'docker pull allenant/capa_aplicaciones_redes'
        sh 'docker run --name CapaAplicaciones -d -p 3000:3000 allenant/capa_aplicaciones_redes'
      }
    }
  }

  post {
      always {
          mail to:'allen6@hotmail.com;rojo@tec.ac.cr',
          subject: 'Dockerhub deploy CI/CD',
          body: 'Latest deploy avaible on: https://hub.docker.com/repository/docker/allenant/capa_aplicaciones_redes\nSteps to run: \n 1- docker pull allenant/capa_aplicaciones_redes \n 2- docker run --name CapaAplicaciones -d -p 3000:3000 allenant/capa_aplicaciones_redes '
      }
  }
}


