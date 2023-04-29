import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FoodForm from '../FoodForm';

jest.mock('./foodItems.json', () => ({
  pizza: ['small', 'medium', 'large'],
  burger: ['single', 'double', 'triple'],
  salad: ['side', 'regular', 'large'],
}));

describe('FoodForm component', () => {
  it('renders correctly', () => {
    const { queryByTestId } = render(<FoodForm />);
    expect(queryByTestId('food-form')).toBeInTheDocument();
  });

  it('displays food items when matching text is entered', () => {
    const { queryByText } = render(<FoodForm />);
    const input = queryByText('Food Item')?.querySelector('input');
    fireEvent.change(input!, { target: { value: 'piz' } });
    expect(queryByText('pizza')).toBeInTheDocument();
  });

  it('displays message when no matching food items are found', () => {
    const { queryByText } = render(<FoodForm />);
    const input = queryByText('Food Item')?.querySelector('input');
    fireEvent.change(input!, { target: { value: 'taco' } });
    expect(queryByText('No food items found.')).toBeInTheDocument();
  });

  it('calls setSelectedItem when a food item is selected', () => {
    const setSelectedItem = jest.fn();
    jest.spyOn(React, "useState").mockReturnValueOnce(['', setSelectedItem])
    const { queryByText } = render(
      <FoodForm />
    );
    const input = queryByText('Food Item')?.querySelector('input');
    fireEvent.change(input!, { target: { value: 'pizza' } });
    const option = queryByText('pizza');
    fireEvent.click(option!);
    expect(setSelectedItem).toHaveBeenCalledWith('pizza');
  });

  it('displays serving sizes when a food item is selected', () => {
    const { queryByText } = render(<FoodForm />);
    const input = queryByText('Food Item')?.querySelector('input');
    fireEvent.change(input!, { target: { value: 'pizza' } });
    const option = queryByText('pizza');
    fireEvent.click(option!);
    expect(queryByText('small')).toBeInTheDocument();
    expect(queryByText('medium')).toBeInTheDocument();
    expect(queryByText('large')).toBeInTheDocument();
  });

  it('calls setSelectedSize when a serving size is selected', () => {
    const setSelectedSize = jest.fn();
    const setSelectedItem = jest.fn();
    jest.spyOn(React, "useState").mockReturnValueOnce(['pizza', setSelectedItem])
    jest.spyOn(React, "useState").mockReturnValueOnce(['', setSelectedSize])
    const { queryByText } = render(
      <FoodForm />
    );
    const dropdown = queryByText('Serving Size')?.querySelector('select');
    fireEvent.change(dropdown!, { target: { value: 'medium' } });
    expect(setSelectedSize).toHaveBeenCalledWith('medium');
  });
});
