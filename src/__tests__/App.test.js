import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";

describe("Toppings checkbox behavior", () => {
  test("checkbox is initially unchecked", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    expect(checkbox).not.toBeChecked();
  });

  test("checkbox becomes checked when clicked", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("checkbox toggles back to unchecked on second click", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});

describe("Pizza size dropdown", () => {
  test("dropdown initially displays 'Small'", () => {
    render(<App />);
    const dropdown = screen.getByLabelText(/select size/i);
    expect(dropdown).toHaveDisplayValue("Small");
  });

  test("dropdown displays selected option", () => {
    render(<App />);
    const dropdown = screen.getByLabelText(/select size/i);
    userEvent.selectOptions(dropdown, "medium");
    expect(dropdown).toHaveDisplayValue("Medium");
    userEvent.selectOptions(dropdown, "large");
    expect(dropdown).toHaveDisplayValue("Large");
  });
});

describe("'Your selection' display", () => {
  test("initially shows 'small cheese'", () => {
    render(<App />);
    expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
  });

  test("updates to 'small pepperoni' when checkbox is selected", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    userEvent.click(checkbox);
    expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();
  });

  test("updates to 'large pepperoni' when both dropdown and checkbox are used", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    const dropdown = screen.getByLabelText(/select size/i);
    userEvent.click(checkbox);
    userEvent.selectOptions(dropdown, "large");
    expect(screen.getByText(/large pepperoni/i)).toBeInTheDocument();
  });
});

describe("Contact info field", () => {
  test("input has placeholder 'email address'", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/email address/i);
    expect(input).toBeInTheDocument();
  });

  test("input updates as user types", () => {
    render(<App />);
    const input = screen.getByLabelText(/enter your email address/i);
    userEvent.type(input, "pizzafan@email.com");
    expect(input).toHaveValue("pizzafan@email.com");
  });
});

describe("Form submission", () => {
  test("renders 'Submit Order' button", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /submit order/i });
    expect(button).toBeInTheDocument();
  });

  test("shows thank you message after submitting", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /submit order/i });
    userEvent.click(button);
    expect(screen.getByText(/thanks for your order!/i)).toBeInTheDocument();
  });
});

