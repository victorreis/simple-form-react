import * as React from "react"
import { Form, Input, Button } from "antd";

/**
 * Use this type to represent the validation status for each field
 * @param {string} validateStatus - self-explanatory, represent either an error or success state
 * @param {string} help - message shown below the field in case of a validation error
 */
type ValidationResult = {
  validateStatus: "error" | "success";
  help: string;
}

type FormDataKey = "name" | "email" | "password" | "website";
type FormData = Record<FormDataKey, string>;

export const RegistrationForm: React.FC<{
  onSuccess: (values: FormData) => void;
}> = ({ onSuccess }) => {
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

  const updateField = (field: FormDataKey, val: string) => {
    setValues({
      ...values,
      [field]: val,
    });
  };

  return (
    <div className="form-container">
      <Form {...layout} name="form-messages" colon={false} onFinish={onSubmit}>
        <Form.Item data-testid="name" name="name" label="Name">
          <Input onChange={(ev) => updateField("name", ev.target.value)} />
        </Form.Item>
        <Form.Item data-testid="email" name="email" label="Email">
          <Input onChange={(ev) => updateField("email", ev.target.value)} />
        </Form.Item>
        <Form.Item data-testid="website" name="website" label="Website">
          <Input onChange={(ev) => updateField("website", ev.target.value)} />
        </Form.Item>
        <Form.Item data-testid="password" label="Password" name="password">
          <Input.Password
            onChange={(ev) => updateField("password", ev.target.value)}
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
