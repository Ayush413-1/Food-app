import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
    try {
        const { sellerToken } = req.cookies;

        if (!sellerToken) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        }

        const tokenDecoded = jwt.verify(
            sellerToken,
            process.env.JWT_SECRET
        );

        if (tokenDecoded.email !== process.env.SELLER_EMAIL) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        }

        next();

    } catch (error) {
        console.log("AUTH SELLER ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid seller token"
        });
    }
};

export default authSeller;