import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { formatError } from "../utils/formatError";
import FileService from "../services/FileService";

class FileController {
  /**
   * Загрузка файла в папку upload
   */
  async upload(req: Request, res: Response) {
    try {
      // Проверяем, есть ли файл в запросе
      if (!req.files) {
        res.status(400).json(formatError("Не указан файл для загрузки", 400));
      } else {
        // Загрузка файла и return имени в base64
        const b64response = await FileService.upload(
          req.files.file as UploadedFile
        );
        res.status(200).json(`Файл успешно загружен: ${b64response} `);
      }
    } catch (error) {
      // Если не получилось загрузить файл в папку (например, папка не существует)
      res.status(400).json(formatError(error.message, 400));
    }
  }

  /**
   * Скачивание файла по имени (указывается в base64)
   */
  async download(req: Request, res: Response) {
    // Передаем парметр name (base64) из запроса, чтобы получить ссылку на файл
    const filePath = await FileService.download(req.params.name);
    // Скачиваем файл
    res.download(filePath, (err) => {
      if (err) {
        res.status(404).json(formatError("Файл не найден", 404));
      }
    });
  }
}

export default new FileController();
