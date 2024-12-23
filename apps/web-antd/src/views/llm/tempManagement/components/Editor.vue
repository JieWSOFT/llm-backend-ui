<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { postAddTemplateApi, postUpdateTemplateApi } from '../api';

const currentdata = ref();
const [Modal, modalApi] = useVbenModal({
  onConfirm: async () => {
    await formApi.validateAndSubmitForm();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const data = modalApi.getData<Record<string, any>>();
      currentdata.value = data;
      if (data) {
        formApi.setValues(data);
      }
    }
  },
});

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入类型',
      },
      fieldName: 'type',
      label: '类型',
      rules: 'required',
    },
    {
      component: 'Textarea',
      componentProps: {
        autoSize: {
          minRows: 8,
          maxRows: 8,
        },
        placeholder: '请输入模板',
      },
      fieldName: 'template',
      label: '模板',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
});

async function onSubmit(values: Record<string, any>) {
  await (currentdata.value
    ? postUpdateTemplateApi({ ...values, id: currentdata.value?.id })
    : postAddTemplateApi({ ...values }));
  modalApi.close();
}
</script>
<template>
  <Modal :title="currentdata ? '编辑' : '新增'">
    <Form />
  </Modal>
</template>
