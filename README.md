# jobby_app_hook
Implemented Jobby App where users can log in and can see a list of jobs with search by Job title, filters based on Salary range and Employment type, etc

- Implemented different pages like Login, Home, Jobs, Job item details using React components, props, state, lists, event handlers, form inputs.
- Authenticating by taking username, password and doing login post HTTP API Call.
- Persisted user login state by keeping jwt token in client storage, Sending it in headers of further API calls to authorize the user.
- Implemented different routes for Login, Home, Jobs, Job item details pages by using React Router components Route, Switch, Link.
- Implemented filters and search text by sending them as query parameters to jobs API calls.
- Redirecting to the login page if the user tries to open Home, Jobs, Job item details routes which need authentication by implementing protected Route.

Technologies used: React JS, JS, CSS, Bootstrap, Routing, REST API Calls, Local Storage, JWT Token, Authorization, Authentication

Deployed on - https://ajobbyapp.netlify.app
Login :
  username : rahul
  password : rahul@2021
