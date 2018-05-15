#! groovy
library 'pipeline-library'

def publishableBranches = ['master']

node('node && npm && npm-publish && nsp && retirejs') {
  stage('Checkout') {
    checkout scm
  }
  stage('Install dependencies') {
    sh 'npm install'
  }
  stage('Security') {
    sh 'npm ci --production'
    // Scan for NSP and RetireJS warnings
    sh 'npx nsp check --reporter summary --warn-only'

    // FIXME We already run 'retire' as part of appc-js grunt task in npm test. Can we just use that output?
    sh 'npx retire --exitwith 0'

    step([$class: 'WarningsPublisher', canComputeNew: false, canResolveRelativePaths: false, consoleParsers: [[parserName: 'Node Security Project Vulnerabilities'], [parserName: 'RetireJS']], defaultEncoding: '', excludePattern: '', healthy: '', includePattern: '', messagesPattern: '', unHealthy: ''])
  }
  stage('Unit tests') {
    sh 'npm test'
  }
  stage('Publish') {
    //if(publishableBranches.contains(env.BRANCH_NAME)) {
      sh 'lerna publish --skip-git --skip-npm --yes --conventional-commits'
    //}
  }
}
