
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";


export const fetchCartData = () => {
    return async (dispatch) => {

        const fetchData = async () => {
            const response = await fetch('https://mkk-react-edu-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error("Veri gelmedi!");
            }

            const data = await response.json();

            return data;
        };

        try {

            const cartData = await fetchData();

            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));

        } catch (error) {

            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Data cekilirken hata aldı!'
                })
            )

        }

    }
};


export const sendCartData = (cart) => {

    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending',
                message: 'Veri yollanılıyor...',
            })
        );

        const sendRequest = async () => {
            const response = await fetch('https://mkk-react-edu-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity
                    }),
                })

            if (!response.ok) {
                throw new Error("")
            }

        };


        try {

            await sendRequest();

            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'success',
                    message: 'Sepetiniz kayıt edildi',
                })
            );

        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error',
                    message: 'Kayıt sırasında bir hata alındı!',
                })
            );
        }
    }





}