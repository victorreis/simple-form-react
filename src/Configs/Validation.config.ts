import { FormDataKey } from "../Form.types";
import { REQUIRED_ERROR, VALIDATION_ERROR } from "./ErrorMessages.config";

export type FieldValidation = { regex: RegExp; errorMessage: string };

const NOT_EMPTY_REGEX = /^.+$/;

export const VALIDATIONS: Record<FormDataKey, FieldValidation[]> = {
  name: [
    {
      regex: NOT_EMPTY_REGEX,
      errorMessage: REQUIRED_ERROR("name"),
    },
    {
      regex: /^[A-Z][a-z]* [A-Z][a-z]*$/,
      errorMessage: VALIDATION_ERROR.name,
    },
  ],
  email: [
    {
      regex: NOT_EMPTY_REGEX,
      errorMessage: REQUIRED_ERROR("email"),
    },
    {
      regex:
        /^([A-Za-z])(\w|-|\+|\.)*([A-Za-z])@\w(\w|-)*\w+\.([A-Za-z][A-Za-z][A-Za-z]*)$/,
      errorMessage: VALIDATION_ERROR.email,
    },
  ],
  password: [
    {
      regex: NOT_EMPTY_REGEX,
      errorMessage: REQUIRED_ERROR("password"),
    },
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
  website: [
    {
      regex: NOT_EMPTY_REGEX,
      errorMessage: REQUIRED_ERROR("website"),
    },
    {
      regex:
        /^(http(s)?:\/\/)?[a-z0-9]+\.([a-z0-9]+\.)*[A-Za-z][A-Za-z]+(:[0-9]+)?$/,
      errorMessage: VALIDATION_ERROR.website,
    },
  ],
};
