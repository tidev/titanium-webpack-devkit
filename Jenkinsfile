#! groovy
library 'pipeline-library'

def publishableBranches = ['master']
def nodeVersion = '8.9.1'

timestamps {
  node('(osx || linux) && git && npm-publish') {
    nodejs(nodeJSInstallationName: "node ${nodeVersion}") {
      ansiColor('xterm') {
        stage('Checkout') {
          checkout scm
        }
        stage('Security') {
          // TODO: Add security checks for the actual packages
          //step([$class: 'WarningsPublisher', canComputeNew: false, canResolveRelativePaths: false, consoleParsers: [[parserName: 'Node Security Project Vulnerabilities'], [parserName: 'RetireJS']], defaultEncoding: '', excludePattern: '', healthy: '', includePattern: '', messagesPattern: '', unHealthy: ''])
        }
        stage('Unit tests') {
          //sh 'npm test'
        }
        stage('Publish') {
          //if(publishableBranches.contains(env.BRANCH_NAME)) {
            sh 'npm ci'
            sh 'lerna publish --skip-git --skip-npm --yes --conventional-commits'
          //}
        }
      }
    }
  }
}
