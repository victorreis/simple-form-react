import React, { createContext, FC, useMemo, useState } from "react";
import { FormData } from "./Form.types";

export const initialValueFormContext: FormData = {
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
};

type UpdateFieldsDataReducer = (newFieldsData: FormData) => FormData;

interface FormContextStructure {
  fieldsData: FormData;
  updateFieldsData: (reducer: UpdateFieldsDataReducer) => void;
}

export const FormContext = createContext<FormContextStructure>({
  fieldsData: initialValueFormContext,
  updateFieldsData: () => {},
});

export const FormProvider: FC = ({ children }): JSX.Element => {
  const [fieldsData, setFieldsData] = useState<FormData>(
    initialValueFormContext
  );

  const updateFieldsData = (reducer: UpdateFieldsDataReducer) => {
    setFieldsData(reducer);
  };

  const providerValue = useMemo(
    () => ({ fieldsData, updateFieldsData }),
    [fieldsData]
  );

  return (
    <FormContext.Provider value={providerValue}>
      {children}
    </FormContext.Provider>
  );
};
