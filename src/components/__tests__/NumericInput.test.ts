import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NumericInput from '../NumericInput.vue';

describe('NumericInput.vue', () => {
  it('renders the displayedNumber prop correctly', () => {
    const displayedNumber = '123';
    const wrapper = mount(NumericInput, {
      props: { displayedNumber }
    });
    const inputElement = wrapper.find('.NumericInput').element as HTMLInputElement;
    expect(inputElement.value).toBe(displayedNumber);
  });

  it('emits an input event with the correct value', async () => {
    const wrapper = mount(NumericInput);
    const inputValue = '456'; // Simulating input
    await wrapper.vm.handleInput({ target: { value: inputValue } } as unknown as Event);
    
    expect(wrapper.emitted()).toHaveProperty('input');
    expect(wrapper.emitted()['input'][0]).toEqual([inputValue]);
  });
});
