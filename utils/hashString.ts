import crypto from "crypto";

/**
 * Преобразует строку в md5
 * @param str исходная строка
 * @returns md5 строка
 */
export const hashString = (str: string) => {
  try {
    const hashedString = crypto.createHash("md5").update(str).digest("hex");
    console.log(`Пароль успешно захеширован`);
    return hashedString;
  } catch (error) {
    throw new Error("Ошибка при хешировании пароля");
  }
};
