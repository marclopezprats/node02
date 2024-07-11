const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;

app.use(cors({
    origin: '*',
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));
app.use(express.json());
app.use(cookieParser());

app.get('/api/message', (req, res) => {
    res.cookie('testCookie', 'testValue', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/'
    });
    res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
