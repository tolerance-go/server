import 'egg';
import { factory } from 'factory-girl';

declare module 'egg' {
  // 扩展 app
  interface Application {
    factory: typeof factory;
  }
}
