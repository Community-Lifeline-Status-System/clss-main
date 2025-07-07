const fs = require('fs').promises;
const path = require('path');

const baseUrl = 'https://trial1.demo.webeocasp.com/trial1/api/rest.svc';

async function Login() {
    const url = `${baseUrl}/sessions`;

    const configPath = path.join(__dirname, 'config.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));

    const data = {
        username: config.username,
        password: config.password,
        position: 'CMD Incident Commander',
        incident: 'Trial'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include' // This ensures cookies are included in the request
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const json = await response.json();
            console.log('Response JSON:', json);
        } else {
            const text = await response.text();
            console.log('Response Text:', text);
        }

        const cookies = response.headers.get('set-cookie');
        console.log('user logged in successfully');
        // console.log('Cookies:', cookies);

        return cookies;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

async function fetchBoards() {
    try {
        const cookies = await Login();
        const response = await fetch(`${baseUrl}/boards`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies
            },
            credentials: 'include'
        });
        const data = await response.json();
        console.log('Boards:', data);
    } catch (error) {
        console.error('Error fetching boards:', error);
    }
}

async function fetchUsers() {
    try {
        const cookies = await Login();
        const response = await fetch(`${baseUrl}/users`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies 
            },
            credentials: 'include'
        });
        const data = await response.json();
        console.log('Boards:', data);
    } catch (error) {
        console.error('Error fetching boards:', error);
    }
}


async function writeRecord() {
    const boardName = 'Event Reporting';
    const viewName = 'Input';
    const recordData = {
                'username': 'eendrulat@ghinternational.com', 
                'positionname': 'CMD EOC Director', 
                'controller_review_status': 'Posted', 
                'event_type': 'Fire', 
                'event_type_other': 'None', 
                'status': 'Unknown', 
                'description_history': 'Test'   
    };

    try {
        const cookies = await Login();
        const response = await fetch(`${baseUrl}/board/${boardName}/input/${viewName}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies 
            },
            credentials: 'include',
            body: JSON.stringify(recordData)
        });
        console.log('Request URL: ', response.url);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error details: ${errorText}`);
            console.error('Full HTTP POST request:', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies
            },
            credentials: 'include',
            body: JSON.stringify(recordData)
            });
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('Record created successfully:', data);
        } else {
            const text = await response.text();
            console.log('Response Text:', text);
        }
    } catch (error) {
        console.error('Failed to create record:', error);
    }
}


writeRecord();

// fetchBoards();
// fetchUsers();
