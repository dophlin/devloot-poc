
# Proof of Concep for Developing an Authentication System
Note: You can find the API document and Postman collection in the bottom of this readme.

#### This repository is a server-side application for providing following functionalities:

- Login via email\username & password
- Register using email\username & password
- User roles i.e. Admin\Business\Customer

#### System also should have following non-functionalities:
- API validation
- Gateway Security
- Authentication restrictions on routes
- Authorization restrictions on routes
- Modular design for scalibility
- Docker compatibility

#### First we defined the user types that are going to use the system:
- Super Admin
- Admin
- Customer
- Business

#### Then we considered some routin user stories for each one:
- Super Admin
    * Login
    * Get Admin List
    * Create New Admin
- Admin
    * Login
    * Get Profile
    * Get Customer List
    * Get Business List
-  Customer
    * SignUp
    * Login
    * Get Profile
- Business
    * SignUp
    * Login
    * Get Profile


### The database entities are defined as follow:
#### User Entity
Usecase: Authentication & Authorization Purposes

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | Entity identifier |
| `username` | `string` | It's used for login mechanism |
| `email` | `string` | Additional property |
| `password` | `string` | It's hashed and is used for authentication |
| `Role` | `[SuperAdmin, Admin, Customer, Business]` | Role of the logged in user |

#### Admin Entity
Usecase: Supports Admin's user stories

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | Entity identifier |
| `user` | `User` | OneToOne relation with a user entity |
| `firstName` | `string` | Admin's first name |
| `lastName` | `string` | Admin's last name |

#### Business Entity
Usecase: Supports Business's user stories

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | Entity identifier |
| `user` | `User` | OneToOne relation with a user entity |
| `name` | `string` | Business name |
| `activities` | `[string]` | List of activities that the business supports |

#### Customer Entity
Usecase: Supports Customer's user stories

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | Entity identifier |
| `user` | `User` | OneToOne relation with a user entity |
| `firstName` | `string` | Customer's first name |
| `lastName` | `string` | Customer's last name |

## Tech Stack
Based on the required functionalities and non-functionalities features, I decided to use the following stack:
- Programming Language: TypeScript
- Platform: Node.js (It's event-driven architecture removes the race-condition problem and are suitable for scalibility and well-fit for micro-service architecture)
- Framework: Nest.js (One of the best frameworks based on Node.js; It provides a reliable, flexible, and modular architecture for developing scalable solutions)
- Database: SQLite in memory database (It helps the evaluators to easily launch the PoC without need of installing an external Database)
- Docker: For building a contrainer image so the system can be easily deployed in a contrainer without considering its base environment.


## Install Instruction 
For running the PoC, you need Node.js and npm package be installed on your system. You can find the latest version of Node.js and NPM on the following link:
- [https://nodejs.org/en/](https://nodejs.org)

Then clone this repository on your computer and in its root folder run following command in a terminal:

`npm install`

For running the PoC locally just run following command:

`npm run start`

If you would like to build a docker image of the PoC, there is a Dockerfile just build it and push it in your repository.

For testing purposes you can find the API documents in the following link:

- [API Document](https://documenter.getpostman.com/view/7703084/2s8YzMXk2U)
- [Postman Collection](https://www.postman.com/solar-eclipse-279857/workspace/dophlinpublic/collection/7703084-9a8d0abb-a941-49c1-9b09-236b2372aac3?action=share&creator=7703084)

