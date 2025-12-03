import { Controller, Get } from '@nestjs/common';
import { LibraryServiceService } from './library-service.service';

@Controller()
export class LibraryServiceController {
  constructor(private readonly libraryServiceService: LibraryServiceService) {}

  @Get()
  getHello(): string {
    return this.libraryServiceService.getHello();
  }
}
