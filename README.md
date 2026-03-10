# kote.fyi

Monorepo for the personal site and its small AWS backend.

Layout:

- `site/`: static website files
- `infra/`: infrastructure docs and Terraform

Current AWS target account:

- `kote-infra` (`544015794540`)

Terraform flow:

1. Apply `infra/terraform/bootstrap` once to create the remote state bucket and lock table.
2. Apply `infra/terraform/app` for the public API and DynamoDB table.

Current API:

- `GET /health`
- `PUT /hi`
