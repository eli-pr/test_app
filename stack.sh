# Takes in a single argument: the name of an s3 bucket
# Creates a .env file called stack.env that contains 2 assignments:
#   1. environment: degaas # this will be hard coded
#   2. s3_bucket_name: <name>
# <name> is the script's only arg.
# Calls `stacker build environments/stack.env config.yaml`

# 1) check for single arg
# 2) create env file
# 3) run stacker