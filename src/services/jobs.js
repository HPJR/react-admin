import request from '@/utils/request';
//获取岗位列表
export async function getJobsList() {
  return request('/api/jobs');
}
