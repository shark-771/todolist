<template>
  <div class="list">
    <Item v-for="todo in todos" :key="todo.id" :todo="todo"/>
  </div>
</template>

<script lang="ts" setup>
import Item from './Item.vue';

defineProps<{ todos: TodoType.Todo[] }>();
</script>

<style scoped>
.list {
  width: 100%;
  max-height: 512px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
}

/*滚动条整体尺寸*/
.list::-webkit-scrollbar {
  width: 10px;
  height: 1px;
}

/*滚动条*/
.list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background: lightgray;
}

/*滚动轨道*/
.list::-webkit-scrollbar-track {
  border-radius: 5px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
}
</style>