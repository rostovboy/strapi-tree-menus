"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const reactIntl = require("react-intl");
const index = require("./index-DnT7Pczv.js");
const UID_MENU = "plugin::tree-menus.menu";
const Action = ({ children, onClick, size, variant }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), variant, size, children });
const HomePage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const navigate = reactRouterDom.useNavigate();
  const onClickCreate = () => {
    navigate(`/content-manager/collection-types/${UID_MENU}/create`);
  };
  const onClickContentTypeBuilder = () => {
    navigate(`/plugins/content-type-builder/content-types/${UID_MENU}`);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(admin.Layouts.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: formatMessage({ id: index.getTranslation("plugin.name") }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        admin.Layouts.Header,
        {
          title: formatMessage({ id: index.getTranslation("plugin.name") }),
          subtitle: formatMessage({
            id: index.getTranslation("index.header.description"),
            defaultMessage: "Create and manage Menus"
          }),
          primaryAction: /* @__PURE__ */ jsxRuntime.jsx(Action, { onClick: onClickCreate, children: formatMessage({
            id: index.getTranslation("ui.create.menu"),
            defaultMessage: "Create new menu"
          }) }),
          navigationAction: /* @__PURE__ */ jsxRuntime.jsx(admin.BackButton, { disabled: void 0 })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 3, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Card, { padding: 5, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Flex,
        {
          width: "100%",
          minHeight: "50vh",
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(Action, { onClick: onClickCreate, children: formatMessage({
              id: index.getTranslation("ui.create.menu"),
              defaultMessage: "Create new menu"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(Action, { variant: "secondary", icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Layout, {}), onClick: onClickContentTypeBuilder, children: formatMessage({
              id: index.getTranslation("ui.content-type.builder"),
              defaultMessage: "Build content types"
            }) })
          ]
        }
      ) }) }) }) }) })
    ] })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] });
};
exports.App = App;
//# sourceMappingURL=App-bsMfitKB.js.map
