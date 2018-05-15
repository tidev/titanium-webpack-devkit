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
    sh 'retire -p -n'
    sh 'nsp check'
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
