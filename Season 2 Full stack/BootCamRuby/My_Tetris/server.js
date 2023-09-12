function start_html_server() {
    const http = require('http');
    const fs = require('fs');
    const path = require('path');

    const hostname = '0.0.0.0';
    const port = 8080;

    const server = http.createServer(function(request, response) {
        var filePath = '.' + request.url;
        if (filePath === './') {
            filePath = './index.html';
        }
        const extname = path.extname(filePath);
        let contentType = 'text/html';

        switch (extname) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'application/javascript';
                break;
        }

        fs.readFile(filePath, function(error, content) {
            if (error) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('File not found');
            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }).listen(port, hostname, () => {
        console.log("Server running at http://web-t9f2e5112-129c.docode.fi.qwasar.io");
    });
}

start_html_server();