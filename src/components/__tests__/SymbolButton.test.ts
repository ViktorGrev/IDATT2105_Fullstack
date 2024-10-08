// Import necessary utilities from Vue Test Utils and the component to test
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SymbolButton from '../SymbolButton.vue';

describe('SymbolButton.vue', () => {
  it('renders and displays the value prop', () => {
    const value = '+';
    const wrapper = mount(SymbolButton, {
      props: { value }
    });
    expect(wrapper.text()).toContain(value);
  });

  it('emits the symbol-clicked event with the correct value', async () => {
    const value = '-';
    const wrapper = mount(SymbolButton, {
      props: { value }
    });
    await wrapper.find('.SymButton').trigger('click');
    
    expect(wrapper.emitted()).toHaveProperty('symbol-clicked');
    // Check the payload of the first emitted 'symbol-clicked' event
    expect(wrapper.emitted()['symbol-clicked'][0]).toEqual([value]);
  });
});
