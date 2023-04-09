<template>
  <div class="header">
    <input type="text" placeholder="输入任务, 回车确认..."
           :maxlength="props.length" v-model="title" @keyup.enter="append">
    <span ref="span">
      {{ title.length }}/{{ props.length }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

/** 接收父组件传值 */
const props = defineProps<{ length: number }>();
/** 事件方法 */
const emits = defineEmits(['create']);
/** 创建待办名称 */
const title = ref<string>('');
/** span dom */
const span = ref();
/** 监听 title 长度，个性化样式 */
watch(title, (value) => {
  if (value.length === props.length) {
    span.value.style.color = 'lightcoral';
  } else {
    span.value.style.color = 'gray';
  }
});
/** 添加新待办 */
const append = () => {
  if (title.value === '') return;
  // 创建一个 todo 实例
  let todo: TodoType.Todo = {
    id: Date.now(),
    title: title.value,
    selected: false
  };
  // 与父组件通信
  emits('create', todo);
  // 清空输入框
  title.value = '';
};
</script>

<style scoped>
.header {
  width: 768px;
  height: 64px;
  line-height: 48px;
  position: relative;
  padding: 8px;
}

.header input {
  width: 100%;
  height: 100%;
  font-size: 16px;
  text-indent: 20px;
}

.header span {
  color: gray;
  position: absolute;
  right: 24px;
}
</style>