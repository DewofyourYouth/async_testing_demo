import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({"greeting": "Hello"})
}))



describe("App", () => {
  it("loads a greeting message", async () => {
    // render(<App />)
   await act(async () => render(<App />));
   expect(screen.getByText(/Hi There!/i)).toBeInTheDocument()
  })
})