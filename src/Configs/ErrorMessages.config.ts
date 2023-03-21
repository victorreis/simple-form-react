import { FormDataKey } from "../Form.types";

export const VALIDATION_ERROR: Record<FormDataKey, string> = {
  name: `Name should be in the form of "FirstName LastName".`,
  email: `Email should be a valid email in the form of "email@domain.com" | "foo-bar@123.xy" | "plus+sign@hyphenated-domain.xy"`,
  password: `Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.`,
  website: `Website should be a valid host name (http://domain.com or subdomain.domain.com)`,
};
