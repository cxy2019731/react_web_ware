import './init';
import { render } from 'react-dom';
import Router from './router/index';
import '@/styles/index.less';
import '@/styles/default.css';

render(<Router />, document.getElementById('root'));
