import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Field, TextInput, TimePicker, Textarea, SingleSelect, SingleSelectOption, NumberInput, DatePicker, DateTimePicker, Checkbox, Toggle, JSONInput, Divider, Card, Grid, Typography, Box, Button } from "@strapi/design-system";
import * as React from "react";
import React__default, { createContext, useState, useEffect, useMemo, useCallback, useContext, forwardRef, useRef } from "react";
import { g as getTranslation, f as fieldSchema } from "./index-C19yl_j-.mjs";
import { useIntl } from "react-intl";
import styled from "styled-components";
import * as yup from "yup";
import { ValidationError } from "yup";
import traverse from "traverse";
import { getIn, setIn } from "formik";
import { arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Eye, EyeStriked, Plus } from "@strapi/icons";
import isEqual from "lodash/isEqual";
import { KeyboardCode, closestCorners, getFirstCollision, MeasuringStrategy, useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter, DragOverlay, defaultDropAnimation } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cloneDeep } from "lodash";
import { createPortal } from "react-dom";
import classNames from "classnames";
const createYupSchema = (schemas) => {
  const fieldsSchema = schemas.reduce((schema, current) => {
    const { id, validationType, validations = [] } = current;
    if (!yup[validationType]) {
      return schema;
    }
    let validator = yup[validationType]();
    validations.forEach((validation) => {
      const { params, type } = validation;
      if (!validator[type]) {
        return;
      }
      validator = validator[type](...params);
    });
    schema[id] = validator;
    return schema;
  }, {});
  const itemSchema = yup.object().shape({ ...fieldsSchema, children: yup.array().of(yup.lazy(() => itemSchema)) });
  return yup.array().of(itemSchema);
};
const resetErrors = (items) => {
  traverse(items).forEach(function(value) {
    if (this.key === "errors") {
      this.remove();
    }
  });
};
const addErrorsToFields = (errors, items) => {
  errors.inner.forEach((error) => {
    let path = error.path;
    path = path.split(".").slice(0, -1).join(".");
    const item = getIn(items, path);
    if (item) {
      item.errors = error.message;
      setIn(items, path, item);
    }
  });
  return items;
};
const sanitizeItems = (items) => {
  return traverse(items).map(function(value) {
    if (this.key === "errors" || // this.key === 'collapsed' ||
    this.key === "parentId" || this.key === "depth" || this.key === "index") {
      this.remove();
    }
  });
};
const iOS = /iPad|iPhone|iPod/.test(navigator.platform);
function getDragDepth(offset, indentationWidth) {
  return Math.round(offset / indentationWidth);
}
function getProjection(items, activeId, overId, dragOffset, indentationWidth) {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;
  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }
  return { depth, maxDepth, minDepth, parentId: getParentId() };
  function getParentId() {
    if (depth === 0 || !previousItem) {
      return null;
    }
    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }
    if (depth > previousItem.depth) {
      return previousItem.id;
    }
    const newParent = newItems.slice(0, overItemIndex).reverse().find((item) => item.depth === depth)?.parentId;
    return newParent ?? null;
  }
}
function getMaxDepth({ previousItem }) {
  if (previousItem) {
    return previousItem.depth + 1;
  }
  return 0;
}
function getMinDepth({ nextItem }) {
  if (nextItem) {
    return nextItem.depth;
  }
  return 0;
}
function flatten(items, parentId = null, depth = 0) {
  return items.reduce((acc, item, index) => {
    return [...acc, { ...item, parentId, depth, index }, ...flatten(item.children, item.id, depth + 1)];
  }, []);
}
function flattenTree(items) {
  return flatten(items);
}
function buildTree(flattenedItems) {
  const root = { id: "root", children: [] };
  const nodes = { [root.id]: root };
  const items = flattenedItems.map((item) => ({ ...item, children: [] }));
  for (const item of items) {
    const { id, children } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);
    nodes[id] = { id, children };
    parent.children.push(item);
  }
  return root.children;
}
function findItem(items, itemId) {
  return items.find(({ id }) => id === itemId);
}
function findItemDeep(items, itemId) {
  for (const item of items) {
    const { id, children } = item;
    if (id === itemId) {
      return item;
    }
    if (children.length) {
      const child = findItemDeep(children, itemId);
      if (child) {
        return child;
      }
    }
  }
  return void 0;
}
function removeItem(items, id) {
  const newItems = [];
  for (const item of items) {
    if (item.id === id) {
      continue;
    }
    if (item.children.length) {
      item.children = removeItem(item.children, id);
    }
    newItems.push(item);
  }
  return newItems;
}
function setProperty(items, id, property, setter) {
  for (const item of items) {
    if (item.id === id) {
      item[property] = setter(item[property]);
      continue;
    }
    if (item.children.length) {
      item.children = setProperty(item.children, id, property, setter);
    }
  }
  return [...items];
}
function countChildren(items, count = 0) {
  return items.reduce((acc, { children }) => {
    if (children.length) {
      return countChildren(children, acc + 1);
    }
    return acc + 1;
  }, count);
}
function getChildCount(items, id) {
  const item = findItemDeep(items, id);
  return item ? countChildren(item.children) : 0;
}
function removeChildrenOf(items, ids) {
  const excludeParentIds = [...ids];
  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }
    return true;
  });
}
const initialValue = {
  name: "",
  value: [],
  items: [],
  setItems: () => {
  },
  activeItem: void 0,
  schema: { attributes: [] },
  setActiveItem: () => {
  },
  onChange: (value) => {
  },
  disabled: false,
  error: void 0,
  errors: {},
  setErrors: () => {
  },
  validate: (value) => {
    return { data: value };
  },
  flattenedItems: [],
  activeId: null,
  setActiveId: () => {
  }
};
const MenuDataContext = createContext(initialValue);
const MenuDataProvider = ({ children, value, onChange, name, schema, disabled, error }) => {
  const [items, setItems] = useState(value);
  const [activeItem, setActiveItem] = useState(void 0);
  const [activeId, setActiveId] = useState(void 0);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setItems(value);
  }, [value]);
  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);
    const collapsedItems = flattenedTree.reduce(
      (acc, { children: children2, collapsed, errors: errors2, id }) => collapsed && children2.length ? [...acc, errors2, id] : acc,
      []
    );
    return removeChildrenOf(flattenedTree, activeId ? [activeId, ...collapsedItems] : collapsedItems);
  }, [items]);
  const validateSchema = useMemo(() => createYupSchema(schema.attributes), [schema.attributes]);
  const handleValidate = useCallback(
    async (items2) => {
      try {
        await validateSchema.validate(items2, { abortEarly: false });
        console.log("validated success");
        resetErrors(items2);
        setErrors(void 0);
        return { data: items2, errors: void 0 };
      } catch (err) {
        console.log("validated error");
        if (err instanceof ValidationError) {
          resetErrors(items2);
          setErrors(void 0);
          const _items = addErrorsToFields(err, items2);
          return { data: _items, errors: err.inner };
        }
        return { data: items2, errors: err.message() };
      }
    },
    [validateSchema]
  );
  const handleOnChange = (items2) => {
    const sanitizedItems = sanitizeItems(items2);
    onChange(name, sanitizedItems);
  };
  return /* @__PURE__ */ jsx(
    MenuDataContext.Provider,
    {
      value: {
        errors,
        setErrors,
        flattenedItems,
        activeId,
        setActiveId,
        items,
        setItems,
        activeItem,
        setActiveItem,
        onChange: handleOnChange,
        value,
        name,
        schema,
        disabled,
        error,
        validate: handleValidate
      },
      children
    }
  );
};
const useTreeData = () => useContext(MenuDataContext);
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument required, but only " + args.length + " present");
  }
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}
function formatISO(date, options) {
  var _options$format, _options$representati;
  requiredArgs(1, arguments);
  var originalDate = toDate(date);
  if (isNaN(originalDate.getTime())) {
    throw new RangeError("Invalid time value");
  }
  var format = String((_options$format = options === null || options === void 0 ? void 0 : options.format) !== null && _options$format !== void 0 ? _options$format : "extended");
  var representation = String((_options$representati = options === null || options === void 0 ? void 0 : options.representation) !== null && _options$representati !== void 0 ? _options$representati : "complete");
  if (format !== "extended" && format !== "basic") {
    throw new RangeError("format must be 'extended' or 'basic'");
  }
  if (representation !== "date" && representation !== "time" && representation !== "complete") {
    throw new RangeError("representation must be 'date', 'time', or 'complete'");
  }
  var result = "";
  var tzOffset = "";
  var dateDelimiter = format === "extended" ? "-" : "";
  var timeDelimiter = format === "extended" ? ":" : "";
  if (representation !== "time") {
    var day = addLeadingZeros(originalDate.getDate(), 2);
    var month = addLeadingZeros(originalDate.getMonth() + 1, 2);
    var year = addLeadingZeros(originalDate.getFullYear(), 4);
    result = "".concat(year).concat(dateDelimiter).concat(month).concat(dateDelimiter).concat(day);
  }
  if (representation !== "date") {
    var offset = originalDate.getTimezoneOffset();
    if (offset !== 0) {
      var absoluteOffset = Math.abs(offset);
      var hourOffset = addLeadingZeros(Math.floor(absoluteOffset / 60), 2);
      var minuteOffset = addLeadingZeros(absoluteOffset % 60, 2);
      var sign = offset < 0 ? "+" : "-";
      tzOffset = "".concat(sign).concat(hourOffset, ":").concat(minuteOffset);
    } else {
      tzOffset = "Z";
    }
    var hour = addLeadingZeros(originalDate.getHours(), 2);
    var minute = addLeadingZeros(originalDate.getMinutes(), 2);
    var second = addLeadingZeros(originalDate.getSeconds(), 2);
    var separator = result === "" ? "" : "T";
    var time = [hour, minute, second].join(timeDelimiter);
    result = "".concat(result).concat(separator).concat(time).concat(tzOffset);
  }
  return result;
}
const parseDateValue = (value) => {
  if (value instanceof Date && isValidDate(value)) {
    return value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    if (isValidDate(date)) {
      return date;
    }
  }
};
const isValidDate = (date) => !isNaN(date.getTime());
const removeSeconds = (time) => {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};
const addSecondsAndMilliseconds = (time) => {
  return time.split(":").length === 2 ? `${time}:00.000` : time;
};
const formatTimeForInput = (value) => {
  if (!value)
    return;
  return value.split(":").length > 2 ? removeSeconds(value) : value;
};
const formatTimeForOutput = (value) => {
  if (!value)
    return void 0;
  return addSecondsAndMilliseconds(value);
};
const handleTimeChange = ({ value }) => {
  const formattedInputTime = formatTimeForInput(value);
  return formattedInputTime;
};
const handleTimeChangeEvent = (onChange, name, type, time) => {
  const formattedOutputTime = formatTimeForOutput(time);
  onChange({
    target: {
      name,
      value: formattedOutputTime,
      type
    }
  });
};
const GenericInput = ({
  autoComplete,
  customInputs,
  description,
  disabled,
  intlLabel,
  labelAction,
  error,
  name,
  onChange,
  options = [],
  placeholder,
  required,
  step,
  type,
  value: defaultValue,
  isNullable,
  attribute,
  ...rest
}) => {
  const { formatMessage } = useIntl();
  const getFieldHintValue = (attribute2, key) => {
    if (!attribute2)
      return;
    if (key === "minLength" && key in attribute2) {
      return attribute2[key];
    }
    if (key === "maxLength" && key in attribute2) {
      return attribute2[key];
    }
    if (key === "max" && key in attribute2) {
      return attribute2[key];
    }
    if (key === "min" && key in attribute2) {
      return attribute2[key];
    }
  };
  const { hint } = useFieldHint({
    description,
    fieldSchema: {
      minLength: getFieldHintValue(attribute, "minLength"),
      maxLength: getFieldHintValue(attribute, "maxLength"),
      max: getFieldHintValue(attribute, "max"),
      min: getFieldHintValue(attribute, "min")
    },
    type: attribute?.type || type
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const CustomInput = customInputs ? customInputs[type] : null;
  const value = defaultValue ?? void 0;
  const valueWithEmptyStringFallback = value ?? "";
  function getErrorMessage(error2) {
    if (!error2) {
      return null;
    }
    if (typeof error2 === "string") {
      return formatMessage({ id: error2, defaultMessage: error2 });
    }
    const values = {
      ...error2.values
    };
    return formatMessage(
      {
        id: error2.id,
        defaultMessage: error2?.defaultMessage ?? error2.id
      },
      values
    );
  }
  const errorMessage = getErrorMessage(error) ?? void 0;
  if (CustomInput) {
    return /* @__PURE__ */ jsx(
      CustomInput,
      {
        ...rest,
        attribute,
        description,
        hint,
        disabled,
        intlLabel,
        labelAction,
        error: errorMessage || "",
        name,
        onChange,
        options,
        required,
        placeholder,
        type,
        value
      }
    );
  }
  const label = intlLabel.id ? formatMessage({ id: intlLabel.id, defaultMessage: intlLabel.defaultMessage }, { ...intlLabel.values }) : name;
  const formattedPlaceholder = placeholder ? formatMessage({ id: placeholder.id, defaultMessage: placeholder.defaultMessage }, { ...placeholder.values }) : "";
  const getComponent = () => {
    switch (type) {
      case "json": {
        return /* @__PURE__ */ jsx(
          JSONInput,
          {
            value,
            disabled,
            onChange: (json) => {
              const value2 = attribute && "required" in attribute && !attribute?.required && !json.length ? null : json;
              onChange({ target: { name, value: value2 } }, false);
            },
            minHeight: "25.2rem",
            maxHeight: "50.4rem"
          }
        );
      }
      case "bool": {
        return /* @__PURE__ */ jsx(
          Toggle,
          {
            checked: defaultValue === null ? null : defaultValue || false,
            disabled,
            offLabel: formatMessage({
              id: "app.components.ToggleCheckbox.off-label",
              defaultMessage: "False"
            }),
            onLabel: formatMessage({
              id: "app.components.ToggleCheckbox.on-label",
              defaultMessage: "True"
            }),
            onChange: (e) => {
              onChange({ target: { name, value: e.target.checked } });
            }
          }
        );
      }
      case "checkbox": {
        return /* @__PURE__ */ jsx(
          Checkbox,
          {
            disabled,
            onCheckedChange: (value2) => {
              onChange({ target: { name, value: value2 } });
            },
            checked: Boolean(value),
            children: label
          }
        );
      }
      case "datetime": {
        const dateValue = parseDateValue(value);
        return /* @__PURE__ */ jsx(
          DateTimePicker,
          {
            clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
            disabled,
            onChange: (date) => {
              const formattedDate = date ? date.toISOString() : null;
              onChange({ target: { name, value: formattedDate, type } });
            },
            onClear: () => onChange({ target: { name, value: null, type } }),
            placeholder: formattedPlaceholder,
            value: dateValue
          }
        );
      }
      case "date": {
        const dateValue = parseDateValue(value);
        return /* @__PURE__ */ jsx(
          DatePicker,
          {
            clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
            disabled,
            onChange: (date) => {
              onChange({
                target: {
                  name,
                  value: date ? formatISO(date, { representation: "date" }) : null,
                  type
                }
              });
            },
            onClear: () => onChange({ target: { name, value: null, type } }),
            placeholder: formattedPlaceholder,
            value: dateValue
          }
        );
      }
      case "number": {
        return /* @__PURE__ */ jsx(
          NumberInput,
          {
            disabled,
            onValueChange: (value2) => {
              onChange({ target: { name, value: value2, type } });
            },
            placeholder: formattedPlaceholder,
            step,
            value
          }
        );
      }
      case "email": {
        return /* @__PURE__ */ jsx(
          TextInput,
          {
            autoComplete,
            disabled,
            onChange: (e) => {
              onChange({ target: { name, value: e.target.value, type } });
            },
            placeholder: formattedPlaceholder,
            type: "email",
            value: valueWithEmptyStringFallback
          }
        );
      }
      case "timestamp":
      case "text":
      case "string": {
        return /* @__PURE__ */ jsx(
          TextInput,
          {
            autoComplete,
            disabled,
            onChange: (e) => {
              onChange({ target: { name, value: e.target.value, type } });
            },
            placeholder: formattedPlaceholder,
            type: "text",
            value: valueWithEmptyStringFallback
          }
        );
      }
      case "password": {
        return /* @__PURE__ */ jsx(
          TextInput,
          {
            autoComplete,
            disabled,
            endAction: /* @__PURE__ */ jsx(
              "button",
              {
                "aria-label": formatMessage({
                  id: "Auth.form.password.show-password",
                  defaultMessage: "Show password"
                }),
                onClick: () => {
                  setShowPassword((prev) => !prev);
                },
                style: {
                  border: "none",
                  padding: 0,
                  background: "transparent"
                },
                type: "button",
                children: showPassword ? /* @__PURE__ */ jsx(Eye, { fill: "neutral500" }) : /* @__PURE__ */ jsx(EyeStriked, { fill: "neutral500" })
              }
            ),
            onChange: (e) => {
              onChange({ target: { name, value: e.target.value, type } });
            },
            placeholder: formattedPlaceholder,
            type: showPassword ? "text" : "password",
            value: valueWithEmptyStringFallback
          }
        );
      }
      case "select": {
        return /* @__PURE__ */ jsx(
          SingleSelect,
          {
            disabled,
            onChange: (value2) => {
              onChange({ target: { name, value: value2, type: "select" } });
            },
            placeholder: formattedPlaceholder,
            value,
            children: options.map(({ metadatas: { intlLabel: intlLabel2, disabled: disabled2, hidden }, key, value: value2 }) => {
              return /* @__PURE__ */ jsx(SingleSelectOption, { value: value2, disabled: disabled2, hidden, children: formatMessage(intlLabel2) }, key);
            })
          }
        );
      }
      case "textarea": {
        return /* @__PURE__ */ jsx(
          Textarea,
          {
            disabled,
            onChange: (event) => onChange({ target: { name, value: event.target.value, type } }),
            placeholder: formattedPlaceholder,
            value: valueWithEmptyStringFallback
          }
        );
      }
      case "time": {
        const formattedValue = handleTimeChange({ value, onChange, name, type });
        return /* @__PURE__ */ jsx(
          TimePicker,
          {
            clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
            disabled,
            onChange: (time) => handleTimeChangeEvent(onChange, name, type, time),
            onClear: () => handleTimeChangeEvent(onChange, name, type, void 0),
            value: formattedValue
          }
        );
      }
      default: {
        return /* @__PURE__ */ jsx(TextInput, { disabled: true, placeholder: "Not supported", type: "text", value: "" });
      }
    }
  };
  return /* @__PURE__ */ jsxs(Field.Root, { error: errorMessage, name, hint, required, children: [
    type !== "checkbox" ? /* @__PURE__ */ jsx(Field.Label, { action: labelAction, children: label }) : null,
    getComponent(),
    /* @__PURE__ */ jsx(Field.Error, {}),
    /* @__PURE__ */ jsx(Field.Hint, {})
  ] });
};
const useFieldHint = ({ description, fieldSchema: fieldSchema2, type }) => {
  const { formatMessage } = useIntl();
  const buildDescription = () => description?.id ? formatMessage({ id: description.id, defaultMessage: description.defaultMessage }, { ...description.values }) : "";
  const buildHint = () => {
    const { maximum, minimum } = getMinMax(fieldSchema2);
    const units = getFieldUnits({
      type,
      minimum,
      maximum
    });
    const minIsNumber = typeof minimum === "number";
    const maxIsNumber = typeof maximum === "number";
    const hasMinAndMax = maxIsNumber && minIsNumber;
    const hasMinOrMax = maxIsNumber || minIsNumber;
    if (!description?.id && !hasMinOrMax) {
      return "";
    }
    return formatMessage(
      {
        id: "content-manager.form.Input.hint.text",
        defaultMessage: "{min, select, undefined {} other {min. {min}}}{divider}{max, select, undefined {} other {max. {max}}}{unit}{br}{description}"
      },
      {
        min: minimum,
        max: maximum,
        description: buildDescription(),
        unit: units?.message && hasMinOrMax ? formatMessage(units.message, units.values) : null,
        divider: hasMinAndMax ? formatMessage({
          id: "content-manager.form.Input.hint.minMaxDivider",
          defaultMessage: " / "
        }) : null,
        br: hasMinOrMax ? /* @__PURE__ */ jsx("br", {}) : null
      }
    );
  };
  return { hint: buildHint() };
};
const getFieldUnits = ({ type, minimum, maximum }) => {
  if (type && ["biginteger", "integer", "number"].includes(type)) {
    return {};
  }
  const maxValue = Math.max(minimum || 0, maximum || 0);
  return {
    message: {
      id: "content-manager.form.Input.hint.character.unit",
      defaultMessage: "{maxValue, plural, one { character} other { characters}}"
    },
    values: {
      maxValue
    }
  };
};
const getMinMax = (fieldSchema2) => {
  if (!fieldSchema2) {
    return { maximum: void 0, minimum: void 0 };
  }
  const { minLength, maxLength, max, min } = fieldSchema2;
  let minimum;
  let maximum;
  const parsedMin = Number(min);
  const parsedMinLength = Number(minLength);
  if (!Number.isNaN(parsedMin)) {
    minimum = parsedMin;
  } else if (!Number.isNaN(parsedMinLength)) {
    minimum = parsedMinLength;
  }
  const parsedMax = Number(max);
  const parsedMaxLength = Number(maxLength);
  if (!Number.isNaN(parsedMax)) {
    maximum = parsedMax;
  } else if (!Number.isNaN(parsedMaxLength)) {
    maximum = parsedMaxLength;
  }
  return { maximum, minimum };
};
const MemoizedGenericInput = React.memo(GenericInput, isEqual);
const DividerFull = styled(Divider)`
  flex: 1;
`;
const FormLayout = ({ ...props }) => {
  const { formatMessage } = useIntl();
  const {
    flattenedItems,
    items,
    setItems,
    activeItem,
    setActiveItem,
    schema: { attributes },
    onChange,
    validate,
    name,
    value,
    disabled
  } = useTreeData();
  const handleChange = async (field, fieldValue) => {
    if (activeItem) {
      setActiveItem((item) => item ? { ...item, [field]: fieldValue } : void 0);
      const newFlattenedItems = flattenedItems.map((item) => {
        if (item.id === activeItem.id) {
          item[field] = fieldValue;
        }
        return item;
      });
      const newItems = buildTree(newFlattenedItems);
      const result = await validate(newItems);
      setItems(result.data);
      if (!result.errors) {
        onChange(result.data);
      } else {
        throw new ValidationError(result.errors);
      }
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: activeItem ? /* @__PURE__ */ jsx(Card, { padding: 2, children: /* @__PURE__ */ jsxs(Grid.Root, { gap: 3, children: [
    /* @__PURE__ */ jsx(Grid.Item, { col: 12, s: 12, xs: 12, children: /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h3", children: formatMessage(
      {
        id: getTranslation("tree-menus.edit-form.title"),
        defaultMessage: "Edit {0}"
      },
      { 0: activeItem.title }
    ) }) }),
    /* @__PURE__ */ jsx(Grid.Item, { col: 12, s: 12, xs: 12, children: /* @__PURE__ */ jsx(DividerFull, { marginBottom: 3 }) }),
    attributes.map((attribute) => {
      return /* @__PURE__ */ jsx(Grid.Item, { col: 12, s: 12, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(
        MemoizedGenericInput,
        {
          name: attribute.id,
          value: activeItem[attribute.id],
          type: attribute.type,
          disabled,
          required: attribute.required,
          options: Array.isArray(attribute.options) ? attribute.options : [],
          intlLabel: {
            id: getTranslation(`tree-menus.edit-form.${attribute.id}.label`),
            defaultMessage: attribute.label
          },
          labelAction: /* @__PURE__ */ jsx(Fragment, {}),
          onChange: (e) => handleChange(attribute.id, e.target.value),
          placeholder: {
            id: getTranslation(`tree-menus.edit-form.${attribute.id}.placeholder`),
            defaultMessage: attribute.placeholder
          }
        }
      ) }) }, attribute.id);
    })
  ] }) }) : null });
};
const ActionButton = styled.button`
  display: flex;
  width: 12px;
  padding: 15px;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  touch-action: none;
  cursor: var(--cursor, pointer);
  border-radius: 5px;
  border: none;
  outline: none;
  appearance: none;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;

  svg {
    flex: 0 0 auto;
    margin: auto;
    height: 100%;
    overflow: visible;
    fill: #919eab;
  }

  &:active {
    background-color: var(--background, rgba(0, 0, 0, 0.05));

    svg {
      fill: var(--fill, #788491);
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px rgba(255, 255, 255, 0),
      0 0px 0px 2px #4c9ffe;
  }

  @media (hover: hover) {
    &:hover {
      background-color: var(--action-background, rgba(0, 0, 0, 0.05));

      svg {
        fill: #6f7b88;
      }
    }
  }
`;
const Action = forwardRef(({ active, className, cursor, style, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ActionButton,
    {
      ref,
      ...props,
      className: classNames("Action", className),
      tabIndex: 0,
      style: {
        ...style,
        cursor,
        "--fill": active?.fill,
        "--background": active?.background
      }
    }
  );
});
function Add(props) {
  return /* @__PURE__ */ jsx(
    Action,
    {
      ...props,
      active: {
        fill: "rgba(255, 70, 70, 0.95)",
        background: "rgba(255, 70, 70, 0.1)"
      },
      children: /* @__PURE__ */ jsx("svg", { width: "12", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", children: /* @__PURE__ */ jsx("path", { d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" }) })
    }
  );
}
function Edit(props) {
  return /* @__PURE__ */ jsx(
    Action,
    {
      ...props,
      active: {
        fill: "rgba(255, 70, 70, 0.95)",
        background: "rgba(255, 70, 70, 0.1)"
      },
      children: /* @__PURE__ */ jsx("svg", { width: "12", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", children: /* @__PURE__ */ jsx("path", { d: "M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" }) })
    }
  );
}
const Wrapper = styled.li`
  list-style: none;
  box-sizing: border-box;
  padding-left: var(--spacing);
  margin-bottom: -1px;

  &.clone {
    display: inline-block;
    pointer-events: none;
    padding: 5px 0 0 10px;

    .TreeItem {
      --vertical-padding: 5px;

      padding-right: 24px;
      border-radius: 4px;
      box-shadow: 0 15px 15px 0 rgba(34, 33, 81, 0.1);
    }
  }

  &.ghost {
    &.indicator {
      opacity: 1;
      position: relative;
      z-index: 1;
      margin-bottom: -1px;

      .TreeItem {
        position: relative;
        padding: 0;
        height: 8px;
        border-color: #2389ff;
        background-color: #56a1f8;

        &:before {
          position: absolute;
          left: -8px;
          top: -4px;
          display: block;
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid #2389ff;
          background-color: #ffffff;
        }

        > * {
          /* Items are hidden using height and opacity to retain focus */
          opacity: 0;
          height: 0;
        }
      }
    }

    &:not(.indicator) {
      opacity: 0.5;
    }

    .TreeItem > * {
      box-shadow: none;
      background-color: transparent;
    }
  }

  .TreeItem {
    --vertical-padding: 10px;

    position: relative;
    display: flex;
    align-items: center;
    padding: var(--vertical-padding) 10px;
    background-color: #fff;
    border: 1px solid #dedede;
    color: #222;
    box-sizing: border-box;
  }

  .Text {
    flex-grow: 1;
    padding-left: 0.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .Count {
    position: absolute;
    top: -10px;
    right: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #2389ff;
    font-size: 0.8rem;
    font-weight: 600;
    color: #fff;
  }

  .disableInteraction {
    pointer-events: none;
  }

  .disableSelection,
  .clone {
    .Text,
    .Count {
      user-select: none;
      -webkit-user-select: none;
    }
  }

  .Collapse {
    svg {
      transition: transform 250ms ease;
    }

    &.collapsed svg {
      transform: rotate(-90deg);
    }
  }
`;
const TreeItem = forwardRef(
  ({
    childCount,
    errors,
    clone,
    depth,
    disableSelection,
    disableInteraction,
    disabled,
    ghost,
    handleProps,
    indentationWidth,
    indicator,
    collapsed,
    onCollapse,
    onRemove,
    onEdit,
    onAdd,
    style,
    value,
    wrapperRef,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsx(
      Wrapper,
      {
        className: classNames(
          "Wrapper",
          clone && "clone",
          ghost && "ghost",
          indicator && "indicator",
          disableSelection && "disableSelection",
          disableInteraction && "disableInteraction"
        ),
        ref: wrapperRef,
        style: {
          "--spacing": `${indentationWidth * depth}px`
        },
        ...props,
        children: /* @__PURE__ */ jsxs("div", { className: "TreeItem", ref, style, children: [
          !disabled && /* @__PURE__ */ jsx(Handle, { ...handleProps }),
          onCollapse && /* @__PURE__ */ jsx(Action, { onClick: onCollapse, className: classNames("Collapse", collapsed && "collapsed"), children: collapseIcon }),
          /* @__PURE__ */ jsx(Typography, { className: "Text", children: value }),
          !clone && !disabled && onAdd && /* @__PURE__ */ jsx(Add, { onClick: onAdd }),
          !clone && !disabled && onEdit && /* @__PURE__ */ jsx(Edit, { onClick: onEdit }),
          !clone && !disabled && onRemove && /* @__PURE__ */ jsx(Remove, { onClick: onRemove }),
          clone && childCount && childCount > 1 ? /* @__PURE__ */ jsx("span", { className: "Count", children: childCount }) : null
        ] })
      }
    );
  }
);
const collapseIcon = /* @__PURE__ */ jsx("svg", { width: "10", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 70 41", children: /* @__PURE__ */ jsx("path", { d: "M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z" }) });
const animateLayoutChanges = ({ isSorting, wasDragging }) => !(isSorting || wasDragging);
function SortableTreeItem({ id, depth, disabled, errors, ...props }) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition
  } = useSortable({ id, animateLayoutChanges, disabled });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  };
  if (errors) {
    style.border = "1px solid red";
  }
  return /* @__PURE__ */ jsx(
    TreeItem,
    {
      ref: setDraggableNodeRef,
      wrapperRef: setDroppableNodeRef,
      style,
      depth,
      ghost: isDragging,
      disableSelection: iOS,
      disableInteraction: isSorting,
      disabled,
      errors,
      handleProps: {
        ...attributes,
        ...listeners
      },
      ...props
    }
  );
}
function Remove(props) {
  return /* @__PURE__ */ jsx(
    Action,
    {
      ...props,
      active: {
        fill: "rgba(255, 70, 70, 0.95)",
        background: "rgba(255, 70, 70, 0.1)"
      },
      children: /* @__PURE__ */ jsx("svg", { width: "12", viewBox: "0 0 22 22", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M2.99998 -0.000206962C2.7441 -0.000206962 2.48794 0.0972617 2.29294 0.292762L0.292945 2.29276C-0.0980552 2.68376 -0.0980552 3.31682 0.292945 3.70682L7.58591 10.9998L0.292945 18.2928C-0.0980552 18.6838 -0.0980552 19.3168 0.292945 19.7068L2.29294 21.7068C2.68394 22.0978 3.31701 22.0978 3.70701 21.7068L11 14.4139L18.2929 21.7068C18.6829 22.0978 19.317 22.0978 19.707 21.7068L21.707 19.7068C22.098 19.3158 22.098 18.6828 21.707 18.2928L14.414 10.9998L21.707 3.70682C22.098 3.31682 22.098 2.68276 21.707 2.29276L19.707 0.292762C19.316 -0.0982383 18.6829 -0.0982383 18.2929 0.292762L11 7.58573L3.70701 0.292762C3.51151 0.0972617 3.25585 -0.000206962 2.99998 -0.000206962Z" }) })
    }
  );
}
const Handle = forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(Action, { ref, cursor: "grab", "data-cypress": "draggable-handle", ...props, children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 20 20", width: "12", children: /* @__PURE__ */ jsx("path", { d: "M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" }) }) });
});
const directions = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];
const horizontal = [KeyboardCode.Left, KeyboardCode.Right];
const sortableTreeKeyboardCoordinates = (context, indicator, indentationWidth) => (event, { currentCoordinates, context: { active, over, collisionRect, droppableRects, droppableContainers } }) => {
  if (directions.includes(event.code)) {
    if (!active || !collisionRect) {
      return;
    }
    event.preventDefault();
    const {
      current: { items, offset }
    } = context;
    if (horizontal.includes(event.code) && over?.id) {
      const { depth, maxDepth, minDepth } = getProjection(items, active.id, over.id, offset, indentationWidth);
      switch (event.code) {
        case KeyboardCode.Left:
          if (depth > minDepth) {
            return {
              ...currentCoordinates,
              x: currentCoordinates.x - indentationWidth
            };
          }
          break;
        case KeyboardCode.Right:
          if (depth < maxDepth) {
            return {
              ...currentCoordinates,
              x: currentCoordinates.x + indentationWidth
            };
          }
          break;
      }
      return void 0;
    }
    const containers = [];
    droppableContainers.forEach((container) => {
      if (container?.disabled || container.id === over?.id) {
        return;
      }
      const rect = droppableRects.get(container.id);
      if (!rect) {
        return;
      }
      switch (event.code) {
        case KeyboardCode.Down:
          if (collisionRect.top < rect.top) {
            containers.push(container);
          }
          break;
        case KeyboardCode.Up:
          if (collisionRect.top > rect.top) {
            containers.push(container);
          }
          break;
      }
    });
    const collisions = closestCorners({
      active,
      collisionRect,
      pointerCoordinates: null,
      droppableRects,
      droppableContainers: containers
    });
    let closestId = getFirstCollision(collisions, "id");
    if (closestId === over?.id && collisions.length > 1) {
      closestId = collisions[1].id;
    }
    if (closestId && over?.id) {
      const activeRect = droppableRects.get(active.id);
      const newRect = droppableRects.get(closestId);
      const newDroppable = droppableContainers.get(closestId);
      if (activeRect && newRect && newDroppable) {
        const newIndex = items.findIndex(({ id }) => id === closestId);
        const newItem = items[newIndex];
        const activeIndex = items.findIndex(({ id }) => id === active.id);
        const activeItem = items[activeIndex];
        if (newItem && activeItem) {
          const { depth } = getProjection(
            items,
            active.id,
            closestId,
            (newItem.depth - activeItem.depth) * indentationWidth,
            indentationWidth
          );
          const isBelow = newIndex > activeIndex;
          const modifier = isBelow ? 1 : -1;
          const offset2 = indicator ? (collisionRect.height - activeRect.height) / 2 : 0;
          const newCoordinates = {
            x: newRect.left + depth * indentationWidth,
            y: newRect.top + modifier * offset2
          };
          return newCoordinates;
        }
      }
    }
  }
  return void 0;
};
const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always
  }
};
const dropAnimationConfig = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5
        })
      }
    ];
  },
  easing: "ease-out",
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing
    });
  }
};
function SortableTree({ collapsible, indicator = false, indentationWidth = 50, removable }) {
  const { flattenedItems, activeId, setActiveId, items, setItems, disabled, setActiveItem, onChange, validate } = useTreeData();
  const { formatMessage } = useIntl();
  const [overId, setOverId] = useState(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);
  const projected = activeId && overId ? getProjection(flattenedItems, activeId, overId, offsetLeft, indentationWidth) : null;
  const sensorContext = useRef({ items: flattenedItems, offset: offsetLeft });
  const [coordinateGetter] = useState(() => sortableTreeKeyboardCoordinates(sensorContext, indicator, indentationWidth));
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter }));
  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [flattenedItems]);
  const activeSelectedItem = activeId ? flattenedItems.find(({ id }) => id === activeId) : null;
  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft
    };
  }, [flattenedItems, offsetLeft]);
  const announcements = {
    onDragStart({ active }) {
      return `Picked up ${active.id}.`;
    },
    onDragMove({ active, over }) {
      return getMovementAnnouncement("onDragMove", active.id, over?.id);
    },
    onDragOver({ active, over }) {
      return getMovementAnnouncement("onDragOver", active.id, over?.id);
    },
    onDragEnd({ active, over }) {
      return getMovementAnnouncement("onDragEnd", active.id, over?.id);
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`;
    }
  };
  return /* @__PURE__ */ jsx(
    DndContext,
    {
      accessibility: { announcements },
      sensors,
      collisionDetection: closestCenter,
      measuring,
      onDragStart: handleDragStart,
      onDragMove: handleDragMove,
      onDragOver: handleDragOver,
      onDragEnd: handleDragEnd,
      onDragCancel: handleDragCancel,
      children: /* @__PURE__ */ jsxs(SortableContext, { items: sortedIds, strategy: verticalListSortingStrategy, children: [
        flattenedItems.map(({ id, title, errors, children, collapsed, depth }) => {
          return /* @__PURE__ */ jsx(
            SortableTreeItem,
            {
              id,
              value: title,
              errors,
              depth: id === activeId && projected ? projected.depth : depth,
              indentationWidth,
              indicator,
              collapsed: Boolean(collapsed && children.length),
              onCollapse: collapsible && children.length ? () => handleCollapse(id) : void 0,
              onRemove: removable ? () => handleRemove(id) : void 0,
              onEdit: () => handleEditItem(id),
              onAdd: () => handleAddItem(id),
              disabled
            },
            id
          );
        }),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            startIcon: /* @__PURE__ */ jsx(Plus, {}),
            variant: "secondary",
            paddingTop: 2,
            paddingBottom: 2,
            onClick: () => handleAddItem(),
            children: formatMessage({
              id: "tree-menus.add-new-item",
              defaultMessage: "Add new item"
            })
          }
        ),
        createPortal(
          /* @__PURE__ */ jsx(DragOverlay, { dropAnimation: dropAnimationConfig, modifiers: indicator ? [adjustTranslate] : void 0, children: activeId && activeSelectedItem ? /* @__PURE__ */ jsx(
            SortableTreeItem,
            {
              id: activeId,
              depth: activeSelectedItem.depth,
              clone: true,
              childCount: getChildCount(items, activeId) + 1,
              value: activeId.toString(),
              indentationWidth
            }
          ) : null }),
          document.body
        )
      ] })
    }
  );
  function handleDragStart({ active: { id: activeId2 } }) {
    setActiveId(activeId2);
    setOverId(activeId2);
    const activeItem = flattenedItems.find(({ id }) => id === activeId2);
    if (activeItem) {
      setCurrentPosition({ parentId: activeItem.parentId, overId: activeId2 });
    }
    document.body.style.setProperty("cursor", "grabbing");
  }
  function handleDragMove({ delta }) {
    setOffsetLeft(delta.x);
  }
  function handleDragOver({ over }) {
    setOverId(over?.id ?? null);
  }
  function handleDragEnd({ active, over }) {
    resetState();
    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems = JSON.parse(JSON.stringify(flattenTree(items)));
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];
      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = buildTree(sortedItems);
      setItems(newItems);
      onChange(newItems);
    }
  }
  function handleDragCancel() {
    resetState();
  }
  function resetState() {
    setOverId(null);
    setActiveId(void 0);
    setOffsetLeft(0);
    setCurrentPosition(null);
    document.body.style.setProperty("cursor", "");
  }
  function handleRemove(id) {
    const newItems = removeItem(cloneDeep(items), id);
    setItems(newItems);
    onChange(newItems);
  }
  function handleCollapse(id) {
    const newItems = setProperty(cloneDeep(items), id, "collapsed", (value) => {
      return !value;
    });
    setItems(newItems);
    onChange(newItems);
  }
  function getMovementAnnouncement(eventName, activeId2, overId2) {
    if (overId2 && projected) {
      if (eventName !== "onDragEnd") {
        if (currentPosition && projected.parentId === currentPosition.parentId && overId2 === currentPosition.overId) {
          return;
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId: overId2
          });
        }
      }
      const clonedItems = JSON.parse(JSON.stringify(flattenTree(items)));
      const overIndex = clonedItems.findIndex(({ id }) => id === overId2);
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId2);
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const previousItem = sortedItems[overIndex - 1];
      let announcement;
      const movedVerb = eventName === "onDragEnd" ? "dropped" : "moved";
      const nestedVerb = eventName === "onDragEnd" ? "dropped" : "nested";
      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1];
        announcement = `${activeId2} was ${movedVerb} before ${nextItem.id}.`;
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId2} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling = previousItem;
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId = previousSibling.parentId;
            previousSibling = sortedItems.find(({ id }) => id === parentId);
          }
          if (previousSibling) {
            announcement = `${activeId2} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      }
      return announcement;
    }
    return;
  }
  async function handleAddItem(parentId = null) {
    let _items = cloneDeep(items);
    if (!parentId) {
      const newItem = {
        id: `${_items.length + 1}`,
        title: `New ${_items.length + 1}`,
        url: "/",
        target: "_self",
        isProtected: true,
        children: []
      };
      _items.push(newItem);
    } else {
      const parentItem = flattenedItems.find((item) => item.id === parentId);
      if (parentItem) {
        const clonedItems = JSON.parse(JSON.stringify(flattenTree(_items)));
        clonedItems.push({
          id: `${parentId}.${parentItem.children.length + 1}`,
          title: `New ${parentId}.${parentItem.children.length + 1}`,
          url: "/",
          target: "_self",
          isProtected: true,
          children: [],
          depth: parentItem.depth + 1,
          index: parentItem.children.length,
          parentId: parentItem.id
        });
        _items = buildTree(clonedItems);
      }
    }
    const result = await validate(_items);
    setItems(result.data);
    if (!result.errors) {
      onChange(result.data);
    } else {
      throw new ValidationError(result.errors);
    }
  }
  function handleEditItem(id) {
    const activeItem = flattenedItems.find(({ id: _id }) => _id === id);
    setActiveItem(activeItem);
  }
}
const adjustTranslate = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25
  };
};
const TreeInput = React__default.forwardRef(
  ({ hint, disabled = false, labelAction, label, name, required = false, onChange, value = [], error, ...props }, forwardedRef) => {
    const {
      attribute: {
        options: { schemas }
      }
    } = props;
    let _schemas;
    if (!schemas) {
      console.log("no schema");
      _schemas = fieldSchema;
    } else {
      console.log("schema from options");
      _schemas = JSON.parse(schemas);
    }
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
      MenuDataProvider,
      {
        name,
        value,
        onChange,
        schema: _schemas,
        disabled,
        error,
        children: /* @__PURE__ */ jsxs(Field.Root, { name, id: name, error, hint, required, children: [
          /* @__PURE__ */ jsx(Field.Label, { action: labelAction, children: label }),
          /* @__PURE__ */ jsxs(Grid.Root, { gap: 4, marginTop: 10, children: [
            /* @__PURE__ */ jsx(Grid.Item, { col: 8, s: 12, xs: 12, alignItems: "start", justifyContent: "start", children: /* @__PURE__ */ jsx("ul", { style: { display: "flex", flexDirection: "column", flex: 1, gap: "5px" }, children: /* @__PURE__ */ jsx(SortableTree, { collapsible: true, indicator: true, removable: true }) }) }),
            /* @__PURE__ */ jsx(Grid.Item, { col: 4, s: 12, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(FormLayout, {}) }) })
          ] })
        ] })
      }
    ) });
  }
);
export {
  TreeInput
};
//# sourceMappingURL=TreeInput--u-agrm8.mjs.map
