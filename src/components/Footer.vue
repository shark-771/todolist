<template>
  <div class="footer">
    <label>
      <input type="checkbox" v-model="choose">
      <span>完成 {{ count }} / 总计 {{ todos.length }}</span>
    </label>
    <button @click="emits('clean')">清除已完成</button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

/** 接收父组件传值 */
const props = defineProps<{ todos: TodoType.Todo[] }>();
/** 事件方法 */
const emits = defineEmits(['clean']);
/** 总计 */
const count = computed(() => {
  let size = 0;
  // count
  props.todos.forEach((todo) => {
    if (todo.selected) size++;
  });
  return size;
});
/** checkbox value */
const choose = computed({
  // getter
  get() {
    return count.value === props.todos.length
  },
  // setter
  set(value) {
      /** 全选 or 全不选 */
      props.todos.forEach((todo) => todo.selected = value)
  }
})

</script>

<style scoped>
.footer {
  width: calc(768px - 16px);
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 8px;
  border-top: 5px solid #f7f7f7;
}

.footer label input {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.footer label span {
  font-size: 16px;
  margin-left: 4px;
  vertical-align: middle;
}

.footer button {
}
</style>