import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FormInput from '../FormInput.vue';

describe('FormInput.vue', () => {
  it('check for correct update:modelValue', async () => {
    const wrapper = mount(FormInput, {
      props: {
        fieldName: 'Test Field',
        type: 'text',
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('New Value');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['New Value']);
  });

  it('initializes with the correct modelValue', () => {
    const wrapper = mount(FormInput, {
      props: {
        fieldName: 'Test Field',
        type: 'text',
        modelValue: 'Initial Value',
      },
    });

    expect(wrapper.find('input').element.value).toBe('Initial Value');
  });

  it('initializes with the correct type', () => {
    const wrapper = mount(FormInput, {
      props: {
        fieldName: 'Test Field',
        type: 'email',
        modelValue: '',
      },
    });
  
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('email');
    expect(input.attributes('type')).not.toBe('text');
  });
  
});
