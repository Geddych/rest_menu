<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <h1 class="navbar-brand">Меню</h1>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/">Меню</RouterLink>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Добавить...
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><RouterLink class="nav-link active" aria-current="page" to="/category/add">Добавить категорию</RouterLink></li>
            <li><RouterLink class="nav-link active" aria-current="page" to="/position/add">Добавить позицию</RouterLink></li>
          </ul>
        </li>
        </ul>
      </div>
      </div>
      
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
