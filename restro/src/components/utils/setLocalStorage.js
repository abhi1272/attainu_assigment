
function set(token){
    localStorage.setItem('token', token);
}

function get(){
    return localStorage.getItem('token');
}

function clear(){
    localStorage.removeItem('token');
}

module.exports  = {
    set,
    get,
    clear
}