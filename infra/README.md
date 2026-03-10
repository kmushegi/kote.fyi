# kote.fyi infra

This monorepo keeps the website in `site/` and the AWS stack in `infra/terraform/`.

AWS layout:

- `bootstrap/`: one-time state bucket and lock table bootstrap with local state
- `app/`: the actual application stack using the S3 backend

The app stack creates:

- DynamoDB table for small site interactions
- Lambda API handler
- API Gateway HTTP API
- CloudWatch log group with short retention

Budget note:

- AWS Budgets for a member account must be managed from the organization management account.
- The member-account app stack therefore leaves budget creation disabled by default.
