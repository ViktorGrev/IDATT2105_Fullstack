<template>
  <div class="about">
    
    <CustomForm title="Feedback form"></CustomForm>

    <nav>
        <RouterLink to="/">Calculator</RouterLink>
        <RouterLink to="/about">Forms</RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
  import CustomForm from '@/components/CustomForm.vue';
</script>

<style>
  .about {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
</style>
