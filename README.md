 Setup instructions :
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mohmad-Musa/Task.git
 for frontend :
 npm install
 npm run dev

 for backend:
 npm install
 npm run dev



  API documentation:
  User:
  **SignUp:**
  {
  username
  email:unique
  password
  }
  POST : http://localhost:5001/api/users/signup
  
 **Login:**
 email,password
 POST : http://localhost:5001/api/users/login

 **Logout:**
  POST : http://localhost:5001/api/users/logout

  **CheckAuth:** (for checking if the user login/signup (have a jwt in the cookies) )
 GET : http://localhost:5001/api/users/check



Task:
 **CreateTask:**
{
"title" 
"description"
"status" 

}
 POST : http://localhost:5001/api/tasks/CreateTask

 **GetAllTasks:**

GET : http://localhost:5001/api/tasks/gettasks



 **UpdateTask:**

(you can edit one field or more)
{
"title" 
"description"
"status" 

}
 PUT: http://localhost:5001/api/tasks/updatetask/:id



 **DeleteTask:**



Delete : http://localhost:5001/api/tasks/DeleteTask/:id





**additional notes**

i kept the .env file 

 

 
  
  
