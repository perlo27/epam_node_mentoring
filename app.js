import config from './conifg/conifg';
import {User, Product} from './modules';

console.log('config: ', config.name);

const user = new User();
const product = new Product();