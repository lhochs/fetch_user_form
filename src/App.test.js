import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import axios from 'axios';




describe('Unit tests', () => {
  it("renders the submit button", () => {
    render(<App />);
    const linkElement = screen.getByText("Create User");
    expect(linkElement).toBeInTheDocument();
  });
  

  describe('http requests work', () => {
    jest.mock('axios');
    it('sets occuption and state to response',() => {
      axios.get.mockResolvedValue({ 
        occupations: ['Mock occuptation'],
        states: ['Sample State']
      });

      render(<App/>);
    });

  });

});
