const axios = require('axios');

function getData(){
    return axios.get('https://api.github.com/users/varnitgoyal');
}


module.exports={
    getData
};