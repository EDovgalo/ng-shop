import {OrderByPipe} from './order-by.pipe';

describe('OrderByPipe', () => {

  const mockData = [
    {name: 'name 2'},
    {name: 'name 1'},
    {name: 'name 3'}
  ];

  const orderByPipe: OrderByPipe = new OrderByPipe();

  it('create an instance', () => {
    expect(orderByPipe).toBeTruthy();
  });

  it('should sort in ascending order', () => {
    const result = orderByPipe.transform(mockData, 'name', true);
    expect(result).toEqual([
      {name: 'name 1'},
      {name: 'name 2'},
      {name: 'name 3'}
    ]);
  });

  it('should sort in descending order', () => {
    const result = orderByPipe.transform(mockData, 'name', false);
    expect(result).toEqual([
      {name: 'name 3'},
      {name: 'name 2'},
      {name: 'name 1'}
    ]);
  });

});
