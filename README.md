# kote.fyi

Monorepo for the personal site and its small AWS backend.

Layout:

- `site/`: minimal Next.js app for the website
- `infra/`: infrastructure docs and Terraform

Current AWS target account:

- `kote-infra` (`544015794540`)

Terraform flow:

1. Apply `infra/terraform/bootstrap` once to create the remote state bucket and lock table.
2. Apply `infra/terraform/app` for the public API and DynamoDB table.

Current API:

- `GET /health`
- `PUT /hi`

Vercel:

- Create a Vercel project from this repo
- Set the project root directory to `site`
- Vercel will detect Next.js automatically
