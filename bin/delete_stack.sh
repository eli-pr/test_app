# deletes an AWS CloudFormation stack using stacker

echo "deleting current stack (stack name is stored in degaas.env"
cd ./stacker/
stacker destroy --force ./environments/degaas.env config.yaml

echo "done"