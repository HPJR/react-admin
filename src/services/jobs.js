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

//新增成功 / 编辑成功
export async function addJobsList(params) {
  return request('/add', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//查询编辑
export async function editJobsList(params) {
  return request('/edit/one', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
