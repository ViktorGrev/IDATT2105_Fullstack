import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import CustomForm from '../CustomForm.vue';

// Mocking the external store
vi.mock('@/stores/counter', () => ({
  useFormStore: vi.fn(() => ({
    name: 'Test Name',
    email: 'test@example.com',
    setName: vi.fn(),
    setEmail: vi.fn(),
  })),
}));

// Mocking the global fetch API
global.fetch = vi.fn(() =>
  Promise.resolve(new Response(JSON.stringify({ message: 'Success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  }))
);

describe('CustomForm.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(CustomForm, {
      props: {
        title: 'Test Form',
      },
    });
  });

  it('renders form title from props', () => {
    expect(wrapper.find('#title').text()).toBe('Test Form');
  });

  it('enables submit button when form is valid', async () => {
    await wrapper.find('input[name="Name"]').setValue('John Doe');
    await wrapper.find('input[name="Email"]').setValue('john@example.com');
    await wrapper.find('textarea[name="comment[text]"]').setValue('Hello world');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.btn').attributes('disabled')).toBeUndefined();
  });
  
  it('disables submit button when form is invalid', async () => {
    await wrapper.find('input[name="Name"]').setValue('');
    await wrapper.find('input[name="Email"]').setValue('');
    await wrapper.find('textarea[name="comment[text]"]').setValue('');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.btn').attributes('disabled')).toBeDefined();
  });

  it('submits form and calls store actions', async () => {
    // First, simulate filling out the form
    await wrapper.find('input[name="Name"]').setValue('Jane Doe');
    await wrapper.find('input[name="Email"]').setValue('jane@example.com');
    await wrapper.find('textarea[name="comment[text]"]').setValue('Feedback message');
    await wrapper.find('form').trigger('submit.prevent');
    await wrapper.vm.$nextTick();
    expect(fetch).toHaveBeenCalledTimes(1);
  
    const expectedBody = JSON.stringify({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Feedback message',
    });
  
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: expectedBody,
    });
  });
});