/// <reference types="jest" />

import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Customers from "./Customers";

describe("Customers", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders all customers by default", () => {
    render(<Customers />);

    expect(screen.getByText("Aarav Sharma")).toBeInTheDocument();
    expect(screen.getByText("Mia Johnson")).toBeInTheDocument();
    expect(screen.getByText("Emma Davis")).toBeInTheDocument();
  });

  it("filters customers after the debounce interval", () => {
    render(<Customers />);
    const searchInput = screen.getByLabelText("Search customers");

    fireEvent.change(searchInput, { target: { value: "Mia" } });
    expect(screen.getByText("Aarav Sharma")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(screen.getByText("Aarav Sharma")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.getByText("Mia Johnson")).toBeInTheDocument();
    expect(screen.queryByText("Aarav Sharma")).not.toBeInTheDocument();
  });

  it("filters customers by status", () => {
    render(<Customers />);
    fireEvent.mouseDown(screen.getByRole("combobox", { name: "Filter" }));
    fireEvent.click(screen.getByRole("option", { name: "Pending" }));

    expect(screen.getByText("Rohan Patel")).toBeInTheDocument();
    expect(screen.getByText("Daniel Brown")).toBeInTheDocument();
    expect(screen.queryByText("Aarav Sharma")).not.toBeInTheDocument();
  });

  it("shows an empty state when no customer matches", () => {
    render(<Customers />);
    fireEvent.change(screen.getByLabelText("Search customers"), {
      target: { value: "not-a-customer" },
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.getByText("No customers match your search.")).toBeInTheDocument();
  });
});
