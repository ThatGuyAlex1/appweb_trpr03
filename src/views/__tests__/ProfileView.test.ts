import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileView from '../ProfileUpdateView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useProfileStore } from '../../stores/profileStore'
import { teacherService } from '@/services/teacherService'

describe('ProfileView.vue', () => {

  it("Par défaut, la zone du nouveau mot de passe est vide.", async () => {
    const wrapper = mount(ProfileView, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      })
    const passwordInput = wrapper.find('#newPassword').element as HTMLInputElement

    expect(passwordInput.value).toBe('')
  })

  it("Par défaut, la zone d'ajout du mot de passe de confirmation est vide.", async () => {

    const wrapper = mount(ProfileView)
    const passwordInput = wrapper.find('#confirmPassword').element as HTMLInputElement

    expect(passwordInput.value).toBe('')
  })

  it("Par défaut, la zone d'ajout du nom est vide.", async () => {

      const store = useProfileStore()

      store.role = 'teacher'

    const wrapper = mount(ProfileView)
    const emailInput = wrapper.find('#name').element as HTMLInputElement

    expect(emailInput.value).toBe('')
  })

  
  it("Si un étudiant est connecté, la zone d'ajout du nom est invisible", async () => {

    const store = useProfileStore()

    store.role = 'student'

    const wrapper = mount(ProfileView)

    const homeLink = wrapper.find('#name')
    expect(homeLink.exists()).toBe(false)
  })

  
})
