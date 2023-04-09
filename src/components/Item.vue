<template>
  <div class="item">
    <label>
      <input type="checkbox" v-model="todo.selected">
      <span :class=" todo.selected ? 'select' : 'default' ">
        {{ todo.title }}
      </span>
    </label>
    <button :disabled="!todo.selected" @click="remove(todo.id)">删除</button>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

defineProps<{ todo: TodoType.Todo }>();
/** 注入 */
const remove = inject('remove', Function, true);

</script>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  margin: 8px 16px;
}

.item label input {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.item label span {
  font-size: 16px;
  margin-left: 4px;
  vertical-align: middle;
}

.default {
  color: black;
  text-decoration: none;
}

.select {
  color: gray;
  text-decoration: line-through;
}
</style>