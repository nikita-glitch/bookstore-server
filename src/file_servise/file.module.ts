import { Module } from "@nestjs/common";
import { FileServise } from "./file.service";


@Module({
  providers: [FileServise],
})
export class FileModule {}