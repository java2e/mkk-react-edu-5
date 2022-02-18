

import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {

    const dispatch = useDispatch();

    const { title, quantity, total, price, id } = props.item;


    const removeItemHandler = () => {

        dispatch(cartActions.removeItemForCart(id));

    }

    const addItemHandler = () => {

        dispatch(cartActions.addItemCart({
            id,
            title,
            price
        }))
    }




    return (
        <li className={classes.item}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    ${total}{' '}
                    <span className={classes.itemprice}>(${price.toFixed(2)} / adet)</span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={removeItemHandler}>-</button>
                    <button onClick={addItemHandler}>+</button>
                </div>
            </div>
        </li>
    )

}

export default CartItem;