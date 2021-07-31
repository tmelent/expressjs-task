import { User } from "../models/User";
import { isUserModelValid } from "../utils/validation";
import { hashString } from "../utils/hashString";
import { parseFile, writeToFile } from "../utils/fileOperations";
class UserService {
  /**
   * Считывает пользователей из файла users.json
   * @returns массив пользователей
   */
  async getUsers() {
    return await parseFile();
  }

  /**
   * Поиск пользователя по id или email
   * @param id критерий поиска
   * @param email альтернативный критерий поиска
   * @returns конкретный пользователь
   */
  async getUserByIdOrEmail(idOrEmail: string | number) {
    const users = await parseFile();
    const id = typeof idOrEmail === "number" ? idOrEmail : undefined;
    const email = typeof idOrEmail === "string" ? idOrEmail : undefined;
    console.log(id, email);

    const user = id
      ? users.find((i) => i.id === id)
      : users.find((i) => i.email === email);
    console.log(user);
    if (!user) {
      return false;
    }
    return user;
  }

  /**
   * Добавляет нового пользователя в файл users.json
   * @param userInput пользователь
   * @returns пользователь с захешированным паролем
   */
  async create(userInput: User) {
    if (!userInput.token) userInput.token = null;
    console.log(userInput);
    isUserModelValid(userInput);
    let { id, password, email } = userInput;
    const users = await parseFile();

    if (await this.getUserByIdOrEmail(id)) {
      throw new Error("Пользователь с указанным id уже существует!");
    }
    if (await this.getUserByIdOrEmail(email)) {
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
    if (!userInput.token) userInput.token = null;
    isUserModelValid(userInput);

    const users = await this.getUsers();
    let { id, email, enabled, password, name, token } = userInput;

    // Поиск нужного пользователя в файле по id
    let user = users.find((i) => i.id === id);
    if (!user) {
      throw new Error("Пользователь с таким id не найден");
    }

    let idx = users.indexOf(user);
    if (idx === -1) {
      throw new Error("Ошибка при поиске индекса пользователя в массиве");
    }
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
      token,
    };

    // Вносим изменения в массив
    users[idx] = user;

    // Обновляем исходный файл
    await writeToFile(users);

    return user;
  }
}
export default new UserService();
