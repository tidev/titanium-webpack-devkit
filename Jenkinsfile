#! groovy
library 'pipeline-library'

def publishableBranches = ['master']
def nodeVersion = '10.15.0'
def npmVersion = 'latest'

timestamps {
  node('(osx || linux) && git && npm-publish') {
    nodejs(nodeJSInstallationName: "node ${nodeVersion}") {
      ansiColor('xterm') {
        stage('Checkout') {
          checkout([
            $class: 'GitSCM',
            branches: scm.branches,
            extensions: scm.extensions + [[$class: 'CleanBeforeCheckout'], [$class: 'LocalBranch', localBranch: "**"]],
            submoduleCfg: [],
            userRemoteConfigs: scm.userRemoteConfigs
          ])
          ensureNPM(npmVersion)
        }
        stage('Security') {
          // TODO: Add security checks for the actual packages
          //step([$class: 'WarningsPublisher', canComputeNew: false, canResolveRelativePaths: false, consoleParsers: [[parserName: 'Node Security Project Vulnerabilities'], [parserName: 'RetireJS']], defaultEncoding: '', excludePattern: '', healthy: '', includePattern: '', messagesPattern: '', unHealthy: ''])
        }
        stage('Unit tests') {
          //sh 'npm test'
        }
        if(publishableBranches.contains(env.BRANCH_NAME)) {
          stage('Publish') {
            gitRemoteWithCredentials {
              sh 'npm run lerna-publish'
            }
          }
        }
      }
    }
  }
}
