import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom";

const ChakraRenderer = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

const customRender = (ui, options) =>
  render(ui, {
    wrapper: ChakraRenderer,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
