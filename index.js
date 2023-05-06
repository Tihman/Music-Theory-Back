import express from "express";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js"; //валидация
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import handleValErrors from "./utils/handleValErrors.js";

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('DB ok'))
.catch((err)=>console.log('DB error', err));

const app = express();

//хранилище для картинок
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

//Роуты
app.post('/auth/register', registerValidation, handleValErrors, UserController.register); //Регистрация
app.post('/auth/login', loginValidation, handleValErrors, UserController.login); //Авторизация
app.get('/auth/me', checkAuth, UserController.getMe);//Инфа о пользователе

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  });
//работа с статьями
app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll); //получение всех
app.get('/posts/tags', PostController.getLastTags);//получение тэгов
app.get('/posts/:id', PostController.getOne); //получение одной
app.post('/posts', checkAuth, postCreateValidation, handleValErrors, PostController.create); //создание статьи
app.delete('/posts/:id', checkAuth, PostController.remove); //удаление одной статьи
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValErrors, PostController.update); //редактирование одной статьи
//Роуты
app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});