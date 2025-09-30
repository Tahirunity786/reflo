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



   {/* Featured Product */}
          {/* <div className="mt-6 bg-gray-50 p-3 rounded-md">
            <h4 className="text-base font-semibold mb-3 pb-2">Featured Product</h4>
            <div className="rounded-lg flex flex-col sm:flex-row overflow-hidden bg-white shadow-sm mb-3">
              
              <div className="relative w-full sm:w-1/2 h-40 sm:h-auto">
                <Image
                  src="/Image/fs_new_s1.webp"
                  alt="Featured Product"
                  fill
                  className="object-cover"
                />
              </div>

        
              <div className="flex-1 p-4 flex flex-col justify-center">
                <h5 className="text-sm font-medium text-gray-800 mb-1">Stylish Denim Dress</h5>

              
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

              
                <p className="text-sm font-bold text-black">$400.00</p>
              </div>
            </div>
            <div className="rounded-lg flex flex-col sm:flex-row overflow-hidden bg-white shadow-sm mb-3">
            
              <div className="relative w-full sm:w-1/2 h-40 sm:h-auto">
                <Image
                  src="/Image/fs_new_s1.webp"
                  alt="Featured Product"
                  fill
                  className="object-cover"
                />
              </div>

          
              <div className="flex-1 p-4 flex flex-col justify-center">
                <h5 className="text-sm font-medium text-gray-800 mb-1">Stylish Denim Dress</h5>

             
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                
                <p className="text-sm font-bold text-black">$400.00</p>
              </div>
            </div>

          </div>
         
          <div className="mt-6 rounded-lg overflow-hidden">
            <Image
              src="/Image/fs_new_s1.webp"
              alt="50% Off Banner"
              width={250}
              height={400}
              className="rounded-lg object-cover h-40"
            />
          </div> */}

<div className="flex flex-wrap justify-between items-center mb-12 gap-4 px-16">

                    {/* Search Box */}
                    <div className="relative pr-5 w-full md:w-auto">
                        {/* Search Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16" height="16"
                            fill="currentColor"
                            className="absolute top-2.5 left-5 text-gray-500"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 
                                3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 
                                1 0 0 0-.115-.1zM12 
                                6.5a5.5 5.5 0 1 1-11 0 
                                5.5 5.5 0 0 1 11 0" />
                        </svg>
                        <input
                            type="search"
                            id="search"
                            placeholder="Search article"
                            className="form-input pl-12 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--aero-primary)]"
                        />
                    </div>

                    {/* Swiper Carousel */}
                    <div className="relative flex-1">
                        <Swiper
                            modules={[FreeMode]}
                            freeMode={true}
                            slidesPerView="auto"
                            spaceBetween={15}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            onSlideChange={handleSlideChange}
                            className="mySwiper"
                        >
                            {buttonLabels.map((label, index) => (
                                <SwiperSlide key={index} className="!w-auto">
                                    <button
                                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${activeIndex === index
                                            ? "bg-blue-400 text-white border-blue-400"
                                            : "border-blue-400 text-black hover:bg-blue-400 hover:text-white"
                                            }`}
                                        onClick={() => handleButtonClick(index)}
                                    >
                                        {label}
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Left Nav Button */}
                        <button
                            className={`absolute left-[-35px] top-1/2 -translate-y-1/2 p-2 bg-blue-400 shadow-md rounded-full border 
          ${isBeginning ? "hidden" : ""}`}
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" fill="currentColor"
                                className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 
            0 1 0-.708-.708l-4 4a.5.5 0 0 
            0 0 .708l4 4a.5.5 0 0 
            0 .708-.708L2.707 8.5H14.5A.5.5 0 
            0 0 15 8" />
                            </svg>
                        </button>

                        {/* Right Nav Button */}
                        <button
                            className={`absolute right-[-35px] top-1/2 -translate-y-1/2 p-2 bg-blue-400 shadow-md rounded-full border 
                            ${isEnd ? "hidden" : ""}`}
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" fill="currentColor"
                                className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 
                                    1 .5-.5h11.793l-3.147-3.146a.5.5 
                                    0 0 1 .708-.708l4 4a.5.5 0 0 
                                    1 0 .708l-4 4a.5.5 0 0 
                                    1-.708-.708L13.293 8.5H1.5A.5.5 
                                    0 0 1 1 8" 
                                    />
                            </svg>
                        </button>
                    </div>
                </div>

                // When a filter changes, call fetch with a debounce for the text box
    // useEffect(() => {
    //     // debounce for search (400ms) — resets on every change
    //     if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    //     // We still want immediate fetch for checkbox/slider changes, but debounced is okay too.
    //     searchDebounceRef.current = setTimeout(() => {
    //         fetchFilteredProducts();
    //     }, 300);

    //     return () => {
    //         if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    //     };
    // }, [selectedCategories, inStockOnly, minPrice, maxPrice, searchKeyword, fetchFilteredProducts]);

        const toggleCategory = (categoryId) => {
        setSelectedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(categoryId)) next.delete(categoryId);
            else next.add(categoryId);
            return next;
        });
    };

    
    const [expanded, setExpanded] = useState(false);

    const categories = Array.isArray(pData.categories) ? pData.categories : [];
    const visibleCategories = expanded ? categories : categories.slice(0, 7);


            {/* <div>
                    <h4 className="text-base font-semibold mb-3 pb-2">Product Categories</h4>
                    <ul
                        className={`space-y-2 transition-all duration-500 ease-in-out overflow-hidden`}
                        style={{ maxHeight: expanded ? `${categories.length * 40}px` : "280px" }} // 40px ≈ li height
                    >
                        {visibleCategories.map((category) => {
                            const checked = selectedCategories.has(category.id);
                            return (
                                <li
                                    key={category.id}
                                    className="cursor-pointer hover:text-black flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        id={`category-${category.id}`}
                                        value={category.id}
                                        checked={checked}
                                        onChange={() => {toggleCategory(category.id);}}
                                        className="cursor-pointer"
                                    />
                                    <label
                                        htmlFor={`category-${category.id}`}
                                        className="cursor-pointer"
                                    >
                                        {category.categoryName}
                                    </label>
                                </li>
                            );
                        })}
                    </ul>

                    {categories.length > 7 && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            {expanded ? (
                                <>
                                    <ChevronUp className="w-4 h-4" /> Show Less
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-4 h-4" /> Show All
                                </>
                            )}
                        </button>
                    )}

                </div> */}

