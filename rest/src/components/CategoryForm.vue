<script>
export default {
    props:{
        title:String,
    }
}
</script>

<template>
    <div class="container-fluid">
    <form @submit="onSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Название</label>
        <input
          type="text"
          class="form-control"
          id="titleInput"
          v-model="title"
        />
      </div>
      <input
        type="submit"
        v-on:submit="onSubmit"
        value="Создать категорию"
        class="btn btn-primary"
      />
    </form>
  </div>
</template>