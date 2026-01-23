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
####  |POST|""http://localhost:5000/user/login"
### get all the users (only admin)