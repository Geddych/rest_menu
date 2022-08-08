<script>
import axios from "axios";
export default {
  data() {
    return {
      categories:[],
      title: null,
      composition: null,
      price: 0,
      category: null,
      file: null,
      id:this.$route.params['id']
    };
  },
  mounted() {
    axios.get("http://localhost:3000/position/"+this.id).then((res) => {
      this.title = res.data.title
      this.composition = res.data.composition
      this.price = res.data.price
      this.category = res.data.categoryId

    });
    axios.get("http://localhost:3000").then((res) => {
      this.categories = res.data;
    });
  },
  methods: {
    onSubmit() {
      let fd = new FormData();
      fd.set("title", this.title);
      fd.set("composition", this.composition);
      fd.set("price", this.price);
      fd.set("categoryId", this.category);
      fd.set("photo", this.file);
      axios({
        method: "patch",
        url: "http://localhost:3000/position/"+this.id,
        headers: { "Content-type": "multipart/form-data" },
        data: fd,
      });
      
      this.$router.push("/");
    },
    handleUploadFile() {
      this.file = this.$refs.file.files[0];
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
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Описание</label>
        <input
          type="text"
          class="form-control"
          id="compositionInput"
          v-model="composition"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Цена</label>
        <input
          type="number"
          class="form-control"
          id="priceInput"
          v-model="price"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Категория</label>
        <select
          class="form-select"
          aria-label="Категория"
          v-model.number="category"
        >
          <option selected>Выбрать категорию</option>
          <option :value="cat.id" v-for="cat in categories" :key="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Изображение</label
          >
          <input
            type="file"
            ref="file"
            class="form-control"
            id="fileInput"
            v-on:change="handleUploadFile()"
          />
        </div>
      </div>
      <input
        type="submit"
        v-on:submit="onSubmit"
        value="Создать"
        class="btn btn-primary"
      />
    </form>
  </div>
</template>


