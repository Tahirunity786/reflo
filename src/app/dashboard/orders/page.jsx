
import OrdersTable from "@/components/Admin/OrderTable/OrderTable";

export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>

      {/* Orders list */}
      <OrdersTable/>
      
    </div>
  );
}
