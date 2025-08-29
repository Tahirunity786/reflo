{/* Featured Product */}
                    <div className="mt-6 bg-gray-50 p-3 rounded-md">
                        <h4 className="text-base font-semibold mb-3 pb-2">Featured Product</h4>
                        <div className="rounded-lg flex flex-col sm:flex-row overflow-hidden bg-white shadow-sm mb-3">
                            {/* Image Section */}
                            <div className="relative w-full sm:w-1/2 h-40 sm:h-auto">
                                <Image
                                    src="/Image/fs_new_s1.webp"
                                    alt="Featured Product"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 p-4 flex flex-col justify-center">
                                <h5 className="text-sm font-medium text-gray-800 mb-1">Stylish Denim Dress</h5>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>

                                {/* Price */}
                                <p className="text-sm font-bold text-black">$400.00</p>
                            </div>
                        </div>
                        <div className="rounded-lg flex flex-col sm:flex-row overflow-hidden bg-white shadow-sm mb-3">
                            {/* Image Section */}
                            <div className="relative w-full sm:w-1/2 h-40 sm:h-auto">
                                <Image
                                    src="/Image/fs_new_s1.webp"
                                    alt="Featured Product"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 p-4 flex flex-col justify-center">
                                <h5 className="text-sm font-medium text-gray-800 mb-1">Stylish Denim Dress</h5>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>

                                {/* Price */}
                                <p className="text-sm font-bold text-black">$400.00</p>
                            </div>
                        </div>

                    </div>
                    {/* 50% OFF Banner */}
                    <div className="mt-6 rounded-lg overflow-hidden">
                        <Image
                            src="/Image/fs_new_s1.webp"
                            alt="50% Off Banner"
                            width={250}
                            height={400}
                            className="rounded-lg object-cover h-40"
                        />
                    </div>