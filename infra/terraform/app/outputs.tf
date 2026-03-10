output "account_id" {
  value = data.aws_caller_identity.current.account_id
}

output "api_endpoint" {
  value = aws_apigatewayv2_api.http.api_endpoint
}

output "health_url" {
  value = "${aws_apigatewayv2_api.http.api_endpoint}/health"
}

output "hi_url" {
  value = "${aws_apigatewayv2_api.http.api_endpoint}/hi"
}

output "table_name" {
  value = aws_dynamodb_table.site_interactions.name
}
