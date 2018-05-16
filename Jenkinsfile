#! groovy
library 'pipeline-library'

def publishableBranches = ['master']
def nodeVersion = '8.9.1'
def npmVersion = '5.7.1'

timestamps {
  node('(osx || linux) && git && npm-publish') {
    nodejs(nodeJSInstallationName: "node ${nodeVersion}") {
      ansiColor('xterm') {
        stage('Checkout') {
          checkout([$class: 'GitSCM', branches: [[name: '**']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'LocalBranch', localBranch: '**']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'f63e8a0a-536e-4695-aaf1-7a0098147b59', url: 'https://github.com/appcelerator/titanium-webpack-devkit.git']]])
          ensureNPM(npmVersion)
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
            sh 'npm run lerna-publish'
            pushGit(name: env.BRANCH_NAME)
          //}
        }
      }
    }
  }
}
