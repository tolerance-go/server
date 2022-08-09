// This file is created by egg-ts-helper@1.30.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/model/app';
import ExportComponent from '../../../app/model/component';
import ExportPage from '../../../app/model/page';
import ExportUser from '../../../app/model/user';
import ExportVersion from '../../../app/model/version';

declare module 'egg' {
  interface IModel {
    App: ReturnType<typeof ExportApp>;
    Component: ReturnType<typeof ExportComponent>;
    Page: ReturnType<typeof ExportPage>;
    User: ReturnType<typeof ExportUser>;
    Version: ReturnType<typeof ExportVersion>;
  }
}
