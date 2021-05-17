import { Logger } from '@nestjs/common';

export class MyLogger extends Logger {
  error(message: string, trace: string) {
    console.log(this.error);
    super.error(message, trace);
  }
}
