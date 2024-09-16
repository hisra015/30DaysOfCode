# main.tf
provider "aws" {
  region = "us-east-1" # Set your preferred AWS region
}

# Create an EC2 instance
resource "aws_instance" "example" {
  ami           = "ami-0b0ea68c435eb488d"  # Amazon Linux 2 AMI ID for us-east-1
  instance_type = "t2.micro"               # Free-tier instance type

  tags = {
    Name = "TerraformExampleInstance"
  }
}

# Output the public IP of the instance
output "instance_ip" {
  value = aws_instance.example.public_ip
}
