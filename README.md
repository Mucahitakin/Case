# Express.js API

## Features

- `GET /users` – Lists all user names.
- `GET /users/:userId` – Retrieves a specific user by ID (authentication required).
- `PUT /users/:userId` – Updates the details of a specific user (authentication required).

## Security Layers

### 1. Helmet Middleware

Secures HTTP headers to prevent many common security vulnerabilities.

```
app.use(helmet());
``` 
2. Rate Limiting

Limits each IP to a maximum of 10 requests per minute. Exceeding this will return a 429 Too Many Requests error.
```
const rateLimit = require(‘express-rate-limit’);
    module.exports = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: ‘Too many requests, please try again later.’,
});
```
3. Basic Authorization (BOLA Protection)

Only the user with ID `123` can access or update their own data. If a different user ID is used, a 403 Forbidden error is returned.

```
module.exports = (req, res, next) => {
    const userIdFromToken = ‘123’;
    if (req.params.userId && req.params.userId !== userIdFromToken) {
    return res.status(403).json({ error: ‘Access denied: unauthorized user’ });
    }
    next();
};
```

Note: This authentication example is static. In real applications, JWT or session-based authentication should be used.


Postman Test Examples

1. Fetch all usernames
```
GET http://localhost:5099/users
```
2. Fetch a specific user (ID = 123)
```
GET http://localhost:5099/users/123
```
3. Update user information (ID = 123)
```
PUT http://localhost:5099/users/123
```
Body (JSON):
```
{
  "name": "Leanne Graham",
  "email": "Sincere@april.biz"
}
```

If you use another ID: 403 Access denied error.

# Safety Test Checklist
	• Authentication check (BOLA)
	• Sensitive data leakage prevented (only needed fields should be rotated)
	• Protection against DoS/Brute Force attacks with Rate Limiting

