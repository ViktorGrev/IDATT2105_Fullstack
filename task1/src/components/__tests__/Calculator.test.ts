import { describe, it, expect, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import Calculator from '../Calculator.vue';
import NumericButton from '../NumericButton.vue';
import NumericInput from '../NumericInput.vue';
import SymbolButton from '../SymbolButton.vue';

describe('Calculator.vue', () => {
    let wrapper: VueWrapper; // Explicitly type the wrapper variable

    beforeEach(() => {
        wrapper = mount(Calculator) as VueWrapper; // Cast the result of mount to VueWrapper
    });

    it('initializes with a null displayed number', () => {
        const input = wrapper.findComponent(NumericInput);
        expect(input.props('displayedNumber')).toBeNull();
    });

    it('updates displayed number on numeric button click', async () => {
        // Ensure you have enough buttons rendered
        const numericButtons = wrapper.findAllComponents(NumericButton);
        // Get the value prop of the second button
        const buttonValue = numericButtons[1].props('value');
        // Simulate a custom event on the second button, using the value prop
        numericButtons[1].vm.$emit('number-clicked', buttonValue);
        await nextTick(); // Wait for Vue to update
    
        const input = wrapper.findComponent(NumericInput);
        expect(input.props('displayedNumber')).toBe(String(buttonValue));
    });

    it('not append symbol on symbol button click when ', async () => {
        const wrapper = mount(Calculator);
        await wrapper.vm.handleSymbolClicked('+');
        await wrapper.find('#equal').trigger('click');
        const input = wrapper.findComponent(NumericInput);
        expect(input.props('displayedNumber')).toBeNull();
    });

    it('clears displayed number on clear', async () => {
        const wrapper = mount(Calculator);
        const input = wrapper.findComponent(NumericInput);
        await wrapper.vm.updateDisplayedNumber('2');
        await wrapper.find('#clear').trigger('click'); // Trigger clear
        expect(input.props('displayedNumber')).toBeNull();
    });

    it('removes the last number', async () => {
        const wrapper = mount(Calculator);
        const input = wrapper.findComponent(NumericInput);
        await wrapper.vm.updateDisplayedNumber('200');
        await wrapper.find('#del').trigger('click'); // Trigger clear
        expect(input.props('displayedNumber')).toBe('20');
    });


    it('correctly calculates a simple addition', async () => {
        const wrapper = mount(Calculator);
    
        await wrapper.vm.updateDisplayedNumber('2');
        await wrapper.vm.handleSymbolClicked('+');
        await wrapper.vm.updateDisplayedNumber('1');
        await wrapper.find('#equal').trigger('click');
    
        expect(wrapper.vm.displayedNumber).toBe('3');
      });
    
      it('respects the order of operations', async () => {
        const wrapper = mount(Calculator);
    
        await wrapper.vm.updateDisplayedNumber('2');
        await wrapper.vm.handleSymbolClicked('+');
        await wrapper.vm.updateDisplayedNumber('3');
        await wrapper.vm.handleSymbolClicked('*');
        await wrapper.vm.updateDisplayedNumber('4');
        await wrapper.find('#equal').trigger('click');
    
        expect(wrapper.vm.displayedNumber).toBe('14');
      });
    
      it('handles division by zero with an error message', async () => {
        const wrapper = mount(Calculator);
    
        await wrapper.vm.updateDisplayedNumber('2');
        await wrapper.vm.handleSymbolClicked('/');
        await wrapper.vm.updateDisplayedNumber('0');
        await wrapper.find('#equal').trigger('click');
    
        expect(wrapper.vm.displayedNumber).toBe(null);
      });
});
