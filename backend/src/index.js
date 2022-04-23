// Importing the express module and attaching it to the express variable (could it be used without a variable?)
// The express module is a light framework for web dev. It serves as a server, with many uses involving http requests.
const { response } = require('express');
const express = require('express');
const { uuid, isUuid } = require('uuidv4');

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

/*
Middleware: Interceptor of requests that can completely INTERRUPT it or CHANGE data within a request.
These can be used to VALIDATE actions as well.

There are 3 main ways of using it:
1) Through app.use(xxxx) (which is global, meaning every route will have use it, xxxx being the name of the function)
2) Through app.use(specifyARoute/) (which every route that has the same specified path will use it, i.e. xxxx)
3) Through direct specification, as a parameter of a route, i.e. app.get('/projects', MIDDLEWARE_NAME_HERE, (request, response) => {} ...

Routes can be classified as a middleware (get/post/put/delete/etc) for educational purposes,
However proper "Middlewares" are declared with a "next" parameter which helps to identificate it (exemple down below at code)
*/

// List to save my projects, allowing them to be shown and/or found to be modified, deleted.
const projects = [];

// This is a middleware. Without returning next(), which is literally the thing that it should run in the first place, the app/code freezes (like a WHILE without exit)
function logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`; // `` allows to use variables within strings, similar to Python's f"".

    console.time(logLabel); // Similar to the stuff I do with time module in Python to control program speed. This prints logLabel (above)

    next(); // This executes the "normal" route (for example, app.get)

    console.timeEnd(logLabel); // Complement to the action above, this prints how long it took (from start to finish of action)
}

// Middleware (function) to validate if given Id is valid in uuid format
function validateProjectId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid project ID.'});
    }

    return next();
}

// Global usage of middleware. More could be specified, giving the function bellow more parameters if needed (every route will trigger it)
app.use(logRequests);

// Specified usage of middlaware (only works on given path). Like mentioned before, more functions could be passed here.
app.use('/projects/:id', validateProjectId);

// Shows every project created or a specifc one, through the verification made inside it
app.get('/projects', (request, response) => {
    const { title } = request.query; // Allows me to receive this info from GET verb and work it within my code.

    // if a title is given, search for every project that has it's info. else, show all projects
    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
});

// Create a project
app.post('/projects', (request, response) => {
    const { title, owner } = request.body; // Allows me to receive this info from POST verb, when info is send through body (mainly JSON).

    const project = { id: uuid(), title, owner };

    projects.push(project); // Created object is pushed into list

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params; // Allows me to receive this info from PUT verb and work it within my code. (this is not 100% clear, check it later)
    const { title, owner } = request.body;
    
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.'});
    }

    const project = {
        id,
        title,
        owner
    };
    
    projects[projectIndex] = project;
    
    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.'});
    }

    projects.splice(projectIndex, 1);
    
    return response.status(204).send();
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