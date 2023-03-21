import { FormDataKey } from "../Form.types";
import { VALIDATION_ERROR } from "./ErrorMessages.config";

export type FieldValidation = { regex: RegExp; errorMessage: string };

export const VALIDATIONS: Record<
  FormDataKey,
  FieldValidation | FieldValidation[]
> = {
  name: {
    regex: /^[A-Z][a-z]* [A-Z][a-z]*$/,
    errorMessage: VALIDATION_ERROR.name,
  },
  email: {
    regex:
      /^([A-Z]|[a-z])(\w|-|\+|\.)*([A-Z]|[a-z])@([0-9]|[A-Z]|[a-z])([0-9]|[A-Z]|[a-z]|-)*([0-9]|[A-Z]|[a-z])+\.(com|(([A-Z]|[a-z])([A-Z]|[a-z])))$/,
    errorMessage: VALIDATION_ERROR.email,
  },
  password: [
    {
      regex: /^.{8}.*$/,
      errorMessage: VALIDATION_ERROR.password.minCharacters,
    },
    {
      regex: /[A-Z]/,
      errorMessage: VALIDATION_ERROR.password.uppercase,
    },
    {
      regex: /[a-z]/,
      errorMessage: VALIDATION_ERROR.password.lowercase,
    },
    {
      regex: /[0-9]/,
      errorMessage: VALIDATION_ERROR.password.number,
    },
  ],
  website: {
    regex:
      /^(http(s)?:\/\/)?([a-z]|[0-9])+\.(([a-z]|[0-9])+\.)+[a-z][a-z]+(:[0-9]+)?$/,
    errorMessage: VALIDATION_ERROR.website,
  },
};
