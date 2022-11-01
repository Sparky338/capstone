import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import ImageGallery from 'react-image-gallery';

import "./items.css"

const ItemById = () => {
    const history = useHistory()
    const { itemId } = useParams();
    const user = useSelector(state => state.session.user);
    const itemsObj = useSelector(state => state.items);
    const items = Object.values(itemsObj);
    const itemQuantity = JSON.parse(localStorage.getItem('itemQuantity'))

    if (!itemId) return null;
    if (!itemsObj) return null;
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', "{}"); // object with pk, key into pk
    }
    if (!localStorage.getItem('itemQuantity')) {
        localStorage.setItem('itemQuantity', "{}");
    }

    const filteredItem = items.filter(item => item.id === +itemId)
    const localStorageItems = JSON.parse(localStorage.getItem("Items"))
    const cart = JSON.parse(localStorage.getItem('cart'))

    const addToCart = () => {
        let item = Object.keys(cart).find(itemId => itemId === filteredItem[0].id)

        if (item) {
            itemQuantity[itemId] += 1;
        } else {
            cart[itemId] = filteredItem;
            itemQuantity[itemId] = 1
            // cart[itemId.qty] = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        localStorage.setItem('itemQuantity', JSON.stringify(itemQuantity))
        history.push("/cart")
    }

    return (
        <div className="outer-item-div">
            {filteredItem.map((item) => {
                return (
                    <div className="item-by-id" key={item.id}>
                        <div className="item-outer">
                            <div className="display-carousel">
                                {/* <ImageGallery
                                    items=arrayofImages
                                    showPlayButton={false}
                                    showFullscreenButton={false}
                                    infinite={false}
                                /> */}
                            </div>
                            <div className="item-info-price">
                                <div className="name-price-review">
                                    <div className="item-name">{item.item_name}</div>
                                    <div className="price-review">
                                        <div className="price">${item.price}</div>
                                        <div className="review-link">Link to review here</div>
                                    </div>
                                </div>
                                <div className="description">{item.description}</div>
                                <button className="add-to-cart main-button" onClick={addToCart}>ADD TO CART</button>
                            </div>
                        </div>
                        <div className="reviews-picture">
                            <div className="review-header-container">
                                <div className="horizontal-line"></div>
                                <div className="review-header">{item.item_name.toUpperCase()} REVIEWS</div>
                            </div>
                            <div className="review-container">
                                <div className="review">Review goes here.</div>
                                <div className="picture-and-name">
                                    <div className="picture"> image goes here</div>
                                    <div className="first-last-name"> - firstName LastName goes here </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ItemById;
