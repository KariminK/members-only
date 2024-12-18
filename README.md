# Members-Only - Passport Local Strategy Project

This project is part of The Odin Project curriculum, focused on implementing authentication and authorization using the Passport Local Strategy. The goal of the project is to build a simple members-only website where users can register, log in, and access exclusive content.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Passport Local Strategy Explanation](#passport-local-strategy-explanation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The "Members-Only" project simulates a web application where users can sign up, log in, and access content that only registered members can see. Passport's Local Strategy is used to handle user authentication via username and password. This project focuses on:
- User registration
- Login/logout functionality
- Protecting routes to restrict access to authenticated users only

## Features
- **User Registration**: Users can create an account by providing a username and password.
- **User Login**: Users can log in with their username and password.
- **Exclusive Content**: Certain pages are only accessible to logged-in users.
- **Session Management**: Sessions are maintained using Passport and cookies for user authentication.

## Technologies Used
- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **Passport.js**: Authentication middleware for Node.js, using the Local Strategy for user login.
- **bcryptjs**: Library for hashing passwords.
- **Express-Session**: Middleware for managing user sessions.
- **EJS**: Template engine for rendering views.

## Setup

### Prerequisites
Before starting the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (or use MongoDB Atlas for cloud hosting)

### Install Dependencies
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/members-only.git
