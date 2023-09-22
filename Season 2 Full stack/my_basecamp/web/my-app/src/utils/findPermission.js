export const findPermission = (permissions, permission) =>{
    const find = permissions.find(item => item === permission)
    if(find){
        return true;
    }
    else{
        return false;
    }
}