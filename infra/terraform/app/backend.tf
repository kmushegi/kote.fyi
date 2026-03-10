terraform {
  backend "s3" {
    bucket         = "kote-fyi-terraform-state-544015794540"
    key            = "app/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "kote-fyi-terraform-locks"
  }
}
