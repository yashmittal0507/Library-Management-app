import { Injectable } from '@nestjs/common';

@Injectable()
export class LibraryServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
