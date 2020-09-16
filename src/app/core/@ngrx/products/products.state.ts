import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IProduct} from './products.actions';


export interface IProductState extends EntityState<IProduct> {
  error: Error | string;
  selectedProduct: IProduct;
  isLoaded: boolean;
}

export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>();

export const initialState: IProductState = adapter.getInitialState({
  error: '',
  selectedProduct: null,
  isLoaded: false
});
