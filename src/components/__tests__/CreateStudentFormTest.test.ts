import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CreateStudentForm from '../CreateStudentFormComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { useStudentStore } from '../../stores/studentStore'

describe('CreateStudentForm.vue', () => {

  it("Par défaut, la zone d'ajout du nom est vide.", async () => {
    //aidé avec chatGPT
    const wrapper = mount(CreateStudentForm, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      })
    const nameInput = wrapper.find('#studentName').element as HTMLInputElement

    expect(nameInput.value).toBe('')
  })

  it("Par défaut, la zone d'ajout du email est vide.", async () => {
    const wrapper = mount(CreateStudentForm)
    const emailInput = wrapper.find('#studentEmail').element as HTMLInputElement

    expect(emailInput.value).toBe('')
  })

  it("Par défaut, la zone d'ajout du mot de passe est vide.", async () => {
    const wrapper = mount(CreateStudentForm)
    const passwordInput = wrapper.find('#password').element as HTMLInputElement

    expect(passwordInput.value).toBe('')
  })

  it("Par défaut, la zone d'ajout du confirmation du mot de passe est vide.", async () => {
    const wrapper = mount(CreateStudentForm)
    const passwordInput = wrapper.find('#confirmPassword').element as HTMLInputElement

    expect(passwordInput.value).toBe('')
  })

  it("Sur envoie d'un nouveau étudiant, doit émettre un événement.", async () => {
    const wrapper = mount(CreateStudentForm, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      })

    await wrapper.find('#password').setValue('password')
    await wrapper.find('#confirmPassword').setValue('password')
    await wrapper.find('#studentEmail').setValue('email@mail.com')
    await wrapper.find('#studentName').setValue('name')
    await wrapper.find('#submit-student').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('newStudent')
  })

  it("Sur envoie d'un nouveau étudiant, doit émettre un événement.", async () => {
    const wrapper = mount(CreateStudentForm, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      })

    await wrapper.find('#password').setValue('password')
    await wrapper.find('#confirmPassword').setValue('password')
    await wrapper.find('#studentEmail').setValue('email@mail.com')
    await wrapper.find('#studentName').setValue('name')
    await wrapper.find('#submit-student').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('newStudent')
  })
})
