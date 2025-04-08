// MessageInput.test.tsx
import { render, fireEvent, screen } from '@testing-library/react';
import MessageInput from './MessageInput';

test('should send a message when input is provided', () => {
  const mockSendMessage = jest.fn();
  render(<MessageInput onSendMessage={mockSendMessage} />);

  const inputdata = screen.getByPlaceholderText('Type a message');
  fireEvent.change(inputdata, { target: { value: 'Hello!' } });
  fireEvent.submit(screen.getByRole('form'));

  expect(mockSendMessage).toHaveBeenCalledWith('Hello!');
});
