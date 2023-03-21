/**
 * Use this type to represent the validation status for each field
 * @param {string} validateStatus - self-explanatory, represent either an error or success state
 * @param {string} help - message shown below the field in case of a validation error
 */
export type ValidationResult = {
  validateStatus: "error" | "success";
  help: string;
};

export type FormDataKey = "name" | "email" | "password" | "website";
export type FormDataValue = {
  value: string;
} & ValidationResult;
export type FormData = Record<FormDataKey, FormDataValue>;
export type FormValues = Record<FormDataKey, string>;

export interface RegistrationProps {
  onSuccess: (values: FormValues) => void;
}
