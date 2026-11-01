// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// React Router 7 usa TextEncoder/TextDecoder, que el entorno de pruebas
// de Create React App (jsdom) no trae. Se toman los de Node.
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// jsdom no implementa window.scrollTo (lo usa ScrollToTop en cada cambio de ruta)
window.scrollTo = jest.fn();
