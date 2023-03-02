import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),                               //проверка является ли email
    body('password', 'Пароль должен быть не менее 5 символов').isLength({min:5}),   //проверка на длину пароля
    body('fullName', 'Имя должно быть не менее 3 символов').isLength({min:3}),      //проверка на длину имени 
    body('avatarUrl', 'Неправильная ссылка на аватар').optional().isURL(),          //проверка опциональная, является ли URL
];

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),                               //проверка является ли email
    body('password', 'Пароль должен быть не менее 5 символов').isLength({min:5}),   //проверка на длину пароля
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),  //проверка заголовка
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),       //проверка текста статьи
    body('tags', 'Неверный формат тэгов').optional().isString(),                //проверка опциональная, тэгов
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),   //проверка опциональная, URL картинки
  ];