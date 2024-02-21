import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as fsPromise from 'fs/promises';
import * as uuid from 'uuid';
import { constants } from 'fs/promises';

@Injectable()
export class FileServise {
  createFile(file: Express.Multer.File): string {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = uuid.v4() + '.' + fileExtension;
    const filePath = path.resolve(path.dirname(__dirname), '../static/image');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
    return 'image' + '/' + fileName;
  }

  removeFile(name: string) {
    const filePath = path.resolve(
      path.dirname(__dirname),
      '..',
      'static',
      name,
    );
    try {
      fs.accessSync(filePath, constants.F_OK);

      fs.rmSync(filePath);
    } catch (error) {
      console.log(error);
    }
  }
}
