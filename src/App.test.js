import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';



describe("App",  () => {
  it("loads a greeting message", async () => {
   await act(async () => render(<App />));
   expect(screen.getByText(/Hi There!/i)).toBeInTheDocument()
  })
})