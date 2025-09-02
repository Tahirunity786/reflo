// components/Features.js

import { ShieldCheck, Truck, Package, Heart } from "lucide-react"; 

export default function Features() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          
          {/* Quality Assurance */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <ShieldCheck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Quality Assurance
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Trusted and tested products
            </p>
          </div>

          {/* Free Shipping */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Truck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Free Shipping
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              On all orders
            </p>
          </div>

          {/* Delivered with Care */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Delivered with Care
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Carefully packed for you
            </p>
          </div>

          {/* Excellent Service */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Excellent Service
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Customer-first approach
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
