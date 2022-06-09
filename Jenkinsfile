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
}