// This file is created by egg-ts-helper@1.30.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApps from '../../../app/controller/apps';
import ExportHome from '../../../app/controller/home';
import ExportPages from '../../../app/controller/pages';
import ExportUsers from '../../../app/controller/users';
import ExportVersions from '../../../app/controller/versions';

declare module 'egg' {
  interface IController {
    apps: ExportApps;
    home: ExportHome;
    pages: ExportPages;
    users: ExportUsers;
    versions: ExportVersions;
  }
}
