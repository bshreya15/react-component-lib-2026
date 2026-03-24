import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from ".";


describe("Page component", () => {
  it("renders the title and children correctly", () => {
    // Arrange
    const title = "Test Page";
    const childText = "This is a child element";

    // Act
    render(
      <Page title={title}>
        <p>{childText}</p>
      </Page>
    );

    // Assert
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

 it("renders the correct styling", () => {
    // Arrange
    const title = "Test Title";
    const children = "Test Children";
    const { getByTestId } = render(<Page title={title}>{children}</Page>);

    // Act
    const container = getByTestId("page-container");

    // Assert
    expect(container).toHaveStyle(`
    background-color: #f5f5f5;
    `);
  });
});