const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// GET
app.get('/', (req,res) => {
	res.send('hello, gurrl!');
	console.log('Cookies: ', req.cookies)
	// res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
});

// PORTS, SERVER
const server = app.listen(3000, () => {
	const host = server.address().address;
	const port = server.address().port;

	// console.log('Example app listening at http://%s:%s', host, port);
});

/* TEST 1: PASSED (Node is working)
Expected Input:
> curl -X GET -d name=radsauce http://localhost:3000 -H "Content-Type: text/plain"

Expected Output:
< hello, gurrl!
*/
const cookie_name = 'towersofhanoi';

// Express
app.get('/cookie', (req, res) => {
     res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
		 console.log('Cookies: ', req.cookies);
});

/*
TEST 2: PASSED (Persistent Storage)

Visit the route in browser for the get handler that sets the cookie,
view that cookie, change the cookie's name, refresh everything, and
see if there are now TWO cookie names coming back from client's request.

1. Expected Input: Visit localhost:3000/cookie in browser,
Expected Result:
- 'cookie is set'

2. Expected Input: Open up Chrome console and type > document.cookie
Expected Result: "value-you-just-assigned-in-app.js-cookie-name = cookie_value"
or, for brevity:
"cookiename1=cookie_value"

3. Expected Input: Go back to JS and change value for cookie name to cookiename2,
restart node

4. Repeat steps 1 and 2.
Expected result (Chome console):
"cookiename1=cookie_value,cookiename2=cookie_value""

TEST PASSED, shows persistent browser storage on client.

**********************

TEST 3: Node console working + Persistent Storage
Do the same thing you did in Test 2 with proving persistent storage, only
do it with Node instead of the browser.

Write a console.log of cookies from client request in a get handler for any route,
visit that route, check Node console

1. Add code: console.log('Cookies: ', req.cookies); to any get handler

2. Restart Node

3. Visit the route for that handler

Expected Result:
"cookiename1=cookie_value,cookiename2=cookie_value""
*/
