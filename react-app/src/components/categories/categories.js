import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { errorRedirect } from "../utility/error-redirect"

const Categories = () => {
    const {categoryName} = useParams();
    const itemsObj = useSelector(state => state.items);
    const items = Object.values(itemsObj);

    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        const categoryItems = items.filter(item => item.category.toLowerCase() === categoryName)

        setCategoryItems(categoryItems)
    }, [categoryName])

    // let error;
    // if (itemsObj) error = errorRedirect(itemsObj, categoryName)
    // if (error) return error

    return (
        <div className="category-container">
            <div className="category-names">
                {categoryItems.map((item, i) => {
                    return (
                        <div> {item.item_name} </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Categories
