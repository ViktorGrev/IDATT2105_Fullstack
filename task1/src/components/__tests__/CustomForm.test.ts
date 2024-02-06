import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CustomForm from '../CustomForm.vue';
import { useFormStore } from '@/stores/counter';

vi.mock('@/stores/counter', () => ({
  useFormStore: vi.fn(() => ({
    name: 'Test Name',
    email: 'test@example.com',
    setName: vi.fn(),
    setEmail: vi.fn(),
  })),
}));

vi.mock('vue-router', () => ({
  RouterLink: vi.fn(),
}));

describe('CustomForm.vue', () => {
  it('validates form correctly', async () => {
    const wrapper = mount(CustomForm, {
      global: {
        stubs: ['RouterLink'],
      },
    });

    // Initially, the form should be invalid because the message is missing.
    expect(wrapper.vm.isFormValid).toBe(false);

    // Fill in the message to make the form valid.
    await wrapper.find('textarea').setValue('A test message');
    expect(wrapper.vm.isFormValid).toBe(true);
  });

  // Additional tests can include mocking the fetch call for form submission,
  // and checking if the form reacts correctly to submission attempts.
});
