import { Injectable } from '@nestjs/common';
import { NineService } from './nein.service';

@Injectable()
export class SomeService {
  constructor(private readonly neinService: NineService) {}
  greetings() {
    return 'henlo';
  }

  insulting() {
    return "it's mocking raw!!!";
  }

  begging() {
    return "plz sir, don't shoot";
  }
}
