const http = require('http');
const fs = require('fs');
const path = require('path');

// Path to the users.txt file
const usersFilePath = path.join(__dirname, 'users.txt');

// Create the HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/users/json' && req.method === 'GET') {
    // Read the users.txt file
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      // Split the file content into lines
      const lines = data.trim().split('\n');

      // Extract the headers
      const headers = lines[0].split(', ');

      // Create an array of objects
      const users = lines.slice(1).map(line => {
        const values = line.split(', ');
        const user = {};
        headers.forEach((header, index) => {
          user[header] = values[index];
        });
        return user;
      });

      // Respond with JSON
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});