// Importing the express module and attaching it to the express variable (could it be used without a variable?)
// The express module is a light framework for web dev. It serves as a server, with many uses involving http requests.
const { response } = require('express');
const express = require('express');

// Creating an instance of the object imported above (which is the Express module) to the app variable.
// This allows to call functions by using the variable name (in this case, "app" (i.e. app.xxx, app.yyy))
const app = express();

// Express by standard doesn't understand JSON format (since it's not only used for it)
// This ensures that it will be recognized, loading whatever components it needs in the background to do so.
app.use(express.json());

// Creating a basic route. '/' means the one below is "triggered" from the home (www.xxxx.com/ for example)
// We use the verb get (http) and the function takes two parameters, which the second is given as a "arrow function" [nameless function]
// We return a RESPONSE, in json format which is the standard
/*
app.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});
*/

/*
There are three ways to use parameters within http verbs, as follows:

Query Params: Mainly used with GET (filter and pagination), obtained using => request.query
Route Params: Mainly used with PUT/PATCH (when something is specific, like users/1), obtained using => request.params
Request Body: Mainly used with POST (to create or edit a resource), obtained using => request.body --- JSON format is a standard for it's usage (like SISREG stuff I do with Python at work using requests/elasticsearch)
*/

app.get('/projects', (request, response) => {
    const { title, owner } = request.query; // Allows me to receive this info from GET verb and work it within my code.

    console.log(title);
    console.log(owner);

    return response.json([
        'Projeto 1',
        'Projeto 2'
    ]);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body; // Allows me to receive this info from POST verb, when info is send through body (mainly JSON).

    console.log(title);
    console.log(owner);

    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ]);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params; // Allows me to receive this info from PUT verb and work it within my code. (this is not 100% clear, check it later)

    console.log(id);

    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3'
    ]);
});

app.delete('/projects', (request, response) => {
    return response.json([
        'Projeto 2',
        'Projeto 3'
    ]);
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