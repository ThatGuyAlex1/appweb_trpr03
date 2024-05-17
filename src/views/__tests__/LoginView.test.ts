import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from '../LoginView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useStudentStore } from '../../stores/studentStore'

describe('LoginView.vue', () => {

  it("Par défaut, la zone d'ajout du courriel est vide.", async () => {
    const wrapper = mount(LoginView, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      })
    const nameInput = wrapper.find('#email-input').element as HTMLInputElement

    expect(nameInput.value).toBe('')
  })

  it("Par défaut, la zone d'ajout du mot de passe est vide.", async () => {
    const wrapper = mount(LoginView)
    const emailInput = wrapper.find('#password-input').element as HTMLInputElement

    expect(emailInput.value).toBe('')
  })
})
