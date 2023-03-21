import * as React from "react";
import { Form, Input, Button } from "antd";
import {
  RegistrationProps,
  FormDataKey,
  FormData,
  FormValues,
} from "./Form.types";
import { ChangeEvent } from "react";
import { VALIDATION_ERROR } from "./Configs/ErrorMessages.config";

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
    website: { value: "", validateStatus: "success", help: "" },
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onSubmit = () => {
    onSuccess(
      Object.fromEntries(
        Object.entries(fieldData).map(([key, value]) => [key, value.value])
      ) as FormValues
    );
  };

  const updateField =
    (field: FormDataKey) => (e: ChangeEvent<HTMLInputElement>) => {
      setFieldData((prevState) => ({
        ...prevState,
        [field]: {
          value: e.target.value,
          validateStatus: "success",
          help: "",
        },
      }));
    };

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
          {...fieldData.name}
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
