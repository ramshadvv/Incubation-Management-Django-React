

function CheckLogin() {
    if (localStorage.getItem('authToken') === null){
      return false
    }
    return true
}

export default CheckLogin;
