const axios = require('axios');

const testAxios = (baseURL, url) => {
    const config = { baseURL, url };
    // Axios uses a private helper to combine urls.
    // We can just use axios.getUri or look at how it builds the request.
    const fullUrl = axios.getUri(config);
    console.log(`baseURL: "${baseURL}", url: "${url}" -> Result: ${fullUrl}`);
};

testAxios('http://localhost:5000/api', '/device');
testAxios('http://localhost:5000/api/', '/device');
testAxios('http://localhost:5000', '/api/device');
testAxios('http://localhost:5000/', '/api/device');
