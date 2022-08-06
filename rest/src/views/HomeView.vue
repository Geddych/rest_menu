<script >
import axios from "axios";
export default {
  data() {
    return {
      categories: [],
      isLoading: true,
      url: "http://localhost:3000/pics/",
      catLink: '/category/'
    };
  },
  mounted() {
    axios.get("http://localhost:3000").then((res) => {
      this.categories = res.data;
    });
    this.isLoading = false;
  },
  
  methods: {
    deletePosition(id) {
      axios({
        method: "delete",
        url: "http://localhost:3000/position/" + id,
      });
      location.reload();
    },
    deleteCategory(id) {
      axios({
        method: "delete",
        url: "http://localhost:3000/category/" + id,
      });
      location.reload();
    },
    moveToLinkCat(id) {
      this.$router.push('/category/'+id)
    },
    moveToLinkPos(id) {
      this.$router.push('/position/'+id)
    }
  },
};
</script>

<template>
  <main class="container">
    <div v-if="isLoading"><div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div></div>
    <div v-else>
      <div v-for="cat in categories" :key="cat.id" >
      <p><div class="dropdown">
  <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    {{cat.title}}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><button class="dropdown-item" v-on:click = moveToLinkCat(cat.id)>Изменить</button></li>
    <li><button class="dropdown-item" v-on:click = "deleteCategory(cat.id)">Удалить</button></li>
  </ul>
</div></p>
      <div v-if="cat.positions != []" class="row align-items-center">
          <div class="col" v-for="pos in cat.positions" :key="pos.id">
          <div class="card" style="width: 18rem">
          <img :src=url+pos.photoPath class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{pos.title}}</h5>
            <p class="card-text">
              <p>Цена: {{pos.price}} р.</p>
              <p>Описание: {{pos.composition}}</p>
            </p>
            <button class="btn btn-primary" v-on:click = moveToLinkPos(pos.id)>Изменить</button>
            <button class="btn btn-danger" v-on:click = "deletePosition(pos.id)">Удалить</button>
          </div>
        </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

