import * as React from "react";
import { Form, Input, Button } from "antd";
import {
  RegistrationProps,
  FormDataKey,
  FormData,
  FormValues,
} from "./Form.types";
import { ChangeEvent, useEffect } from "react";
import { FieldValidation, VALIDATIONS } from "./Configs/Validation.config";

export const RegistrationForm: React.FC<RegistrationProps> = ({
  onSuccess,
}) => {
  const [fieldData, setFieldData] = React.useState<FormData>({
    name: {
      value: "",
      validateStatus: "success",
      help: "",
    },
    email: {
      value: "",
      validateStatus: "success",
      help: "",
    },
    password: {
      value: "",
      validateStatus: "success",
      help: "",
    },
    website: {
      value: "",
      validateStatus: "success",
      help: "",
    },
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const showIsRequiredErrorMessage = () => {
    setFieldData((prevState) => ({
      ...prevState,
      ...Object.fromEntries(
        Object.entries(prevState).map(([fieldKey, fieldData]) => {
          const help =
            fieldData.value.length === 0
              ? `${fieldKey} is required`
              : fieldData.help;
          const updatedFieldData = {
            ...fieldData,
            help,
            validateStatus: help ? "error" : "sucess",
          };

          return [fieldKey, updatedFieldData];
        })
      ),
    }));
  };

  const areAllFieldsValid = () => {
    return Object.entries(fieldData).every(
      ([_, value]) => value.validateStatus === "success"
    );
  };

  const onSubmit = () => {
    if (areAllFieldsValid()) {
      const fieldValuesObject = Object.fromEntries(
        Object.entries(fieldData).map(([key, value]) => [key, value.value])
      ) as FormValues;

      onSuccess(fieldValuesObject);
      return;
    }

    showIsRequiredErrorMessage();
  };

  const isFieldValid = (field: FormDataKey, value: string) => {
    const errorMessages: string[] = [];
    let isValid = false;

    if (Array.isArray(VALIDATIONS[field])) {
      isValid = (VALIDATIONS[field] as FieldValidation[]).every((field) => {
        const valid = field.regex.test(value);
        if (!valid) errorMessages.push(field.errorMessage);
        return valid;
      });
    } else {
      const { regex, errorMessage } = VALIDATIONS[field] as FieldValidation;
      isValid = regex.test(value);
      if (!isValid) errorMessages.push(errorMessage);
    }
    return { isValid, errorMessages };
  };

  const updateField =
    (field: FormDataKey) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const { isValid, errorMessages } = isFieldValid(field, value);
      const help = errorMessages.join("");

      setFieldData((prevState) => ({
        ...prevState,
        [field]: {
          value,
          validateStatus: isValid ? "success" : "error",
          help,
        },
      }));
    };

  useEffect(() => {
    showIsRequiredErrorMessage();
  }, []);

  return (
    <div className="form-container">
      <Form {...layout} name="form-messages" colon={false} onFinish={onSubmit}>
        <Form.Item
          data-testid="name"
          name="name"
          label="Name"
          required
          {...fieldData.name}
        >
          <Input onChange={updateField("name")} value={fieldData.name.value} />
        </Form.Item>
        <Form.Item
          data-testid="email"
          name="email"
          label="Email"
          required
          {...fieldData.email}
        >
          <Input
            onChange={updateField("email")}
            value={fieldData.email.value}
          />
        </Form.Item>
        <Form.Item
          data-testid="website"
          name="website"
          label="Website"
          required
          {...fieldData.website}
        >
          <Input
            onChange={updateField("website")}
            value={fieldData.website.value}
          />
        </Form.Item>
        <Form.Item
          data-testid="password"
          label="Password"
          name="password"
          required
          {...fieldData.password}
        >
          <Input.Password
            onChange={updateField("password")}
            value={fieldData.password.value}
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
