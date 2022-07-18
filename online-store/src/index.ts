import App from './components/app/app';
import { printSelfcheck } from './components/selfCheck';
import './styles/style.scss';

const app = new App();
app.start();
printSelfcheck();
