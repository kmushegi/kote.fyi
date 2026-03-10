variable "aws_region" {
  description = "AWS region for the app stack."
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Base name for resources."
  type        = string
  default     = "kote-fyi"
}

variable "budget_alert_email" {
  description = "Email for budget alerts."
  type        = string
  default     = "mushegiani@gmail.com"
}

variable "enable_budget" {
  description = "Whether to create a budget in this account. Linked/member accounts cannot create budgets directly."
  type        = bool
  default     = false
}

variable "allowed_origins" {
  description = "Allowed CORS origins for the public API."
  type        = list(string)
  default = [
    "https://kote.fyi",
    "https://www.kote.fyi",
    "https://kmushegi.github.io",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ]
}
