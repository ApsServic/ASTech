<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta, useSeoMeta, createError } from '#imports'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login'
})

interface Field {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}

const fields: Field[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password'
}]

const validate = (state: { email: string; password: string }) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

const providers = [{
  label: 'Continue with GitHub',
  icon: 'i-simple-icons-github',
  color: 'white' as const,
  click: () => {
    console.log('Redirect to GitHub')
  }
}]

const onSubmit = (data: { email: string; password: string }) => {
  try {
    console.log('Submitted', data)
    // Add logic to handle form submission
  } catch (error) {
    console.error('Submission error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Submission failed, please try again later.' })
  }
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      :providers="providers"
      title="Welcome back"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
      @submit="onSubmit"
    >
      <template #description>
        Don't have an account? <NuxtLink
          to="/signup"
          class="text-primary font-medium"
        >Sign up</NuxtLink>.
      </template>

      <template #password-hint>
        <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Forgot password?</NuxtLink>
      </template>

      <template #footer>
        By signing in, you agree to our <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Terms of Service</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>

<style scoped>
.max-w-sm {
  max-width: 24rem;
}
.bg-white/75 {
  background-color: rgba(255, 255, 255, 0.75);
}
.dark .bg-white/5 {
  background-color: rgba(255, 255, 255, 0.05);
}
.backdrop-blur {
  backdrop-filter: blur(10px);
}
.text-primary {
  color: var(--color-primary);
}
.font-medium {
  font-weight: 500;
}
</style>