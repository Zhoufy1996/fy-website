/** @format */
import fs from 'fs';

export const readJsonFile = <T = unknown>(path: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, value) => {
      if (err) {
        reject(err);
      } else {
        try {
          const result: T = JSON.parse(value);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
};

export default {};
