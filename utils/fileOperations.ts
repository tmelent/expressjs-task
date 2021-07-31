import fs from "fs/promises";
import { User } from "../models/User";

/**
 * Считывает данные из users.json и преобразует их в массив User[]
 * @returns массив пользователей
 */
export const parseFile = async () => {
  let fileContent: string;
  let users: User[];
  try {
    fileContent = await fs.readFile("files/users.json", "utf-8");
  } catch (error) {
    throw new Error(`Ошибка при чтении файла: ${error}`);
  }
  try {
    // Если users.json пустой
    if (!fileContent.length) {
      users = [];
    } else {
      users = JSON.parse(fileContent);
    }
    return users;
  } catch (error) {
    throw new Error(`Ошибка при преобразовании из JSON: ${error}`);
  }
};

/**
 * Асинхронно записывает массив пользователей в файл users.json
 * @param users массив пользователей
 */
export const writeToFile = async (users: User[]) => {
  try {
    console.log(users);
    await fs.writeFile("files/users.json", JSON.stringify(users, null, 2));
    console.log(`Данные записаны в файл успешно!`);
  } catch (error) {
    throw new Error(`Ошибка при записи в файл: ${error}`);
  }
};

