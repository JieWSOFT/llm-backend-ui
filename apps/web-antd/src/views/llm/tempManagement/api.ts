import { requestllmClient } from '#/api/request';

export namespace DemoTableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

/**
 * 获取示例表格数据
 */
async function getTableApi(params: DemoTableApi.PageFetchParams) {
  return requestllmClient.get('/bms/llm/temp/list', { params });
}

async function postAddTemplateApi(data: any) {
  return requestllmClient.post('/bms/llm/temp/create', data);
}

export const postUpdateTemplateApi = (data: any) =>
  requestllmClient.put('/bms/llm/temp/update', data);
export const deleteTemplateApi = (params: any) =>
  requestllmClient.delete('/bms/llm/temp/delete', { params });
export { getTableApi, postAddTemplateApi };
