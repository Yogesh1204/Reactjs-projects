const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Yogesh'); // Logs your name to the console
    res.writeHead(200, { 'Content-Type': 'text/plain' }); // Sets the response headers
    res.end('Hii!'); // Sends a response back to the browser
});

server.listen(4000, () => {
    console.log('Server is listening on http://localhost:4000');
});
