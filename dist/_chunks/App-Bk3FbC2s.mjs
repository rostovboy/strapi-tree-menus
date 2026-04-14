import { jsxs, jsx } from "react/jsx-runtime";
import { Layouts, Page, BackButton } from "@strapi/strapi/admin";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Flex, Box, Card, Button } from "@strapi/design-system";
import { Layout, Plus } from "@strapi/icons";
import { useIntl } from "react-intl";
import { g as getTranslation } from "./index-DDuTEwpB.mjs";
const UID_MENU = "plugin::tree-menus.menu";
const Action = ({ children, onClick, size, variant }) => /* @__PURE__ */ jsx(Button, { onClick, startIcon: /* @__PURE__ */ jsx(Plus, {}), variant, size, children });
const HomePage = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const onClickCreate = () => {
    navigate(`/content-manager/collection-types/${UID_MENU}/create`);
  };
  const onClickContentTypeBuilder = () => {
    navigate(`/plugins/content-type-builder/content-types/${UID_MENU}`);
  };
  return /* @__PURE__ */ jsxs(Layouts.Root, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage({ id: getTranslation("plugin.name") }) }),
    /* @__PURE__ */ jsxs(Page.Main, { children: [
      /* @__PURE__ */ jsx(
        Layouts.Header,
        {
          title: formatMessage({ id: getTranslation("plugin.name") }),
          subtitle: formatMessage({
            id: getTranslation("index.header.description"),
            defaultMessage: "Create and manage Menus"
          }),
          primaryAction: /* @__PURE__ */ jsx(Action, { onClick: onClickCreate, children: formatMessage({
            id: getTranslation("ui.create.menu"),
            defaultMessage: "Create new menu"
          }) }),
          navigationAction: /* @__PURE__ */ jsx(BackButton, { disabled: void 0 })
        }
      ),
      /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 3, children: /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Card, { padding: 5, children: /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(
        Flex,
        {
          width: "100%",
          minHeight: "50vh",
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          children: [
            /* @__PURE__ */ jsx(Action, { onClick: onClickCreate, children: formatMessage({
              id: getTranslation("ui.create.menu"),
              defaultMessage: "Create new menu"
            }) }),
            /* @__PURE__ */ jsx(Action, { variant: "secondary", icon: /* @__PURE__ */ jsx(Layout, {}), onClick: onClickContentTypeBuilder, children: formatMessage({
              id: getTranslation("ui.content-type.builder"),
              defaultMessage: "Build content types"
            }) })
          ]
        }
      ) }) }) }) }) })
    ] })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
  ] });
};
export {
  App
};
//# sourceMappingURL=App-Bk3FbC2s.mjs.map
