import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from "@nestjs/common";
import * as yup from 'yup'

export class ValidationPipe implements PipeTransform {
  constructor(
    private schema: yup.AnySchema
  ) {}
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {            
      if (metadata.type === 'param') {
        return value
      }
      if (metadata.type === 'body') {
        return this.schema.validate(value, { abortEarly: false, stripUnknown: false })
      }
    } catch (error) {
      throw new HttpException('Validation error', HttpStatus.BAD_REQUEST)
    }
  }
}