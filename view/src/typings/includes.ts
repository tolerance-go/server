export type WidgetIncludeGroupIncludeLibAndUserAndLicense = API.Widget & {
  widgetGroup: API.WidgetGroup & {
    widgetLib: API.WidgetLib;
  };
  user: API.User;
  licenses: API.License[];
};

export type WidgetGroupIncludeLibAndUserAndWidgetsAndLicense =
  API.WidgetGroup & {
    widgetLib: API.WidgetLib;
    user: API.User;
    widgets: API.Widget[];
    licenses: API.License[];
  };

export type WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense =
  API.Widget & {
    user: API.User;
    widgetGroups: (API.WidgetGroup & {
      widgets: API.Widget[];
    })[];
    licenses: API.License[];
  };
