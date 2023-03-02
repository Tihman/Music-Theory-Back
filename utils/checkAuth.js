import jwt from "jsonwebtoken";
//парсим токен и расшифровываем
export default (req, res, next) => {
    const token= (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secretkey1'); //расшифровка токена
            req.userId=decoded._id;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }
    // res.send(token);
    // next();
};