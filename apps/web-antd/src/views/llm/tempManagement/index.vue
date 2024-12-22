<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';
import { formatDateTime } from '@vben/utils';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { getTableApi } from './api';

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: 'ID', field: 'id', width: 150 },
    { title: '类型', field: 'type' },
    { field: 'template', title: '模板' },
    {
      field: 'createTime',
      title: '创建时间',
      formatter: ({ cellValue }) =>
        cellValue ? formatDateTime(cellValue) : '',
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  proxyConfig: {
    response: {
      result: 'list',
    },
    ajax: {
      query: async ({ page }) => {
        const data = await getTableApi({
          page: page.currentPage,
          pageSize: page.pageSize,
        });
        return data;
      },
    },
    sort: true,
  },
  sortConfig: {
    defaultSort: { field: 'category', order: 'desc' },
    remote: true,
  },
  toolbarConfig: {
    custom: true,
    export: true,
    // import: true,
    refresh: { code: 'query' },
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="数据列表" table-title-help="提示">
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="() => gridApi.query()">
          刷新当前页面
        </Button>
        <Button type="primary" @click="() => gridApi.reload()"> 新增 </Button>
      </template>
    </Grid>
  </Page>
</template>
