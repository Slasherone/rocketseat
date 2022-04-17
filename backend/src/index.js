// Importing the express module and attaching it to the express variable (could it be used without a variable?)
// The express module is a light framework for web dev. It serves as a server, with many uses involving http requests.
const express = require('express');

// Creating an instance of the object imported above (which is the Express module) to the app variable.
// This allows to call functions by using the variable name (in this case, "app" (i.e. app.xxx, app.yyy))
const app = express();

// Creating a basic route. '/' means the one below is "triggered" from the home (www.xxxx.com/ for example)
// We use the verb get (http) and the function takes two parameters, which the second is given as a "arrow function" [nameless function]
// We return a RESPONSE, in json format which is the standard
app.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});

// This "creates" the server/application using port 3333, which it "listens" to waiting for new interactions.
// Based on these interactions, users triggers certains routes (which must be previously created like above)
// And properly integrated with the application via the front-end 
app.listen(3333, () => {
    console.log('🤘 Back-end started! 🤘');
});



/*

yarn init -y
# iniates the project within the actual directory (similar to Python's virtualenv)

yarn add express
# adds the express package (similar to Python's pip)
# express module is a light framework for web dev. It serves as a server, with many uses involving http requests.

yarn add nodemon -D
# adds the nodemon package, which restarts the server after each save (easier to see changes)
# -D flag only adds the package to the development machine (if deployed to production, nodemon won't be added automatically)

yarn dev
# following the tip above, a snippet was created inside package.json to use nodemon in a different manner
# using the scripts{} notation inside the file, the snippet was given the name dev and we can call it by the command yarn dev
# yarn looks for "dev" inside the file, which in this case states the use of nodemon, which in this case looks towards the "main" inside the package.json file (set to src/index.js) 
# In another words, behind the scenes, yarn dev == nodemon src/inde.js
*/