import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmDeleteModal from '../ConfirmDeleteModal.vue'
import { Modal } from 'bootstrap'

describe('ConfirmDeleteModal.vue', () => {

  it('Doit afficher les bonnes informations dans la boite de dialogue.', () => {
    const wrapper = mount(ConfirmDeleteModal, {
      props: {
        trigger: 1,
        title: 'mon titre',
        body: 'mon contenu',
        cancelButton: 'OK',
        confirmButton: 'OK2'
      }
    })
    expect(wrapper.text()).toContain('mon titre')
    expect(wrapper.text()).toContain('mon contenu')
    expect(wrapper.find('button[name="confirmer"]').exists()).toBe(true)
  })

  it('Sur confirmation, doit émettre un événement.', async () => {
    const wrapper = mount(ConfirmDeleteModal, {
        props: {
            trigger: 1,
            title: 'mon titre',
            body: 'mon contenu',
            cancelButton: 'OK',
            confirmButton: 'OK2'
          }
    })

    await wrapper.find('button[name="confirmer"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('onDeleteConfirmed')
  })
})