import { useDispatch, useSelector } from "react-redux";
import { addItemSafe, removeItem } from "@/redux/slices/wishSlice"; // ✅ fixed
import { FaShoppingBasket } from "react-icons/fa";
import { Heart } from "lucide-react";
import { toast } from "react-hot-toast";
import React from "react";

const WishButton = ({ data }) => {
  const dispatch = useDispatch();

  // ✅ Check if this item is already in wishlist
  const isInWishlist = useSelector((state) =>
    state.wishlist.items.some((i) => i.id === data?.id)
  );

  const toggleWishlist = () => {
    if (!data?.id) return;

    if (isInWishlist) {
      dispatch(removeItem(data?.id));
      toast("Removed from wishlist!", {
        icon: <FaShoppingBasket className="text-black" />,
      });
    } else {
      const item = {
        id: data?.id,
        slug: data?.productSlug,
        name: data?.productName,
        price: data?.productPrice,
        stockStatus: data?.productStock > 0 ? "In Stock" : "Out of Stock",
        image: data?.productImages?.[0]?.image
          ? `${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${data?.productImages[0].image}`
          : null,
      };

      dispatch(addItemSafe(item));
      toast("Added to wishlist!", {
        icon: <FaShoppingBasket className="text-black" />,
      });
    }
  };

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      className="absolute top-3 right-3 transition-colors z-50 duration-200"
      aria-label="Add to wishlist"
    >
      {/* 👇 Toggle Heart icon fill */}
      <Heart
        size={20}
        strokeWidth={2}
        className={isInWishlist ? "text-red-500" : "text-gray-400"}
        fill={isInWishlist ? "currentColor" : "none"} // ✅ use currentColor for proper fill
      />
    </button>
  );
};

export default React.memo(WishButton);
