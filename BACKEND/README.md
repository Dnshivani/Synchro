# Backend
### setup - backend
 #### cd /BACKEND/
 ##### run "npm install" //this  will install all the required dependencies
 ## create new [.env] file inside /BACKEND/
   PORT=5000
 
## the server is on "http://localhost:5000"


## Landing Page **routes**
### 1.user create (register)
### |GET| "http:localhost:5000/landingPage"

## user **routes**
### 1.user create (register)
#### |POST|"http://localhost:5000/user/register" 
### 2.user login (login)
####  |POST|""http://localhost:5000/user/login"
### get all the users (only admin)
####  |GET|""http://localhost:5000/user"


## Project **routes**
### 1.project create 
#### |POST|"http://localhost:5000/project/create"  
{
  name : "project Name",
  description : "your project description",
  members : [<memberId>, <memberId>],
(opt) deadline : <date>,

}
### 2. get Projects
####  |GET|""http://localhost:5000/project"
### this is the project main route 
####  |GET|""http://localhost:5000/project/myProjects"
### get all the projects (only authorized)
####  |GET|""http://localhost:5000/project/:id"
### get specefic project details 
####  |POST|""http://localhost:5000/project/create"
## {
### Schema Fields

| Field         | Type     | Validation / Info                          |
|:--------------|:---------|:-------------------------------------------|
| `name`        | String   | Required                                   |
| `description` | String   | Optional                                   |
| `owner`       | ObjectId | Required (References `User` model)         |
| `members`     | Array    | Sub-docs: `user` (OID) and `role` (Enum)   |
| `startDate`   | Date     | Default: `Date.now`                        |
| `deadLine`    | Date     | Optional                                   |
| `status`      | String   | Enum: `active`, `onGoing`, `completed`, `dropped`, `onHold` |
### get specefic project details 
