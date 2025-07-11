import UserTable from "@/components/Admin/UserTable/UserTable";



export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      {/* Orders list */}
      <UserTable/>
      
    </div>
  );
}
