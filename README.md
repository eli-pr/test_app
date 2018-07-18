# This will eventually be the Degaas API

This repo contains a node.js API for Degaas. It has a single endpoint ('/').

Upon receiving a PUT request, it uses the `s3_bucket_name` field of that
request's body to create a CloudFormation stack containing a single S3 bucket
in AWS, using Stacker.

Eventually, this repo's master branch will be hooked to a codepipeline that automatically
deploys this API to ECS Fargate.

## Getting Started (local development)

[Prereqs](#prerequisites): Python (2.7), Virtualenv, npm, node

```
$ virtualenv <venv>
$ . <venv>/bin/activate
$ pip install stacker

$ git clone https://github.com/eli-pr/test_app.git
$ cd test_app
$ npm i
$ npm start
```

### Prerequisites

If you don't have [homebrew](https://brew.sh/), get it. If you are using windows, [install python](https://www.python.org/downloads/) yourself.

```
$ brew install python
$ pip install -U virtualenv
```

## Notes:

- make sure to set all executable bits on shell scripts
- going to need to change shell script to reflect different config.yaml (stack name)
- add degaas-stacker repo inside here to replace ./stacker when ECS running
- change productOps/degaas-stacker to degaas-api, put this code there.
