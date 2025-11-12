<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :required="required"
      :placeholder="placeholder"
      :min="min"
      :minlength="minlength"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  type?: string;
  modelValue: string | number;
  required?: boolean;
  placeholder?: string;
  min?: number | string;
  minlength?: number;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<style scoped>
.form-field {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #667eea;
}
</style>
