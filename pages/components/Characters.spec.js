import { render, screen } from "../common/test/test-utils";
import Characters from "./Characters";

describe("Characters", () => {
  let characterProps;

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
  });

  test("should render character image, name, and origin and location name", () => {
    render(<Characters characters={characterProps} />);

    characterProps.forEach((props) => {
      const name = screen.getByText(props.name);
      const image = screen.getByAltText(props.name);
      const originName = screen.getByText("Origin: " + props.origin.name);
      const locationName = screen.getByText("Location: " + props.location.name);

      expect(name).toBeVisible();
      expect(image).toBeVisible();
      expect(originName).toBeVisible();
      expect(locationName).toBeVisible();
    });
  });
});
