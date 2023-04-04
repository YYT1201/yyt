export function setToken(token){
    sessionStorage.setItem("token",token)
}

export function getToken(){
    return sessionStorage.getItem("token")
}

export function removeToken(){
     sessionStorage.clear()
}
//储存role值
export function setRole(role){
    sessionStorage.setItem("role",role)
}
export function getrole(){
    return sessionStorage.getItem("role")
}