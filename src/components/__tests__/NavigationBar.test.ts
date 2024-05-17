import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount, isVisible } from '@vue/test-utils'
import NavigationBar from '../NavigationBar.vue' // Ajustez le chemin selon votre structure
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../../router/routes'

const router = createRouter({
  history: createWebHistory(),
  routes : routes
})

describe('NavigationBar', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  it('Les liens des autres views ne sont pas présent lorsque le user est pas connecté.', async () => {
    router.push('/') // S'assurer de commencer avec une route connue
    await router.isReady() // Attendre que le routeur soit prêt

    vi.mock('../../stores/authStore', () => ({
      useAuthStore: () => ({
        isLoggedIn: false
      })
    }))

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router, createTestingPinia({ createSpy: vi.fn })]
      }
    })

    console.log(wrapper.html())

    const homeLink = wrapper.find('#home-link')
    expect(homeLink.exists()).toBe(false)

    const profileLink = wrapper.find('#profile-link')
    expect(profileLink.exists()).toBe(false)

    const classManagerLink = wrapper.find('#class-manager-link')
    expect(classManagerLink.exists()).toBe(false)

    const logoutLink = wrapper.find('a[href="#"]')
    expect(logoutLink.exists()).toBe(false)
  })

  it('Les liens des autres views sont présent lorsque le user est connecté en temps que prof', async () => {
    router.push('/') // S'assurer de commencer avec une route connue
    await router.isReady() // Attendre que le routeur soit prêt

    vi.mock('../../stores/authStore', () => ({
      useAuthStore: () => ({
        isLoggedIn: true
      })
    }))

    vi.mock('../../stores/profileStore', () => ({
      useProfileStore: () => ({
        role: 'teacher'
      })
    }))

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router, createTestingPinia({ createSpy: vi.fn })]
      }
    })

    console.log(wrapper.html())

    const homeLink = wrapper.find('#home-link')
    expect(homeLink.exists()).toBe(true)

    const profileLink = wrapper.find('#profile-link')
    expect(profileLink.exists()).toBe(true)

    const classManagerLink = wrapper.find('#class-manager-link')
    expect(classManagerLink.exists()).toBe(true)

    const logoutLink = wrapper.find('a[href="#"]')
    expect(logoutLink.exists()).toBe(true)
  })

  it('Les liens des autres views sont présent lorsque le user est pas connecté en temps que prof', async () => {
    router.push('/') // S'assurer de commencer avec une route connue
    await router.isReady() // Attendre que le routeur soit prêt

    vi.mock('../../stores/authStore', () => ({
      useAuthStore: () => ({
        isLoggedIn: true
      })
    }))

    vi.mock('../../stores/profileStore', () => ({
      useProfileStore: () => ({
        role: 'student'
      })
    }))

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router, createTestingPinia({ createSpy: vi.fn })]
      }
    })

    console.log(wrapper.html())

    const homeLink = wrapper.find('#home-link')
    expect(homeLink.exists()).toBe(true)

    const profileLink = wrapper.find('#profile-link')
    expect(profileLink.exists()).toBe(true)

    const classManagerLink = wrapper.find('#class-manager-link')
    expect(classManagerLink.exists()).toBe(false)

    const logoutLink = wrapper.find('a[href="#"]')
    expect(logoutLink.exists()).toBe(true)
  })
})
