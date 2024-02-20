import { Module } from "@nestjs/common";
import { FileServise } from "./file.service";


@Module({
  providers: [FileServise],
  exports: [FileServise]
})
export class FileModule {}