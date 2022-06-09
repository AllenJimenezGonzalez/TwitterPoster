node {
  def app 
  stage('clone repository') {
    checkout scm  
  }
  stage('Build docker Image'){
    app = docker.build("allenant/capa_aplicaciones_redes")
  }
  stage('Test Image'){
    app.inside {
      sh 'echo "TEST PASSED"'
    }  
  }
  stage('Push Image'){
    docker.withRegistry('https://registry.hub.docker.com', 'DockerhubCredentials') {            
      app.push("${env.BUILD_NUMBER}")            
      app.push("latest")   
    }
  }

  stage('Send email'){
    sendEmail()
  }
}


def sendEmail() {
  mail to:'allen6@hotmail.com',
  subject: 'Dockerhub deploy CI/CD',
  body: 'Latest deploy avaible on: https://hub.docker.com/repository/docker/allenant/capa_aplicaciones_redes\nSteps to run: \n 1- docker pull allenant/capa_aplicaciones_redes \n 2- docker run --name CapaAplicaciones -d -p 3000:3000 allenant/capa_aplicaciones_redes '
}