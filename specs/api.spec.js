const host = '127.0.0.1'
let token

function pass_gen(len) {
    let chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    let str = '';
    for (let i = 0; i < len; i++) {
        let pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return str;
}

beforeAll(async () => {
    const response = await fetch(`http://${host}:9200/api/webclient/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "loginName": "admin",
            "password": "Qwerty0",
            "language": "RUS",
            "usageStats": true
        })

    })
    token = response.headers.get('X-User-Token')
})

test('1. positiveAuth', async () => {
    const response = await fetch(`http://${host}:9200/api/webclient/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "loginName": "admin",
            "password": "Qwerty0",
            "language": "RUS",
            "usageStats": true
        })

    })
    expect(response.status).toBe(200);
    const token = response.headers.get('X-User-Token')
    expect(token).toBeDefined()
});

test('2. negativeAuthInvalidPass', async () => {
    const response = await fetch(`http://${host}:9200/api/webclient/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "loginName": "admin",
            "password": "Qwert",
            "language": "RUS",
            "usageStats": true
        })

    })
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.status).toBe('ACCESS_DENIED');
});

test('3. positiveAddUser', async () => {
    const login = pass_gen(5)
    const pass = pass_gen(7)
    const response = await fetch(`http://${host}:9200/api/webclient/users/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-User-Token': `${token}`
        },
        body: JSON.stringify({
            "params": {
                "name": `${login}`,
                "description": "",
                "enabled": true
            },
            "login": `${login}`,
            "password": `${pass}`
        })
    })
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.status).toBe('OK');
});

test('4. negativeAddUserExists', async () => {
    const response = await fetch(`http://${host}:9200/api/webclient/users/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-User-Token': `${token}`
        },
        body: JSON.stringify({
            "params": {
                "name": "admin",
                "description": "Самый лучший администратор",
                "enabled": true
            },
            "login": "admin",
            "password": "qwerty"
        })
    })
    const data = await response.json();
    expect(data.status).toBe('EXISTS_USER');
});


test('5. negativeAddUserInvalidToken', async () => {
    const login = pass_gen(5)
    const pass = pass_gen(7)
    const response = await fetch(`http://${host}:9200/api/webclient/users/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-User-Token': `OWhRLx_HRRSMCfKmWe_TsFi9WwjeMUYXigh3Zeo-l9E`
        },
        body: JSON.stringify({
            "params": {
                "name": `${login}`,
                "description": "",
                "enabled": true
            },
            "login": `${login}`,
            "password": `${pass}`
        })
    })
    const data = await response.json();
    expect(response.status).toBe(403);
    expect(data.status).toBe('INVALID_TOKEN');
});