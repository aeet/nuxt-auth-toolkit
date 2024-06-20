import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: { tooling: true, stylistic: true },
  dirs: { src: ['./playground', './src', './test'] },
}).append({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': ['error', 300],
    'vue/multi-word-component-names': 0,
  },
  ignores: [
    'dist',
    'node_modules',
  ],
})
