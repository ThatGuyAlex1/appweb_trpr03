import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PasswordModel from '../PasswordModal.vue'
import { Modal } from 'bootstrap'

describe('PasswordModal.vue', () => {

  it('Doit afficher les bonnes informations dans la boite de dialogue.', () => {
    const wrapper = mount(PasswordModel, {
      props: {
        trigger: 1,
        title: 'mon titre',
        body: 'mon contenu',
        dismissButton: 'OK'
      }
    })
    expect(wrapper.text()).toContain('mon titre')
    expect(wrapper.text()).toContain('mon contenu')
    expect(wrapper.find('button[name="confirmer"]').exists()).toBe(true)
  })
})