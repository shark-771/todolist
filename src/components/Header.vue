<template>
  <div class="search">
    <input type="text" placeholder="输入任务, 回车确认..."
           :maxlength="props.length" v-model="title" @keyup.enter="append">
    <span ref="span">
      {{ current }}/{{ props.length }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = defineProps<{ length: number }>();
const emits = defineEmits(['create']);
// item title
const title = ref<string>('');
// 字数
const current = computed(() => {
  return title.value.length;
});
// ref dom
const span = ref();
// 监听
watch(current, (value) => {
  if (value === props.length) {
    span.value.style.color = 'lightcoral';
  } else {
    span.value.style.color = 'gray';
  }
});

// append
const append = () => {
  if (title.value === '') return;
  // new instance
  let todo: TodoType.Todo = {
    id: Date.now(),
    title: title.value,
    selected: false
  };
  // 通信
  emits('create', todo);
  // clean
  title.value = '';
};
</script>

<style scoped>
.search {
  width: 768px;
  height: 64px;
  line-height: 48px;
  position: relative;
  padding: 8px;
}

.search input {
  width: 100%;
  height: 100%;
  font-size: 16px;
  text-indent: 20px;
}

.search span {
  color: gray;
  position: absolute;
  right: 24px;
}
</style>