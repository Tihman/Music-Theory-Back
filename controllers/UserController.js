import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator"; //для проверки валидации
import UserModel from '../models/User.js';

export const register = async (req,res) => {
    try{
        const password=req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt); //хэш пароля
        //создание пользователя
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save(); //создание документа в БД

        const token = jwt.sign({
            _id: user._id,
        }, 'secretkey1',
        {
           expiresIn: '30d',  //время жизни токена
        },
        );

        const {passwordHash, ...userData} = user._doc; //Не возвращать хэш, при регистрации
        res.json ({
            success: true,
            ...userData,
            token,
        });
    } catch (err) { //вернуть инфу о ошибке
        res.status(500).json({
            message: 'Не удалось зарегестрироваться',
        });
    };
};
export const login = async (req,res)=> {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'Не верный логин или пароль',
            });
        }
        const isValidPass= await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(404).json({
                message: 'Не верный логин или пароль',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secretkey1',
        {
           expiresIn: '30d',  //время жизни токена
        },
        );
        const {passwordHash, ...userData} = user._doc; //Не возвращать хэш, при регистрации
        res.json ({
            success: true,
            ...userData,
            token,
        });
    } catch (err) { //вернуть инфу о ошибке
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    };
};
export const getMe = async (req,res)=>{
    try { 
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'Нет пользователя с такой id',
            }); 
        };

        const {passwordHash, ...userData} = user._doc;
        res.json ({
            success: true,
            userData,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось',
        });
    }
};