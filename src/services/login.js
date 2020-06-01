import request from '@/utils/request';
const {fromRequest, ajaxRequest} = request;

export async function fakeAccountLogin(params) {
  return ajaxRequest('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return ajaxRequest(`/api/login/captcha?mobile=${mobile}`);
}
