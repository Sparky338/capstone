
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";


import "./orders.css"

const OrderById = () => {
    const { orderId } = useParams();
    const user = useSelector(state => state.session.user);
    const items = useSelector(state => state.items);
    const reviewsState = useSelector(state => state.reviews);
    const purchases = useSelector(state => state.purchases);
    const purchasesItems = useSelector(state => state.purchasesItems);

    const formatting_options = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    };
    const dollarFormatter = new Intl.NumberFormat("en-US", formatting_options);

    const filterdPurchasesItems = Object.entries(purchasesItems).filter(pi => pi[1].purchase_id === +orderId)
    const filterdReviews = Object.entries(reviewsState).filter(review => review[1].user_id === user.id)
// console.log("filtered", filterdReviews)
    return (
        <div className="id-order-outer">
            <div className="id-order-header">ORDER NUMBER: #{orderId}</div>
            <div className="id-order-container">
                <table className="full-id-order-table" border="0" cellSpacing="0">
                    <thead className="table-header">
                        <tr>
                            <th width="10%">&nbsp;</th>
                            <th className="table-header-item">ITEM</th>
                            <th className="table-header-qty" width="10%">QTY</th>
                            <th className="table-header-total" width="15%">TOTAL</th>
                            <th width="5%">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {filterdPurchasesItems.map(
                            (purchaseItem, i) => {
                                return (
                                    <tr className="id-order-item" key={i}>
                                        <td className="id-order-item-image">
                                            {items[purchaseItem[1].item_id].images[0]}

                                        </td>
                                        <td className="id-order-item-name">
                                            {items[purchaseItem[1].item_id].item_name}
                                        </td>
                                        <td className="id-order-item-qty">
                                            {purchaseItem[1].quantity}
                                        </td>
                                        <td className="id-order-item-total">
                                            {dollarFormatter.format(items[purchaseItem[1].id].price * purchaseItem[1].quantity)}
                                            {console.log((filterdReviews.filter(review => review[1].item_id === purchaseItem[1].item_id).length))}
                                            {/* {console.log(purchaseItem[1].purchase_id)} good for checking order number*/}
                                        </td>
                                        <td className="id-order-item-review">
                                            {/* {filterdReviews.map((review, i) => {
                                                return ( */}
                                                {/* {console.log(filterdReviews.map((review, i) => {return(Object.hasOwn(purchaseItem[1], 'item_id'))}))} */}
                                                {/* {console.log(Object.entries(filterdReviews).find(review => review[1].item_id === purchaseItem[1].item_id))} */}
                                                    <>
                                                        {(filterdReviews.filter(review => review[1].item_id === purchaseItem[1].item_id).length) ?
                                                            <Link to={`/items/${purchaseItem[1].item_id}/review/${purchaseItem[1].purchase_id}/edit`}
                                                                className="review-text"
                                                                key={i}
                                                                >Edit Review</Link>
                                                            :
                                                            <Link to={{pathname: `/items/${purchaseItem[1].item_id}/review`, state: {
                                                                user_id: user.id,
                                                                item_id: purchaseItem[1].item_id,
                                                                purchase_id: purchaseItem[1].purchase_id
                                                            }}}
                                                            className="review-text"
                                                            key={i}
                                                            >Leave Review</Link>
                                                        }
                                                    </>
                                                {/* )
                                            })} */}

                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                    <tfoot className="id-order-table-footer">
                        <tr className="id-order-table-footer-row">
                            <td></td>
                            <td></td>
                            <td className="id-order-total">ORDER TOTAL:</td>
                            <td className="id-order-total-price">{dollarFormatter.format(purchases[orderId].price)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default OrderById;
