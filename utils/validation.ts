import { User } from "../models/User";
import LoginInput from "../models/LoginInput";
/**
 * Проверяет, верно ли заполнены поля в переданной модели
 * @param userInput объект User
 */
export const isUserModelValid = (userInput: User) => {
  const { id, name, password, email, enabled, token } = userInput;
  if (!id || typeof id !== "number") {
    throw new Error("Неверно указан id");
  }
  if (!name || typeof name !== "string") {
    throw new Error("Неверно указано поле name");
  }
  if (!password || typeof password !== "string") {
    throw new Error("Неверно указано поле password");
  }
  if (!email || typeof email !== "string") {
    throw new Error("Неверно указан email");
  }
  if (!enabled || typeof enabled !== "boolean") {
    throw new Error("Неверно указано поле enabled");
  }
  if (token) {
    if (typeof token !== "string") {
      throw new Error("Неверно указан token");
    }
  }
};

export const isLoginModelValid = (loginInput: LoginInput) => {
  const { email, password } = loginInput;
  if (!email || typeof email !== "string") {
    throw new Error("Неверно указан email");
  }
  if (!password || typeof password !== "string") {
    throw new Error("Неверно указан пароль");
  }
};
