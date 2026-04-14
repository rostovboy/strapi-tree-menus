import { factories } from "@strapi/strapi";
import * as yup from "yup";
import "traverse";
import "formik";
import { get, omit } from "lodash";
import * as console from "node:console";
const bootstrap = ({ strapi }) => {
};
const destroy = ({ strapi }) => {
};
const PLUGIN_ID = "tree-menus";
const getService = (name, { strapi } = { strapi: global.strapi }) => {
  return strapi.plugin(PLUGIN_ID).service(name);
};
const register = ({ strapi }) => {
  strapi.customFields.register({
    name: "tree",
    plugin: "tree-menus",
    type: "json"
  });
  if (strapi.plugin("documentation")) {
    const overrides = getService("documentation").overrides();
    strapi.plugin("documentation").service("override").registerOverride(overrides, {
      // pluginOrigin: 'tree-menus',
      // excludeFromGeneration: ['tree-menus'],
    });
  }
};
const fieldSchema = {
  attributes: [
    {
      id: "title",
      label: "Title",
      placeholder: "Enter item title",
      type: "text",
      validationType: "string",
      value: "New items",
      required: true,
      validations: [
        {
          type: "required",
          params: ["this field is required"]
        },
        {
          type: "max",
          params: [100, "Title cannot be more than 100 characters"]
        },
        {
          type: "default",
          params: ["New items"]
        }
      ]
    },
    {
      id: "url",
      label: "Url",
      placeholder: "Enter url",
      type: "text",
      validationType: "string",
      value: "/",
      required: true,
      validations: [
        {
          type: "required",
          params: ["this field is required"]
        },
        {
          type: "max",
          params: [200, "Url cannot be more than 200 characters"]
        },
        {
          type: "default",
          params: ["/"]
        }
      ]
    },
    {
      id: "target",
      label: "Target",
      placeholder: "Enter target",
      type: "select",
      validationType: "mixed",
      value: "_self",
      required: true,
      validations: [
        {
          type: "oneOf",
          params: [
            ["_blank", "_parent", "_self", "_top"],
            "this field needs to be one of the following: _blank, _parent, _self, _top"
          ]
        },
        {
          type: "default",
          params: ["_self"]
        }
      ],
      options: [
        {
          key: "_blank",
          value: "_blank",
          metadatas: {
            intlLabel: {
              id: "tree-menus.target.options._blank",
              defaultMessage: "New window (_blank)"
            },
            disabled: false,
            hidden: false
          }
        },
        {
          key: "_parent",
          value: "_parent",
          metadatas: {
            intlLabel: {
              id: "tree-menus.target.options._parent",
              defaultMessage: "Parent window (_parent)"
            },
            disabled: false,
            hidden: false
          }
        },
        {
          key: "_self",
          value: "_self",
          metadatas: {
            intlLabel: {
              id: "tree-menus.target.options._self",
              defaultMessage: "Same window (_self)"
            },
            disabled: false,
            hidden: false
          }
        },
        {
          key: "_top",
          value: "_top",
          metadatas: {
            intlLabel: {
              id: "tree-menus.target.options._top",
              defaultMessage: "Top window (_top)"
            },
            disabled: false,
            hidden: false
          }
        }
      ]
    },
    {
      id: "isProtected",
      label: "isProtected",
      placeholder: "Choose isProtected",
      type: "bool",
      validationType: "boolean",
      value: false,
      required: true,
      validations: [
        {
          type: "required",
          params: ["Need to choose isProtected"]
        },
        {
          type: "default",
          params: [false]
        }
      ]
    }
  ]
};
const UID_MENU = "plugin::tree-menus.menu";
const UID_UPLOAD_FILE = "plugin::upload.file";
const config$1 = {
  default: {},
  validator() {
  },
  fieldSchema
};
const menu$4 = {
  kind: "collectionType",
  collectionName: "menus",
  info: {
    name: "Menu",
    singularName: "menu",
    pluralName: "menus",
    displayName: "Menu",
    description: ""
  },
  options: {
    draftAndPublish: true
  },
  pluginOptions: {
    "content-manager": {
      visible: true
    },
    "content-type-builder": {
      visible: true
    },
    i18n: {
      localized: true
    }
  },
  attributes: {
    title: {
      pluginOptions: {
        i18n: {
          localized: false
        }
      },
      type: "string",
      required: true,
      maxLength: 100,
      configurable: false
    },
    slug: {
      pluginOptions: {
        i18n: {
          localized: true
        }
      },
      type: "uid",
      targetField: "title",
      required: true,
      configurable: false
    },
    items: {
      pluginOptions: {
        i18n: {
          localized: true
        }
      },
      type: "customField",
      options: {
        schemas: JSON.stringify(fieldSchema, null, 2)
      },
      required: true,
      customField: "plugin::tree-menus.tree"
    }
  }
};
const contentTypes = {
  menu: { schema: menu$4 }
};
const createYupSchema = (schemas) => {
  const fieldsSchema = schemas.reduce((schema, current) => {
    const { id, validationType, validations = [] } = current;
    if (!yup[validationType]) {
      return schema;
    }
    let validator = yup[validationType]();
    validations.forEach((validation) => {
      const { params: params2, type } = validation;
      if (!validator[type]) {
        return;
      }
      validator = validator[type](...params2);
    });
    schema[id] = validator;
    return schema;
  }, {});
  const itemSchema = yup.object().shape({ ...fieldsSchema, children: yup.array().of(yup.lazy(() => itemSchema)) });
  return yup.array().of(itemSchema);
};
const requestDataYupSchema = () => {
  const config2 = getService("config").get();
  let itemSchema;
  if (config2.fieldSchema.attributes) {
    itemSchema = createYupSchema(config2.fieldSchema.attributes);
  } else {
    itemSchema = createYupSchema(fieldSchema.attributes);
  }
  return yup.object().shape({
    title: yup.string().max(100).required(),
    slug: yup.string().required(),
    items: yup.lazy(() => itemSchema)
  });
};
const sanitizeInputRequest = (items, parentId) => {
  items.forEach((item, index2) => {
    let itemId = "";
    if (typeof parentId !== "undefined") {
      itemId = `${parentId}.${index2 + 1}`;
    } else {
      itemId = `${index2 + 1}`;
    }
    item.id = itemId;
    if (item.children) {
      item.children = sanitizeInputRequest(item.children, itemId);
    }
  });
  return items;
};
const menu$3 = factories.createCoreController(UID_MENU, ({ strapi }) => ({
  async configuration(ctx) {
    const config2 = getService("config").get();
    const schema = await getService("config").schema();
    ctx.send({
      config: config2,
      schema
    });
  },
  /**
   * Find all menus
   * @param ctx
   */
  async find(ctx) {
    let query = await this.sanitizeQuery(ctx);
    const limit = get(query, "pageSize", 10);
    const start = get(query, "page", 1) * limit - limit;
    ctx.request.query = omit(query, ["page", "pageSize"]);
    ctx.request.query.start = start;
    ctx.request.query.limit = limit;
    return super.find(ctx);
  },
  /**
   * Find one menu
   * @param ctx
   */
  async findOne(ctx) {
    return super.findOne(ctx);
  },
  /**
   * Create a menu
   * @param ctx
   */
  async create(ctx) {
    const body = ctx.request.body;
    const { data } = body || {};
    const validated = await requestDataYupSchema().validate(data, { abortEarly: false });
    validated.items = sanitizeInputRequest(validated.items);
    ctx.request.body.data = validated;
    return super.create(ctx);
  },
  /**
   * Update a menu
   * @param ctx
   */
  async update(ctx) {
    const { data } = ctx.request.body || {};
    const validated = await requestDataYupSchema().validate(data, { abortEarly: false });
    validated.items = sanitizeInputRequest(validated.items);
    ctx.request.body.data = validated;
    return super.update(ctx, data);
  },
  /**
   * Delete a menu
   * @param ctx
   */
  async delete(ctx) {
    return super.delete(ctx);
  },
  /**
   * Delete many menus
   * @param ctx
   */
  async deleteMany(ctx) {
    const { query } = ctx.request;
    const body = ctx.request.body;
    const { data } = body || {};
    const ids = data.ids;
    const locale = get("locale", query) || get("locale", body.data) || void 0;
    return getService("menu").deleteMany(ids, locale);
  }
}));
const controllers = {
  menu: menu$3
};
const middlewares = {};
const policies = {};
const menu$2 = [
  {
    method: "GET",
    path: "/configuration",
    handler: "plugin::tree-menus.menu.configuration",
    config: {
      policies: ["admin::isAuthenticatedAdmin"]
    }
  },
  {
    method: "GET",
    path: "/menu",
    handler: "plugin::tree-menus.menu.find",
    config: {
      policies: ["admin::isAuthenticatedAdmin"]
    }
  },
  {
    method: "GET",
    path: "/menu/:id",
    handler: "plugin::tree-menus.menu.findOne",
    config: {
      policies: ["admin::isAuthenticatedAdmin"]
    }
  },
  {
    method: "POST",
    path: "/menu",
    handler: "plugin::tree-menus.menu.create",
    config: {
      policies: ["admin::isAuthenticatedAdmin"]
    }
  },
  {
    method: "POST",
    path: "/menu/bulk-delete",
    handler: "plugin::tree-menus.menu.deleteMany",
    config: {
      policies: ["admin::isAuthenticatedAdmin"]
    }
  },
  {
    method: "PUT",
    path: "/menu/:id",
    handler: "plugin::tree-menus.menu.update",
    config: {
      policies: ["admin::isAuthenticatedAdmin"]
    }
  },
  {
    method: "DELETE",
    path: "/menu/:id",
    handler: "plugin::tree-menus.menu.delete",
    config: {
      policies: ["admin::isAuthenticatedAdmin"]
    }
  }
];
const adminApi = {
  type: "admin",
  routes: [...menu$2]
};
const menu$1 = [
  {
    method: "GET",
    path: "/menu",
    handler: "plugin::tree-menus.menu.find",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/menu/:id",
    handler: "plugin::tree-menus.menu.findOne",
    config: {
      policies: []
    }
  },
  {
    method: "POST",
    path: "/menu",
    handler: "plugin::tree-menus.menu.create",
    config: {
      policies: []
    }
  },
  {
    method: "POST",
    path: "/menu/bulk-delete",
    handler: "plugin::tree-menus.menu.deleteMany",
    config: {
      policies: []
    }
  },
  {
    method: "PUT",
    path: "/menu/:id",
    handler: "plugin::tree-menus.menu.update",
    config: {
      policies: []
    }
  },
  {
    method: "DELETE",
    path: "/menu/:id",
    handler: "plugin::tree-menus.menu.delete",
    config: {
      policies: []
    }
  }
];
const contentApi = {
  type: "content-api",
  // can also be 'admin' depending on the type of route
  routes: [...menu$1]
};
const routes = {
  admin: adminApi,
  "content-api": contentApi
};
const menu = factories.createCoreService("plugin::tree-menus.menu", ({ strapi }) => ({
  /**
   * Find all menus
   * @param ctx
   */
  async find(ctx) {
    return await super.find(ctx);
  },
  /**
   * Find one menu
   * @param ctx
   */
  async findOne(ctx) {
    return await super.findOne(ctx);
  },
  /**
   * Create a menu
   * @param ctx
   */
  async create(ctx) {
    return await super.create(ctx);
  },
  /**
   *
   * @param ctx
   * @param data
   */
  async update(ctx, data) {
    return await super.update(ctx, data);
  },
  /**
   * Delete a menu
   * @param args
   */
  async delete(args) {
    return await super.delete(args);
  },
  /**
   * Delete many menus
   * @param ids
   * @param locale
   */
  async deleteMany(ids, locale) {
    return await strapi.db.transaction(async ({ rollback, commit }) => {
      try {
        for (const id of ids) {
          await super.delete(id, { locale });
        }
        await commit();
        return ids.length;
      } catch (e) {
        console.error("menu service deleteMany", e);
        await rollback();
      }
    });
  }
}));
const params = [
  {
    name: "sort",
    in: "query",
    description: "Sort by attributes ascending (asc) or descending (desc)",
    deprecated: false,
    required: false,
    schema: {
      type: "string"
    }
  },
  {
    name: "pagination[withCount]",
    in: "query",
    description: "Return page/pageSize (default: true)",
    deprecated: false,
    required: false,
    schema: {
      type: "boolean"
    }
  },
  {
    name: "pagination[page]",
    in: "query",
    description: "Page number (default: 0)",
    deprecated: false,
    required: false,
    schema: {
      type: "integer"
    }
  },
  {
    name: "pagination[pageSize]",
    in: "query",
    description: "Page size (default: 25)",
    deprecated: false,
    required: false,
    schema: {
      type: "integer"
    }
  },
  {
    name: "pagination[start]",
    in: "query",
    description: "Offset value (default: 0)",
    deprecated: false,
    required: false,
    schema: {
      type: "integer"
    }
  },
  {
    name: "pagination[limit]",
    in: "query",
    description: "Number of entities to return (default: 25)",
    deprecated: false,
    required: false,
    schema: {
      type: "integer"
    }
  },
  {
    name: "fields",
    in: "query",
    description: "Fields to return (ex: title,author)",
    deprecated: false,
    required: false,
    schema: {
      type: "string"
    }
  },
  {
    name: "populate",
    in: "query",
    description: "Relations to return",
    deprecated: false,
    required: false,
    schema: {
      type: "string"
    }
  },
  {
    name: "filters",
    in: "query",
    description: "Filters to apply",
    deprecated: false,
    required: false,
    schema: {
      type: "object",
      additionalProperties: true
    },
    style: "deepObject"
  },
  {
    name: "locale",
    in: "query",
    description: "Locale to apply",
    deprecated: false,
    required: false,
    schema: {
      type: "string"
    }
  }
];
const SPEC_NESTING_LIMIT = 3;
const SPEC_RELATION_NESTING_LIMIT = 1;
const documentation = ({ strapi }) => ({
  getAttributesSpec(uid, level = 1) {
    const model = strapi.getModel(uid);
    if (!model) {
      return {};
    }
    return Object.entries(model.attributes).reduce((acc, [key, value]) => {
      let type = "string";
      let extraProps = {};
      if (value.type === "boolean") {
        type = "boolean";
      }
      if (value.type === "datetime") {
        extraProps.format = "date-time";
      }
      if (value.type === "json") {
        type = "object";
      }
      if (value.type === "customField" && value.customField === "plugin::tree-menus.tree") {
        type = "array";
        extraProps.items = {
          type: "object",
          properties: {
            id: {
              type: "string"
            },
            title: {
              type: "string"
            },
            url: {
              type: "string"
            },
            target: {
              type: "string"
            },
            isProtected: {
              type: "boolean"
            },
            children: {
              type: "array",
              items: this.getTreeItemAttributesSpec(level + 1)
            }
          }
        };
      }
      if (["biginteger", "decimal", "float", "integer"].includes(value.type)) {
        type = "number";
      }
      if (value.type === "media") {
        type = "object";
        extraProps.properties = this.getRelationAttributesSpec(UID_UPLOAD_FILE, level, value.multiple);
      }
      if (value.type === "relation") {
        if (value.target !== "admin::user") {
          type = "object";
          extraProps.properties = this.getRelationAttributesSpec(value.target, level, value.relation.includes("Many"));
        } else {
          type = "string";
        }
      }
      return {
        ...acc,
        [key]: {
          ...extraProps,
          type
        }
      };
    }, {});
  },
  getRelationAttributesSpec(uid, level = 1, multiple = false) {
    const relationSpec = {
      type: "object",
      properties: {
        id: {
          type: "number"
        },
        attributes: {
          type: "object",
          properties: level < SPEC_RELATION_NESTING_LIMIT ? this.getAttributesSpec(uid, level + 1) : {}
        }
      }
    };
    return {
      data: multiple ? {
        type: "array",
        items: relationSpec
      } : relationSpec
    };
  },
  getRequiredAttributes(uid) {
    const model = strapi.getModel(uid);
    const attrs = model.attributes;
    return Object.keys(attrs).filter((attr) => attrs[attr].required);
  },
  getTreeItemAttributesSpec(level = 1) {
    return {
      type: "object",
      properties: {
        id: {
          type: "number"
        },
        title: {
          type: "string"
        },
        url: {
          type: "string"
        },
        target: {
          type: "string"
        },
        isProtected: {
          type: "boolean"
        },
        children: {
          type: "array",
          items: level < SPEC_NESTING_LIMIT ? this.getTreeItemAttributesSpec(level + 1) : { type: "object" }
        }
      }
    };
  },
  overrides() {
    const menuSchema = this.getAttributesSpec(UID_MENU);
    const menuRequiredAttrs = this.getRequiredAttributes(UID_MENU);
    const errorSchemas = {
      "400": {
        description: "Bad request",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse"
            }
          }
        }
      },
      "401": {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse"
            }
          }
        }
      },
      "403": {
        description: "Forbidden",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse"
            }
          }
        }
      },
      "404": {
        description: "Not Found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse"
            }
          }
        }
      },
      "500": {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorResponse"
            }
          }
        }
      }
    };
    return {
      tags: [{ name: "Menus", description: "Operations about menus" }],
      components: {
        schemas: {
          Menu: {
            type: "object",
            properties: {
              id: {
                type: "number"
              },
              documentId: {
                type: "string"
              },
              ...menuSchema
            },
            required: menuRequiredAttrs
          },
          Meta: {
            type: "object",
            properties: {
              pagination: {
                type: "object",
                properties: {
                  page: {
                    type: "number"
                  },
                  pageSize: {
                    type: "number"
                  },
                  pageCount: {
                    type: "number"
                  },
                  totalCount: {
                    type: "number"
                  }
                }
              }
            }
          },
          Response: {
            type: "object",
            properties: {
              data: {
                $ref: "#/components/schemas/Menu"
              },
              meta: {
                type: "object"
              }
            }
          },
          FindResponse: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Menu"
                }
              },
              meta: {
                $ref: "#/components/schemas/Meta"
              }
            }
          },
          Error: {
            type: "object",
            properties: {
              status: {
                type: "number"
              },
              name: {
                type: "string"
              },
              message: {
                type: "string"
              },
              details: {
                type: "object"
              }
            }
          },
          ErrorResponse: {
            type: "object",
            properties: {
              data: {
                type: "object"
              },
              error: {
                type: "object",
                items: {
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          },
          UpdateRequest: {
            type: "object",
            properties: {
              data: {
                $ref: "#/components/schemas/Menu",
                locale: {
                  type: "string"
                },
                localizations: {
                  type: "array"
                }
              }
            }
          },
          BulkDeleteRequest: {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  ids: {
                    type: "array",
                    required: true,
                    items: {
                      type: "string"
                    }
                  },
                  locale: {
                    type: "array",
                    reuired: false,
                    items: {
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        }
      },
      paths: {
        "/tree-menus/menu": {
          get: {
            tags: ["Menus"],
            parameters: [...params],
            summary: "Retrieve menu",
            operationId: "findMenu",
            responses: {
              "200": {
                description: "Menus retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/FindResponse"
                    }
                  }
                }
              },
              ...errorSchemas
            }
          },
          post: {
            tags: ["Menus"],
            parameters: [],
            summary: "Create a menu",
            operationId: "createMenu",
            responses: {
              "200": {
                description: "Create Menus successfully",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Response"
                    }
                  }
                }
              },
              ...errorSchemas
            }
          }
        },
        "/tree-menus/menu/{id}": {
          get: {
            tags: ["Menus"],
            parameters: [
              {
                name: `id`,
                in: "path",
                description: "",
                deprecated: false,
                required: true,
                schema: { type: "string" }
              }
            ],
            summary: "Retrieve one menu",
            operationId: "findOneMenu",
            responses: {
              "200": {
                description: "Menus retrieved successfully",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Response"
                    }
                  }
                }
              },
              ...errorSchemas
            }
          },
          put: {
            tags: ["Menus"],
            parameters: [
              {
                name: `id`,
                in: "path",
                description: "",
                deprecated: false,
                required: true,
                schema: { type: "string" }
              }
            ],
            summary: "Update one menu",
            operationId: "updateOneMenu",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Menu"
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Menus updated successfully",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Response"
                    }
                  }
                }
              },
              ...errorSchemas
            }
          },
          delete: {
            tags: ["Menus"],
            parameters: [
              {
                name: `id`,
                in: "path",
                description: "",
                deprecated: false,
                required: true,
                schema: { type: "string" }
              }
            ],
            summary: "Delete one menu",
            operationId: "deleteOneMenu",
            requestBody: {},
            responses: {
              "204": {
                description: "Returns deleted menu",
                content: {
                  "application/json": {
                    schema: {
                      type: "number"
                    }
                  }
                }
              },
              ...errorSchemas
            }
          }
        },
        "/tree-menus/menu/bulk-delete": {
          post: {
            tags: ["Menus"],
            parameters: [],
            summary: "Delete many menu",
            operationId: "deleteManyMenu",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/BulkDeleteRequest"
                  }
                }
              }
            },
            responses: {
              "204": {
                description: "Returns deleted menu",
                content: {
                  "application/json": {
                    schema: {
                      type: "number"
                    }
                  }
                }
              },
              ...errorSchemas
            }
          }
        }
      }
    };
  }
});
const pluginId = "tree-menus";
const config = ({ strapi }) => ({
  get() {
    return strapi.config.get(`plugin.${pluginId}`, config$1);
  },
  async schema() {
    const menuModel = strapi.getModel(UID_MENU);
    return {
      menu: menuModel.attributes
    };
  }
});
const services = {
  menu,
  documentation,
  config
};
const index = {
  register,
  bootstrap,
  destroy,
  config: config$1,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares
};
export {
  index as default
};
//# sourceMappingURL=index.mjs.map
