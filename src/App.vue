<template>
  <div class="container">
    <Header :length="32" @create="append"/>
    <List :todos="todos"/>
    <Footer :todos="todos" @clean="clean"/>
  </div>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import List from './components/List.vue';
import { onMounted, provide, ref, watch } from 'vue';
import storage from './util/storage';

/** todos data */
const todos = ref<TodoType.Todo[]>([]);
/** 新建待办 */
const append = (todo: TodoType.Todo) => {
  todos.value.push(todo);
};
/** 删除待办 */
const remove = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};
/** 清除已完成待办 */
const clean = () => {
  todos.value = todos.value.filter((todo) => !todo.selected);
};
/** 获取存储数据 */
onMounted(() => {
  todos.value = storage.getItem();
});
/** 监听清单，同步持久化清单 */
watch(() => todos.value, () => storage.setItem(todos.value), { deep: true });
/**
 * @param {string} k
 * @param {Function} v
 *
 * 方法穿透 */
provide('remove', remove);

</script>

<style scoped>
.container {
  width: 768px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 0 21px rgba(0, 0, 0, 0.07);
}
</style>