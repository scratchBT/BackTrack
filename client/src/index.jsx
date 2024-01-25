import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/app/App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                {/* <h1>Test</h1> */}
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);