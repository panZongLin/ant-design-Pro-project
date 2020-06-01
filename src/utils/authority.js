import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.

//获取 登录存储localStorage
export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('userType') : str; // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  } // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }

  return authority;
}

//设置 登录存储localStorage
export function setAuthority(authority) {
  const token = typeof authority.token === 'string' ? authority.token : '';
  const userType = typeof authority.currentAuthority === 'string' ? authority.currentAuthority : '';
  localStorage.setItem('token', JSON.stringify(token)); // auto reload
  localStorage.setItem('userType', JSON.stringify(userType)); // auto reload

  reloadAuthorized();
}