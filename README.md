# 21st-and-Guad
Spring 2023 New Fellow Project Team 1

## Current To-do List

Frontend Apartment Form (local database) ✓

Backend CRUD Routes (POST and GET under /apartments) ✓

Authentication ✓

- separate routes for a login page (/login) and a apartment form (/) have been created ✓
- AuthContext.js file created, exports 
    createUser,
    loggedIn,
    loginUser,
    logout functions. ✓
- frontend client-side has been connected to Firebase ✓
    - able to error-check and return accessToken for register and login buttons
- users are redirected to login page route (/login) if auth.loggedIn is false ✓
- add log out functionality ✓
---
TODO:
- try sending a request from frontend with token attached to backend, see if verify middleware works
- maybe have to deal with tokens expiring after an hour or two? not sure