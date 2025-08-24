import { useDispatch, useSelector } from "react-redux";
import { addItemSafe } from "@/redux/slices/wishSlice";
import { FaShoppingBasket } from "react-icons/fa";
import { Heart } from "lucide-react";
import { toast } from "react-hot-toast";

export const WishButton = ({ data }) => {
  const dispatch = useDispatch();

  // 👇 correctly select wishlist items from Redux
  const items = useSelector((state) => state.wishlist.items);

  const addToWishItem = () => {
    const exists = items.some((i) => i.id === data?.id); // ✅ use items from useSelector

    if (exists) {
      toast("Item is already in your wishlist!", {
        icon: <FaShoppingBasket className="text-black" />,
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
      icon: <FaShoppingBasket className="text-black" />,
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
  );
};
