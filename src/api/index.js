import axios from 'axios';

export default axios.create({
    baseURL: 'http://178.128.56.76:3003/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});