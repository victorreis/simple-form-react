import * as React from "react";
import { Form, Input, Button } from "antd";
import { RegistrationProps, FormDataKey, FormData } from "./Form.types";
import { ChangeEvent } from "react";

export const RegistrationForm: React.FC<RegistrationProps> = ({
  onSuccess,
}) => {
  const [values, setValues] = React.useState<FormData>({
    name: "",
    email: "",
    password: "",
    website: "",
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onSubmit = () => {
    onSuccess(values);
  };

  const updateField = (field: FormDataKey) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [field]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      <Form {...layout} name="form-messages" colon={false} onFinish={onSubmit}>
        <Form.Item data-testid="name" name="name" label="Name">
          <Input onChange={updateField("name")} />
        </Form.Item>
        <Form.Item data-testid="email" name="email" label="Email">
          <Input onChange={updateField("email")} />
        </Form.Item>
        <Form.Item data-testid="website" name="website" label="Website">
          <Input onChange={updateField("website")} />
        </Form.Item>
        <Form.Item data-testid="password" label="Password" name="password">
          <Input.Password
            onChange={updateField("password")}
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
