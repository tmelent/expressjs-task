type FormattedError = {
    message: string,
    status: number
}
/**
 * Возвращает объект с ошибкой для отправки в response
 * @param message описание ошибки
 * @param status http status code
 * @returns 
 */
export const formatError = (message: string, status: number): FormattedError => {
  return {
    message,
    status,
  };
};
