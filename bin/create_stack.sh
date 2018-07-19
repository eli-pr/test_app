# v0.0.1
# Runs stacker. Creates an AWS CloudFormation stack containing a single bucket.
# Takes in 2 args: the name of the stack, and the name of the bucket.

if [ $# -ne 2 ]; then
  echo "Usage: ./create_stack.sh <stack name> <bucket name>"
  exit 1
fi

echo "creating degaas.env file ..."
cd ./stacker/

echo "environment: $1" > ./environments/degaas.env
echo "s3_bucket_name: $2" >> ./environments/degaas.env

echo "\nrunning stacker (creating stack) ..."
stacker build ./environments/degaas.env config.yaml

echo "done"