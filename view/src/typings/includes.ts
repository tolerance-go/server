export type WidgetIncludeGroupIncludeLibAndUserAndLicense = API.ShownWidget & {
  widgetGroup: API.ShownWidgetGroup & {
    widgetLib: API.ShownWidgetLib;
  };
  user: API.ShownUser;
  licenses: API.ShownLicense[];
};

export type WidgetGroupIncludeLibAndUserAndWidgetsAndLicense =
  API.ShownWidgetGroup & {
    widgetLib: API.ShownWidgetLib;
    user: API.ShownUser;
    widgets: API.ShownWidget[];
    licenses: API.ShownLicense[];
  };

export type WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense =
  API.ShownWidget & {
    user: API.ShownUser;
    widgetGroups: (API.ShownWidgetGroup & {
      widgets: API.ShownWidget[];
    })[];
    licenses: API.ShownLicense[];
  };
