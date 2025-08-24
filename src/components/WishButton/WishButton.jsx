import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { addItemSafe } from "@/redux/slices/cartSlice";
import { useSelector } from "react-redux";

export const WishButton = () => {

    const dispatch = useDispatch();
    const items = useSelector((state) => state.wish.items);

    const addToWishItem = () => {
        const exists = items.find((i) => i.id === data?.id);

        if (exists) {
            toast("Item is already in your wishlist!", {
                icon: <FaShoppingBasket className="text-black" />, // ✅ custom basket icon
            });
            return;
        }

        const item = {
            id: data?.id,
            slug: data?.productSlug,
            name: data?.productName,
            price: data?.productPrice,
            image: data?.productImages?.[0]?.image
                ? `${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${data?.productImages[0].image}`
                : null,
        };

        dispatch(addItemSafe(item));

        toast("Added to wishlist!", {
            icon: <FaShoppingBasket className="text-black" />, // optional: show basket icon here too
        });
    };

    return (
        <button
            type="button"
            onClick={addToWishItem}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors duration-200"
            aria-label="Add to wishlist"
        >
            <Heart size={20} />
        </button>
    )
}
