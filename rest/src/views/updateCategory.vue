<script>
import axios from "axios";
export default {
  data() {
    return {
      title: null,
      id:this.$route.params['id']
    };
  },
  mounted() {
    axios.get("http://localhost:3000/category/"+this.id).then((res) => {
      this.title = res.data.title
    });
  },
  methods: {
    onSubmit() {
      axios
        .patch("http://localhost:3000/category/"+this.id, {
          title: this.title,
        })
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
        value="Изменить категорию"
        class="btn btn-primary"
      />
    </form>
  </div>
</template>


