import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NumericButton from '../NumericButton.vue';

describe('NumericButton.vue', () => {
  it('renders correctly', () => {
    const value = 5;
    const wrapper = mount(NumericButton, {
      props: { value }
    });
    expect(wrapper.text()).toContain(value.toString());
  });

  it('displays the value prop', () => {
    const value = 3;
    const wrapper = mount(NumericButton, {
      props: { value }
    });
    expect(wrapper.find('.NumButton').text()).toEqual(value.toString());
  });

  it('emits the number-clicked event with the correct value', async () => {
    const value = 7;
    const wrapper = mount(NumericButton, {
      props: { value }
    });
    await wrapper.find('.NumButton').trigger('click');
    
    expect(wrapper.emitted()).toHaveProperty('number-clicked');
    expect(wrapper.emitted()['number-clicked'][0]).toEqual([value]);
  });
});
