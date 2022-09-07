import { HistoryManager } from '@/pages/design/domains/HistoryManager';
import '@fenxing/common/services/server/typings';
import '@umijs/max/typings';
import consola from 'consola';
import { original } from 'immer';

declare global {
  interface Window {
    __original: typeof original;
    __consola: typeof consola;
    __historyManager: HistoryManager;
  }
}
