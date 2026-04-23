# AWS CRUD Project

## Overview

This is a fullstack CRUD application deployed on AWS.

The project demonstrates how to build, containerize, deploy, and connect a frontend, backend, and database using AWS cloud services.

The goal of this project was to practice cloud development, deployment, security configuration, and basic CI/CD setup.

---

## Project Architecture

### Frontend
- HTML
- JavaScript
- Hosted with AWS Amplify

### Backend
- Node.js
- Express.js
- Docker container
- Amazon ECS Fargate
- Amazon ECR

### Database
- PostgreSQL
- Amazon RDS

### Infrastructure
- Application Load Balancer (ALB)
- Security Groups
- IAM Roles
- AWS CodeBuild (CI/CD)

---

## Features

- Load tasks from API
- Fetch backend data from ECS service
- PostgreSQL database connection
- Dockerized backend deployment
- Public frontend + secured backend architecture

---

## AWS Services Used

- AWS Amplify
- Amazon ECS (Fargate)
- Amazon ECR
- Amazon RDS (PostgreSQL)
- Application Load Balancer (ALB)
- IAM
- AWS CodeBuild

---

## Live Demo

### Frontend
https://staging.d1us61zsq0qtz5.amplifyapp.com

### Backend API
http://crud-alb-213659891.eu-north-1.elb.amazonaws.com/tasks

Example endpoint:
`/tasks`

---

## Cost Considerations

This project uses small and low-cost AWS services suitable for student and demo purposes.

Examples:
- small RDS instance (db.t4g.micro)
- ECS Fargate for containerized backend
- Amplify for lightweight frontend hosting

The solution is designed for learning purposes and not for production scale.

---

## Author

Krystyna Sajak

iOS Developer | Cloud Development Student

GitHub:
https://github.com/ksajak-mobiledev
