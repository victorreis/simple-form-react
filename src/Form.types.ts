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
export type FormData = Record<FormDataKey, string>;

export interface RegistrationProps {
  onSuccess: (values: FormData) => void;
}
