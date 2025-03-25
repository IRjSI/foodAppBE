import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({
            status: false,
            message: 'unauth(middleware)'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user.userId = decoded._id;
        next();
    } catch (error) {
        res.json({
            status: false,
            message: error
        })
    }
}

export default authMiddleware;