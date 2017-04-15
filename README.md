
# Cookies with Express : A Tutorial

This tutorial was inspired by [Codementor.io's Noddy Pandey's Cookie Management
with Express](https://www.codementor.io/noddy/cookie-management-in-express-js-du107rmna)
post; I added in some tests and verification; my installations of npm
packages are local instead of global; I use nvm. Verification is done not
using extensive unit testing, but with basic tooling (curl HTTP, Node, Chrome).

I'm also going to include the step-by-step workflow of a typical JS developer
in this tutorial.

## Installations

### nvm (Node Version Manager)

It's ideal to use **nvm**, or Node Version Manager, to install Node on different projects and manage versions.
If you don't have nvm installed already and aren't using, [do that right away](https://github.com/creationix/nvm).
```
$ echo "6.9.2" > .nvmrc
```
This indicates that we are intending to use Node 6.9.2 for this project. To use that .rc file to run command:
```
$ nvm use
```
Expected output:
> Found '/path/to/project/.nvmrc' with version <6.9.2>
Now using node v6.9.2 (npm v3.10.9)

### npm
```
npm init
```

### Express middleware

```
npm install express --save
```
It's important to not install npm packages globally, if we can help it.
Part of the npm's appeal is the modularity and versioning for different
projects remain isolated; we pollute the global space, if you will, if we
install npm projects globally. Always opt for `npm install something --save`
or `--save-dev` rather than global installs of `npm install something`.

### cookie-parser middleware

```
$ npm install cookie-parser --save
```

## Testing

### Testing Node

After you've written the code (see below), test it via curl HTTP. Specify plaintext type in content header.

- write code
- restart node
- hit it with curl

```
$ curl -X GET  http://localhost:3000  -H "Content-Type: text/plain"
```

Expected Output:
```
hello, worrrrllld!
```
**********************
### Testing cookies and persistence
**Test that cookies are in persistent browser storage.**

Visit the route in browser for the get handler that sets the cookie,
view that cookie, change the cookie's name, refresh everything, and
see if there are now TWO cookie names coming back from client's request.

- **Expected Input:** GET  http://localhost:3000/cookie in Chrome

 **Expected Result:** 'cookie is set'

- **Expected Input:** In Chrome console,
`document.cookie`

 **Expected Result: (Chrome)** "cookiename1=cookie_value"

- **Expected Input:** Go back to JS and **change value for cookie name** to cookiename2,
restart node

 Repeat steps above (GET and document.cookie)

 **Expected Result: (Chrome)**
"cookiename1=cookie_value,cookiename2=cookie_value"

TEST PASSED, shows persistent storage on client.

**********************

**Test that Node console working + Persistent Storage**

**Do the same thing you did in Test 2 with proving persistent storage, only
do it with Node instead of the browser.**

Write a console.log of cookies from client request in a get handler for any route,
visit that route, check Node console

- Add code: console.log('Cookies: ', req.cookies); to any get handler

- Restart Node

- Visit the route for that handler

 **Expected Result: (Node)**
"cookiename3=cookie_value,cookiename4=cookie_value"

TEST PASSED, shows persistent storage on client.


## The code

```
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

// GET
app.get('/', (req,res) => {
	res.send('hello, worrrrllld!');
});

// PORTS, SERVER
const server = app.listen(3000, () => {
	const host = server.address().address;
	const port = server.address().port;
});

// Run test 1 here before you write the following code

// COOKIES
const cookie_name = 'towersofhanoi';

app.get('/cookie', (req, res) => {
	res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
	console.log('Cookies: ', req.cookies);
});

// Run tests 2 and 3 here
```
