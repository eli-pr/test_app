# deletes an AWS CloudFormation stack using stacker

if [ $# -ne 2 ]; then
  echo "Usage: ./delete_stack.sh <stack name> <bucket name>"
  exit 1
fi

echo "creating degaas.env file ..."
cd ./stacker/

echo "environment: $1" > ./environments/degaas.env
echo "s3_bucket_name: $2" >> ./environments/degaas.env

echo "\nrunning stacker (deleting stack) ..."
stacker destroy --force ./environments/degaas.env config.yaml

echo "done"