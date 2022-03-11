import { Injectable } from '@nestjs/common';
import {
  plainToClass,
  ClassConstructor,
  instanceToPlain,
} from 'class-transformer';

@Injectable()
export class MapperService {
  public toDTO<T>(object: T, entity: ClassConstructor<T>): T {
    const plainObject = instanceToPlain(object);
    const dtoObjectTransform = plainToClass(entity, plainObject);
    return dtoObjectTransform;
  }

  public toArrayDTO<T>(objects: T[], entity: ClassConstructor<T>): T[] {
    return objects.map((object) => {
      const plainObject = instanceToPlain(object);
      return plainToClass(entity, plainObject);
    });
  }
}
