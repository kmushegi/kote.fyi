# Terraform

Two-stack layout:

- `bootstrap/`: create the S3 backend bucket and lock table once with local state
- `app/`: create the application stack with the S3 backend

Bootstrap:

```bash
cd /Users/kote/code/kote.fyi/infra/terraform/bootstrap
terraform init
terraform apply
```

App:

```bash
cd /Users/kote/code/kote.fyi/infra/terraform/app
terraform init
terraform apply
```

Use the AWS profile `kote-infra-bootstrap` for both commands.

Budget note:

- The `app/` stack defaults `enable_budget = false`.
- In an AWS Organization, budgets for linked accounts must be created from the management account.
