import { UploadedFile } from "express-fileupload";
import path from "path";
class FileService {
  async upload(file: UploadedFile) {
    try {
      // Перемещаем файл в нужную папку
      file.mv(path.join("./uploads/", file.name));
      // Возвращаем base64 имя
      return Buffer.from(file.name).toString("base64");
    } catch (error) {
      console.log(error);
      throw new Error("Ошибка при загрузке файла");
    }
  }

  async download(fileName: string) {
    // Получаем путь к файлу
    const filePath = path.join(
      `./uploads/${Buffer.from(fileName, "base64").toString("ascii")}`
    );
    return filePath;
  }
}

export default new FileService();
