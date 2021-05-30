import { render, screen } from "../test-utils";
import Home from "../../../index";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/dom";
import { act } from "react-dom/test-utils";

jest.mock("axios");

describe("Home Page", () => {
  let characterProps, searchValue, errorSearchValue, expectedSubmit;

  beforeEach(() => {
    characterProps = [
      {
        id: 1,
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        name: "Rick Sanchez",
        origin: {
          name: "Earth (C-137)",
        },
        location: {
          name: "Earth (Replacement Dimension)",
        },
      },
    ];
    searchValue = "rick";
    errorSearchValue = "This is a test for a search request failure";
  });

  test("should clear input on reset button click", () => {
    render(<Home characters={characterProps} />);
    const search = screen.getByPlaceholderText("Search");
    userEvent.type(search, searchValue);
    expect(search).toHaveValue(searchValue);

    const reset = screen.getByRole("button", { name: /Reset input field/i });
    userEvent.click(reset);
    expect(search).not.toHaveValue();
  });

  test("should request data and display a toast if no search results found", async () => {
    render(<Home characters={characterProps} />);
    const search = screen.getByPlaceholderText("Search");
    userEvent.type(search, errorSearchValue);
    expect(search).toHaveValue(errorSearchValue);

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: { characters: null, error: "No character found" },
      })
    );

    const form = screen.getByTestId("search-box");
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(axios.post).toHaveBeenCalled();

    const errorToast = screen.getByText("An error occured");
    const errorMessage = screen.getByText("No character found");

    await waitFor(() => {
      expect(errorToast).toBeVisible();
      expect(errorMessage).toBeVisible();
    });
  });
});
