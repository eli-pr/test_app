from stacker.blueprints.base import Blueprint
from stacker.blueprints.variables.types import TroposphereType
from troposphere import s3, sns

class Buckets(Blueprint):

    VARIABLES = {
        "SingleBucket": {
            "type": TroposphereType(s3.Bucket),
            "description": "A single S3 bucket",
        },
        "SingleOptionalSubscription": {
            "type": TroposphereType(sns.Subscription, optional=False),
            "description": "A single, optional SNS subscription designation"
        }
    }

    def create_template(self):
        t = self.template
        variables = self.get_variables()

        single_bucket = variables["SingleBucket"]
        t.add_resource(single_bucket)
