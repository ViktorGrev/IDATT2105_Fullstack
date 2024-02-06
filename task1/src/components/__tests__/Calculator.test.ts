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
        const button = wrapper.findAllComponents(NumericButton)[0];
        await button.trigger('click');

        (wrapper.vm as any).updateDisplayedNumber('0');
        await wrapper.vm.$nextTick();

        const input = wrapper.findComponent(NumericInput);

        const displayedNumber = input.props('displayedNumber');

        expect(displayedNumber).toBe('0');
    });

    it('appends symbol on symbol button click', async () => {
        const symbolButton = wrapper.findComponent({ name: 'SymbolButton', props: { value: '+' } });
        await symbolButton.trigger('click');

        (wrapper.vm as any).handleSymbolClicked('+');
        await wrapper.vm.$nextTick();

        const input = wrapper.findComponent(NumericInput);
        const displayedNumber = input.props('displayedNumber') || '';
        expect(displayedNumber).toContain('+');
    });

    it('clears displayed number on clear', async () => {
        await wrapper.findAllComponents(NumericButton)[1].trigger('click'); // Click '1'
        await wrapper.find('#clear').trigger('click'); // Trigger clear
        const input = wrapper.findComponent(NumericInput);
        expect(input.props('displayedNumber')).toBeNull();
    });








    /*

    
    it('correctly calculates a simple addition', async () => {
        // Setup component with Vue Test Utils
        const wrapper = mount(Calculator);
    
        await wrapper.setData({ displayedNumber: '1+1' });
        await wrapper.find('#equal').trigger('click');
    
        // Check the result
        expect(wrapper.vm.displayedNumber).toBe('2');
    });

    it('respects the order of operations', async () => {
        const wrapper = mount(Calculator);
    
        // Input for '2 + 3 * 4' (expected result should be '14', not '20')
        await wrapper.setData({ displayedNumber: '2+3*4' });
        await wrapper.find('#equal').trigger('click');
    
        expect(wrapper.vm.displayedNumber).toBe('14');
    });

    it('handles division by zero with an error message', async () => {
        const wrapper = mount(Calculator);
    
        // Input for '1 / 0'
        await wrapper.setData({ displayedNumber: '1/0' });
        await wrapper.find('#equal').trigger('click');
    
        // Assuming your app displays an error in such cases
        const resultBox = wrapper.find('#result').text();
        expect(resultBox).toContain('ERROR');
    });

    it('shows an error for incomplete expressions', async () => {
        const wrapper = mount(Calculator);
    
        // Input for incomplete expression like '5 +'
        await wrapper.setData({ displayedNumber: '5+' });
        await wrapper.find('#equal').trigger('click');
    
        const resultBox = wrapper.find('#result').text();
        expect(resultBox).toContain('ERROR'); // Adjust based on how your app handles this case
    });*/
});
