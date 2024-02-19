import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileServise {
  createFile(file: Express.Multer.File): string {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = uuid.v4() + '.' + fileExtension;
    const filePath = path.resolve(__dirname, '..', 'static', 'image');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
    return 'image' + '/' + fileName;
  }
}