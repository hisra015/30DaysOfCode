provider "aws" {
  region = "us-east-1"  # Change to your preferred AWS region
}

resource "aws_lambda_function" "hello_lambda" {
  filename         = "lambda.zip"                 # Zipped Lambda function
  function_name    = "HelloLambda"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "lambda_function.lambda_handler"  # Function entry point
  runtime          = "python3.9"                  # Lambda runtime

  source_code_hash = filebase64sha256("lambda.zip")
}

resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"

  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Effect": "Allow",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name   = "lambda_exec_policy"
  role   = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Effect": "Allow",
        "Resource": "arn:aws:logs:*:*:*"
      }
    ]
  })
}
