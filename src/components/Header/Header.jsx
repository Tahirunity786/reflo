import Head from "next/head";

const Header = ({ title, description, imageUrl, pageUrl }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="DoorBix, doorbix, door bix, online shopping, ecommerce store, buy online, best deals, fashion, electronics, accessories, home essentials, online marketplace, shop now, secure checkout, wishlist, collections, trending products"
      />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <meta name="msvalidate.01" content="FC9E846E102FF0479D6A1652561543EA" />
      <link rel="icon" href="/favicon-32x32.png" />
    </>
  );
};

export default Header;

