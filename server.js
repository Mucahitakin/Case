const express = require('express');
const helmet = require('helmet');
const rateLimiter = require('./middleware/rateLimiter');
const usersRouter = require('./router/users');

const app = express();
const PORT= 5099;
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));