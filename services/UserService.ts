import { User } from "../models/User";
import { isUserModelValid } from "../utils/isUserModelValid";
import { hashString } from "../utils/hashString";
import { parseFile, writeToFile } from "../utils/asyncFileOperations";
class UserService {
  /**
   * Считывает пользователей из файла users.json
   * @returns массив пользователей
   */
  async getUsers() {
    return await parseFile();
  }

  /**
   * Добавляет нового пользователя в файл users.json
   * @param userInput пользователь
   * @returns пользователь с захешированным паролем
   */
  async create(userInput: User) {
    isUserModelValid(userInput);
    let { id, password, email } = userInput;
    const users = await parseFile();

    if (users.find((i) => i.id === id)) {
      throw new Error("Пользователь с указанным id уже существует!");
    }
    if (users.find((i) => i.email === email)) {
      throw new Error("пользователь с указанным email уже существует!");
    }
    // Хеширование пароля
    password = hashString(password);
    users.push({ ...userInput, password });
    // Запись в файл
    await writeToFile(users);
    return { ...userInput, password };
  }

  /**
   * Обновляет данные пользователя
   * @param userInput пользователь
   * @returns обновленный пользователь
   */
  async update(userInput: User) {
    isUserModelValid(userInput);

    const users = await this.getUsers();
    let { id, email, enabled, password, name } = userInput;

    // Поиск нужного пользователя в файле по id
    let user = users.find((i) => i.id === id);

    if (!user) {
      throw new Error("Пользователь с таким id не найден");
    }

    let idx = users.indexOf(user);

    // Если пароль обновлён, нужно его захешировать
    if (user.password !== password) {
      password = hashString(password);
    }

    user = {
      id,
      name,
      password,
      email,
      enabled,
    };

    // Вносим изменения в массив
    users[idx] = user;

    // Обновляем исходный файл
    await writeToFile(users);

    return user;
  }
}
export default new UserService();
