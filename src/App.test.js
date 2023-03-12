import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import axios from 'axios';

import MockAdapter from 'axios-mock-adapter';



describe('Unit tests', () => {
  let mock;
  beforeEach(() =>  {
    mock = new MockAdapter(axios);
    mock.onGet().reply(500, 'Internal Server Error');
  });

  afterEach(() => {
    mock.reset();
  })

  it("renders the submit button", () => {
    render(<App />);
    const linkElement = screen.getByText("Create User");
    expect(linkElement).toBeInTheDocument();
  });
  

  describe('http requests work', () => {
    jest.mock('axios');
    it('sets occuption and state to response',() => {
      axios.get.({ 
        occupations: ['Mock occuptation'],
        states: ['Sample State']
      });

      render(<App/>);
    });

  });

});
