import * as React from "react";
import {
  render,
  fireEvent,
  cleanup,
  within,
  waitFor,
} from "@testing-library/react";

import { RegistrationForm } from "./Form";

beforeEach(cleanup);

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("RegistrationForm", () => {
  it("all fields are required", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());

    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);
    fireEvent.click(utils.getByText("Submit"));

    const nameField = utils.getByTestId("name");
    await within(nameField).findByText("name is required");

    const emailField = utils.getByTestId("email");
    await within(emailField).findByText("email is required");

    const passwordField = utils.getByTestId("password");
    await within(passwordField).findByText("password is required");

    const websiteField = utils.getByTestId("website");
    await within(websiteField).findByText("website is required");

    expect(onFinishMock).toHaveBeenCalledTimes(0);
  });

  it("fields are accepted when filled in", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    fireEvent.change(utils.getByLabelText(/name/i), {
      target: { value: "Foo Bar" },
    });
    fireEvent.change(utils.getByLabelText(/email/i), {
      target: { value: "foo@bar.com" },
    });
    fireEvent.change(utils.getByLabelText(/password/i), {
      target: { value: "P@ssw0rd" },
    });
    fireEvent.change(utils.getByLabelText(/website/i), {
      target: { value: "http://foo.bar" },
    });

    fireEvent.click(utils.getByText("Submit"));

    await waitFor(() => {
      const nameField = utils.getByTestId("name");
      expect(within(nameField).queryByText("name is required")).toBeNull();

      const emailField = utils.getByTestId("email");
      expect(within(emailField).queryByText("email is required")).toBeNull();

      const passwordField = utils.getByTestId("password");
      expect(
        within(passwordField).queryByText("password is required")
      ).toBeNull();

      const websiteField = utils.getByTestId("website");
      expect(
        within(websiteField).queryByText("website is required")
      ).toBeNull();

      expect(onFinishMock).toHaveBeenCalledTimes(1);
    });
  });

  it("name is validated correctly", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    fireEvent.change(utils.getByLabelText(/name/i), {
      target: { value: "SingleName" },
    });
    fireEvent.click(utils.getByText("Submit"));
    const emailField = utils.getByTestId("name");
    await within(emailField).findByText("enter a valid name");
    expect(onFinishMock).toHaveBeenCalledTimes(0);
  });

  it("email is validated correctly", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    fireEvent.change(utils.getByLabelText(/email/i), {
      target: { value: "foo" },
    });
    fireEvent.click(utils.getByText("Submit"));
    const emailField = utils.getByTestId("email");
    await within(emailField).findByText("enter a valid email address");
    expect(onFinishMock).toHaveBeenCalledTimes(0);
  });

  it("email with numeric domain should be valid", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    const emailField = utils.getByTestId("email");
    fireEvent.change(utils.getByLabelText(/email/i), {
      target: { value: "foo-bar@123.xy" },
    });
    fireEvent.click(utils.getByText("Submit"));
    await expect(
      within(emailField).findByText("enter a valid email address")
    ).rejects.toThrow();
  });

  it("email with hyphenated domain should be valid", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    const emailField = utils.getByTestId("email");
    fireEvent.change(utils.getByLabelText(/email/i), {
      target: { value: "plus+sign@hyphenated-domain.xy" },
    });
    fireEvent.click(utils.getByText("Submit"));
    await expect(
      within(emailField).findByText("enter a valid email address")
    ).rejects.toThrow();
  });

  it("password have a min lengh of 8 characters", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    fireEvent.change(utils.getByLabelText(/password/i), {
      target: { value: "foo" },
    });
    fireEvent.click(utils.getByText("Submit"));

    const passwordField = utils.getByTestId("password");
    await within(passwordField).findByText(
      /password must have at least 8 characters/i
    );
    expect(onFinishMock).toHaveBeenCalledTimes(0);
  });

  it("password have 1 uppercase letter", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    fireEvent.change(utils.getByLabelText(/password/i), {
      target: { value: "abratesesamo" },
    });
    fireEvent.click(utils.getByText("Submit"));

    const passwordField = utils.getByTestId("password");
    await within(passwordField).findByText(
      /password must have at least 1 uppercase letter/i
    );
    expect(onFinishMock).toHaveBeenCalledTimes(0);
  });

  it("password have 1 lowercase letter", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    fireEvent.change(utils.getByLabelText(/password/i), {
      target: { value: "ABRATESESAMO" },
    });
    fireEvent.click(utils.getByText("Submit"));

    const passwordField = utils.getByTestId("password");
    await within(passwordField).findByText(
      /password must have at least 1 lowercase letter/i
    );
    expect(onFinishMock).toHaveBeenCalledTimes(0);
  });

  it("password have 1 number", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    fireEvent.change(utils.getByLabelText(/password/i), {
      target: { value: "Password" },
    });
    fireEvent.click(utils.getByText("Submit"));

    const passwordField = utils.getByTestId("password");
    await within(passwordField).findByText(
      /password must have at least 1 number/i
    );
    expect(onFinishMock).toHaveBeenCalledTimes(0);
  });

  it("website is validated correctly", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    fireEvent.change(utils.getByLabelText(/website/i), {
      target: { value: "foo" },
    });
    fireEvent.click(utils.getByText("Submit"));

    const websiteField = utils.getByTestId("website");
    await within(websiteField).findByText("enter a valid website");
    expect(onFinishMock).toHaveBeenCalledTimes(0);
  });

  it("website with no http/https is accepted", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    fireEvent.change(utils.getByLabelText(/website/i), {
      target: { value: "subdomain.host.com" },
    });
    fireEvent.click(utils.getByText("Submit"));

    const websiteField = utils.getByTestId("website");
    await expect(
      within(websiteField).findByText("enter a valid website")
    ).rejects.toThrow();
  });

  it("website with port number is accepted", async () => {
    const onFinishMock = jest.fn(() => Promise.resolve());
    const utils = render(<RegistrationForm onSuccess={onFinishMock} />);

    fireEvent.change(utils.getByLabelText(/website/i), {
      target: { value: "https://yet.another.domain.ai:8080" },
    });
    fireEvent.click(utils.getByText("Submit"));

    const websiteField = utils.getByTestId("website");
    await expect(
      within(websiteField).findByText("enter a valid website")
    ).rejects.toThrowError();
  });
});
