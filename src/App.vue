<template>
  <div id="app" class="container">
    <div id="nav" class="p-3">
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/settings" class="nav-link">Settings</router-link>
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style>

</style>
