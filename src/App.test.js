import { render, screen } from '@testing-library/react';
import App from './App';

import axios, { AxiosRequestConfig } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
const axiosMockInstance = axios.create();
export const axiosMockAdapterInstance= new AxiosMockAdapter(axiosMockInstance, { delayResponse: 0 });

mock
   .onGet('')
   .reply(() => {
    return {
     id: '5e8891ab188cd28',
     avatar: '/static/mock-images/avatars/jane.png',
     bio: 'Product Designer',
     email: 'jane@test.com',
     name: 'Jane'
    };
});

test('renders learn react link', () => {
  render(<App />);
  
});
