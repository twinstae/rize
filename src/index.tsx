import { createRoot } from 'react-dom/client';
import App from '@App/index';
import invariant from './invariant';

const rootElement = document.getElementById('root');
invariant(rootElement);
const root = createRoot(rootElement);

root.render(App);
