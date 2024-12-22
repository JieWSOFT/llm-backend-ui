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

export { getTableApi };
