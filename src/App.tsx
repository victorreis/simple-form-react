import * as React from "react"
import "./styles.css";
import "antd/dist/antd.css";

import { RegistrationForm } from "./Form";

export default function App() {
  return (
    <div className="form-container">
      <RegistrationForm onSuccess={(values) => console.log(values)} />
    </div>
  );
}
