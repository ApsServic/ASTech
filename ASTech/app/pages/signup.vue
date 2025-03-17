<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta, useSeoMeta, createError } from '#imports'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Sign up'
})

interface Field {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}

const fields: Field[] = [{
  name: 'name',
  type: 'text',
  label: 'Name',
  placeholder: 'Enter your name'
}, {
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

const validate = (state: { name: string; email: string; password: string }) => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Name is required' })
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

const providers = [{
  label: 'Continue with GitHub',
  icon: 'i-simple-icons-github',
  color: 'gray' as const,
  click: () => {
    console.log('Redirect to GitHub')
  }
}]

const onSubmit = (data: { name: string; email: string; password: string }) => {
  try {
    // Basic input sanitization
    const sanitizedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim()
    }
    console.log('Submitted', sanitizedData)
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
      align="top"
      title="Create an account"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ label: 'Create account' }"
      @submit="onSubmit"
    >
      <template #description>
        Already have an account? <NuxtLink
          to="/login"
          class="text-primary font-medium"
        >Login</NuxtLink>.
      </template>

      <template #footer>
        By signing up, you agree to our <NuxtLink
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