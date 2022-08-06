<script>
import axios from "axios";
export default {
  data() {
    return {
      title: null,
    };
  },
  methods: {
    onSubmit() {
      let fd = new FormData();
      fd.append("title", this.title);
      console.log(fd.get("title"));
      axios
        .post("http://localhost:3000/category", {
          title: this.title,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
      this.$router.push("/");
    },
  },
};
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


