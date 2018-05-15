#! groovy
library 'pipeline-library'

def publishableBranches = ['master']

node('node && npm && npm-publish && nsp && retirejs') {
  stage('Checkout') {
    checkout scm
    currentBuild.displayName = "#${packageVersion}-${currentBuild.number}"
  }
  stage('Install dependencies') {
    sh 'npm install'
  }
  stage('Security') {
    sh 'retire -p -n'
    sh 'nsp check'
  }
  stage('Unit tests') {
    sh 'npm test'
  }
  stage('Publish') {
    if(publishableBranches.contains(env.BRANCH_NAME)) {
      script {
        def newVersion = input(
          id: 'newVersion',
          message: 'Select a new version',
          parameters: [
            [
              $class: 'ChoiceParameterDefinition',
              defaultValue: 'strDef',
              description:'describing choices',
              name:'nameChoice',
              choices: "major\nminor\npatch"
            ]
          ])
      }

      sh 'lerna publish --skip-git --skip-npm --yes --cd-version=${newVersion}'
    }
  }
}
