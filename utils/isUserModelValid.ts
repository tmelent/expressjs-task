import { User } from "../models/User";
/**
 * Проверяет, верно ли заполнены поля в переданной модели
 * @param userInput объект User
 */
export const isUserModelValid = (userInput: User) => {
  const { id, name, password, email, enabled } = userInput;
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
};
