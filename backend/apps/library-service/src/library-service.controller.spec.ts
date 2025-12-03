import { Test, TestingModule } from '@nestjs/testing';
import { LibraryServiceController } from './library-service.controller';
import { LibraryServiceService } from './library-service.service';

describe('LibraryServiceController', () => {
  let libraryServiceController: LibraryServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LibraryServiceController],
      providers: [LibraryServiceService],
    }).compile();

    libraryServiceController = app.get<LibraryServiceController>(LibraryServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(libraryServiceController.getHello()).toBe('Hello World!');
    });
  });
});
