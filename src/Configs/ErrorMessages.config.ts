export const REQUIRED_ERROR = (fieldName: string) => `${fieldName} is required`;
export const VALIDATION_ERROR = {
  name: `enter a valid name`,
  email: `enter a valid email address`,
  password: {
    minCharacters: "password must have at least 8 characters",
    uppercase: "password must have at least 1 uppercase letter",
    lowercase: "password must have at least 1 lowercase letter",
    number: "password must have at least 1 number",
  },
  website: `enter a valid website`,
};
