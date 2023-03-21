import { FormDataKey } from "../Form.types";

export const VALIDATIONS: Record<FormDataKey, RegExp | RegExp[]> = {
  name: /^[A-Z][a-z]* [A-Z][a-z]*$/,
  email:
    /^([A-Z]|[a-z])(\w|-|\+|\.)*([A-Z]|[a-z])@([0-9]|[A-Z]|[a-z])([0-9]|[A-Z]|[a-z]|-)*([0-9]|[A-Z]|[a-z])+\.(com|(([A-Z]|[a-z])([A-Z]|[a-z])))$/,
  password: [/\d/, /[A-Z]/, /[a-z]/, /[0-9]/, /^.{8}.*$/],
  website:
    /^(http(s)?:\/\/)?([a-z]|[0-9])+\.(([a-z]|[0-9])+\.)?[a-z][a-z]+$/,
};
