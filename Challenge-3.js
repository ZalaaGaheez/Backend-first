const http = require('http');
const fs = require('fs');
const path = require('path');

function readUsersFile() {
    const data = fs.readFileSync(path.join(__dirname, 'Files/users.txt'), 'utf-8');
    const lines = data.trim().split('\n').slice(1); // Skip header
    const users = lines.map(line => {
        const [firstName, lastName, dateOfBirth, country, interest] = line.split(', ');
        return { firstName, lastName, dateOfBirth, country, interest };
    });
    return users;
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/users/html') {
        const users = readUsersFile();
        let htmlContent = `
            <div style="display: flex; justify-content: center;">
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        `;
        const cardTemplate = (user) => `
            <div style="width: 300px; height: 300px; background-color: #ADD8E6; border: 1px solid #d3d3d3; border-radius: 10px; padding: 20px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333; font-size: 25px; margin-bottom: 10px;">${user.firstName} ${user.lastName}</h2>
                <p style="color: #555; font-size: 20px; margin: 5px 0;"><strong>Date of Birth:</strong> ${user.dateOfBirth}</p>
                <p style="color: #555; font-size: 20px; margin: 5px 0;"><strong>Country:</strong> ${user.country}</p>
                <p style="color: #555; font-size: 20px; margin: 5px 0;"><strong>Interest:</strong> ${user.interest}</p>
            </div>
        `;
        users.forEach(user => {
            htmlContent += cardTemplate(user);
        });
        htmlContent += `
                </div>
            </div>
        `;
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});