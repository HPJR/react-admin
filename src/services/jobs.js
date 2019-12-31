import request from '@/utils/request';
//获取岗位列表
export async function getJobsList(params) {
  return request('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
//删除岗位列表
export async function delJobsList(params) {
  return request('/api/jobs/del', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
