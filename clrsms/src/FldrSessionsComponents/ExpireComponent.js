import { clearLocalStorageItem } from "../FldrLocalStorage/ClsLocalStorage";

export const ExpireComponentToken=()=> {
  const varuserSession = JSON.parse(sessionStorage.getItem("UserSession"));
  if(varuserSession!==null){
    varuserSession.expiryTimeStamp = new Date(
        new Date().getTime() + varuserSession.expiresIn * 1000
      );
      if (varuserSession !== null && new Date() < varuserSession.expiryTimeStamp) {
        return varuserSession.token;
      }
      else if(new Date() > varuserSession.expiryTimeStamp){
        clearLocalStorageItem('UserSession');
      }
  }else{
    return null;
  }
}

export const isUserAuthorizedAdmin = () => {
    const varuserSession = JSON.parse(sessionStorage.getItem("UserSession")); 
    const hasRequiredRole = varuserSession.groupCode === '01';

    return hasRequiredRole;
  };