import * as React from "react";
import "antd/dist/antd.css";

import { FormProvider } from "./Form.context";
import { RegistrationForm } from "./Form";

import "./styles.css";

export default function App() {
  return (
    <div className="form-container">
      <FormProvider>
        <RegistrationForm onSuccess={(values) => console.log(values)} />
      </FormProvider>
    </div>
  );
}
