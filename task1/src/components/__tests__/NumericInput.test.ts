// Import necessary utilities from Vue Test Utils and the component to test
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NumericInput from '../NumericInput.vue';

describe('NumericInput.vue', () => {
  // Test 1: Component renders correctly with the `displayedNumber` prop.
  it('renders the displayedNumber prop correctly', () => {
    const displayedNumber = '123';
    const wrapper = mount(NumericInput, {
      props: { displayedNumber }
    });
    // Use a type assertion to treat the found element as an HTMLInputElement
    const inputElement = wrapper.find('.NumericInput').element as HTMLInputElement;
    expect(inputElement.value).toBe(displayedNumber);
  });

  // Note: Given the component is marked as readonly, it's not typical to test user input directly as the input field should not be editable.
  // However, we can still test the emission of an event programmatically if needed, especially if handleInput is expected to be called by other means.
  // This step is more about demonstrating the capability rather than a practical test case for this specific scenario.
  it('emits an input event with the correct value', async () => {
    const wrapper = mount(NumericInput);
    const inputValue = '456'; // Simulating input
    
    // Directly triggering handleInput to simulate the effect of an input event
    await wrapper.vm.handleInput({ target: { value: inputValue } } as unknown as Event);
    
    expect(wrapper.emitted()).toHaveProperty('input');
    expect(wrapper.emitted()['input'][0]).toEqual([inputValue]);
  });
});
