import LoginInput from "../models/LoginInput";
import { isLoginModelValid } from "../utils/validation";
import { hashString } from "../utils/hashString";
import UserService from "../services/UserService";
import jwt from "jsonwebtoken";

class AuthService {
  async login(loginInput: LoginInput) {
    isLoginModelValid(loginInput);
    const { email, password } = loginInput;
    const user = await UserService.getUserByIdOrEmail(email);

    if (!user) {
      throw new Error("Пользователь с таким email не найден.");
    }
    // Сравнение пароля
    if (hashString(password) !== user.password) {
      throw new Error("Неверный пароль.");
    }

    // Создание JWT-токена
    jwt.sign(
      { email: email },
      process.env.JWT_SECRET || "J1598y3*SF*!7351591!*!@*#(asdhfjasdjkig238",
      {
        algorithm: "HS256",
        expiresIn: "4h",
      },
      async (error, tkn) => {
        // обработка ошибок
        if (error) {
          console.log(error);
          throw new Error("Ошибка при создании JWT-токена");
        }
        // присвоение токена
        if (tkn) {
          user.token = tkn;
          await UserService.update(user); // запись в файл
          return tkn; // возвращаем токен
        }
        return "";
      }
    );
  }
}
export default new AuthService();
