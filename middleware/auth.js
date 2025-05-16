module.exports = (req, res, next) => {
    const userIdFromToken = '123';
    if (req.params.userId && req.params.userId !== userIdFromToken) {
        return res.status(403).json({ error: 'Access denied: unauthorized user' });
    }
    next();
};