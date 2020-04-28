# Lambda to Kinesis

This project serves as boilerplate outlining how to design and test out a Typescript Lambda. This code is tested by jest and uses git hooks to require code to pass tests prior to being committed to your local repo.

Technology this boilerplate leverages:
* Serverless Framework - for management of AWS services and deployments to AWS
* Typescript - for transpiling down to JS for efficient runtimes as well as writing out strongly typed source
* Jest - for testing code and code coverage
* Husky - for enforcing testing prior to commits (git hook wrapper)
