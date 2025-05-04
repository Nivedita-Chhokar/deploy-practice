const roleCheck = (requiredRole) => {
    return (req, res, next) => {
        if (req.user && req.user.roles && req.user.roles.includes(requiredRole)) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    };
};

module.exports = roleCheck;
