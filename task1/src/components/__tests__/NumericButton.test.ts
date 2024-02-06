// Import necessary utilities from Vue Test Utils and the component to test
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NumericButton from '../NumericButton.vue';

describe('NumericButton.vue', () => {
  // Test 1: Component renders correctly.
  it('renders correctly', () => {
    const value = 5;
    const wrapper = mount(NumericButton, {
      props: { value }
    });
    expect(wrapper.text()).toContain(value.toString());
  });

  // Test 2: The `value` prop is properly displayed.
  it('displays the value prop', () => {
    const value = 3;
    const wrapper = mount(NumericButton, {
      props: { value }
    });
    expect(wrapper.find('.NumButton').text()).toEqual(value.toString());
  });

  // Test 3: The `number-clicked` event is emitted with the correct value when the button is clicked.
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
