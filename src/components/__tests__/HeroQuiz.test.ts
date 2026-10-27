import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroQuiz from '../HeroQuiz.vue'

describe('HeroQuiz', () => {
  it('asks the visitor to pick an answer before showing feedback', () => {
    const wrapper = mount(HeroQuiz)
    expect(wrapper.find('[data-test="feedback"]').exists()).toBe(false)
    expect(wrapper.text()).toContain('Pick an answer')
  })

  it('shows the matching product and emits its id when an answer is picked', async () => {
    const wrapper = mount(HeroQuiz)
    await wrapper.find('input[value="vac"]').setValue()

    const feedback = wrapper.find('[data-test="feedback"]')
    expect(feedback.exists()).toBe(true)
    expect(feedback.text()).toContain('Virtual Assessment Center')
    expect(feedback.find('a').attributes('href')).toBe('#vac')
    expect(wrapper.emitted('select')).toEqual([['vac']])
  })
})
