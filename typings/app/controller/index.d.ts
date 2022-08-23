// This file is created by egg-ts-helper@1.30.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApps from '../../../app/controller/apps';
import ExportComIheritRelations from '../../../app/controller/comIheritRelations';
import ExportComments from '../../../app/controller/comments';
import ExportComponents from '../../../app/controller/components';
import ExportDatabases from '../../../app/controller/databases';
import ExportDiscusses from '../../../app/controller/discusses';
import ExportHome from '../../../app/controller/home';
import ExportPages from '../../../app/controller/pages';
import ExportUsers from '../../../app/controller/users';
import ExportVersions from '../../../app/controller/versions';

declare module 'egg' {
  interface IController {
    apps: ExportApps;
    comIheritRelations: ExportComIheritRelations;
    comments: ExportComments;
    components: ExportComponents;
    databases: ExportDatabases;
    discusses: ExportDiscusses;
    home: ExportHome;
    pages: ExportPages;
    users: ExportUsers;
    versions: ExportVersions;
  }
}
