import React, { ChangeEvent, useContext } from "react";
import { Form, Input, Button } from "antd";

import { FieldValidation, VALIDATIONS } from "./Configs/Validation.config";
import { FormContext } from "./Form.context";
import {
  RegistrationProps,
  FormDataKey,
  FormValues,
  FormDataValue,
} from "./Form.types";

export const RegistrationForm: React.FC<RegistrationProps> = ({
  onSuccess,
}) => {
  const { fieldsData, updateFieldsData } = useContext(FormContext);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const isFieldValid = (field: FormDataKey, value: string) => {
    const errorMessages: string[] = [];
    let isValid = false;

    isValid = (VALIDATIONS[field] as FieldValidation[]).every((field) => {
      const valid = field.regex.test(value);
      if (!valid) errorMessages.push(field.errorMessage);
      return valid;
    });

    return { isValid, errorMessages };
  };

  const updateField =
    (field: FormDataKey) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const { isValid, errorMessages } = isFieldValid(field, value);
      const help = errorMessages.join("");

      updateFieldsData((prevState) => ({
        ...prevState,
        [field]: {
          value,
          validateStatus: isValid ? "success" : "error",
          help,
        },
      }));
    };

  const validateFieldsUpdateStatusAndShowErrors = () => {
    updateFieldsData((prevState) => ({
      ...prevState,
      ...Object.fromEntries(
        Object.entries(prevState).map(([fieldKey, fieldValue]) => {
          const { isValid, errorMessages } = isFieldValid(
            fieldKey as FormDataKey,
            fieldValue.value
          );
          const updatedFieldValue: FormDataValue = {
            ...fieldValue,
            help: errorMessages.join(""),
            validateStatus: isValid ? "success" : "error",
          };

          return [fieldKey, updatedFieldValue];
        })
      ),
    }));
  };

  const areAllFieldsValid = () => {
    return Object.entries(fieldsData).every(
      ([fieldKey, fieldValue]) =>
        isFieldValid(fieldKey as FormDataKey, fieldValue.value).isValid
    );
  };

  const onSubmit = () => {
    if (areAllFieldsValid()) {
      const fieldValuesObject = Object.fromEntries(
        Object.entries(fieldsData).map(([key, value]) => [key, value.value])
      ) as FormValues;

      onSuccess(fieldValuesObject);
      return;
    }

    validateFieldsUpdateStatusAndShowErrors();
  };

  return (
    <div className="form-container">
      <Form {...layout} name="form-messages" colon={false} onFinish={onSubmit}>
        <Form.Item
          data-testid="name"
          name="name"
          label="Name"
          required
          {...fieldsData.name}
        >
          <Input onChange={updateField("name")} value={fieldsData.name.value} />
        </Form.Item>
        <Form.Item
          data-testid="email"
          name="email"
          label="Email"
          required
          {...fieldsData.email}
        >
          <Input
            onChange={updateField("email")}
            value={fieldsData.email.value}
          />
        </Form.Item>
        <Form.Item
          data-testid="website"
          name="website"
          label="Website"
          required
          {...fieldsData.website}
        >
          <Input
            onChange={updateField("website")}
            value={fieldsData.website.value}
          />
        </Form.Item>
        <Form.Item
          data-testid="password"
          label="Password"
          name="password"
          required
          {...fieldsData.password}
        >
          <Input.Password
            onChange={updateField("password")}
            value={fieldsData.password.value}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
