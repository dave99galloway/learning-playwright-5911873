export const generateProductResponse = () => {
  return {
    current_page: 1,
    data: [
      {
        id: "01",
        name: "Mocked Path Pliers",
        description:
          "These pliers are perfect for the happy path. They are made of steel and have a rubber grip.",
        price: 11.99,
        is_location_offer: false,
        is_rental: false,
        in_stock: true,
        brand: {
          id: "01",
          name: "Playwright",
          slug: "playwright",
        },
        category: {
          id: "01",
          name: "Tools",
          slug: "tools",
        },
        product_image: {
          id: "01",
          file_name: "pliers.jpg",
          by_name: "Pliers",
          by_url: "http://example.com/pliers.jpg",
          title: "Pliers",
          alt: "Pliers",
        },
      },
    ],
    from: 1,
    last_page: 1,
    per_page: 10,
    to: 1,
    total: 1,
  };
};
