const webflowCollectionPresets = [
  {
    title: "Blog Posts",
    collection: {
      name: "Blog Posts",
      pluralName: "Blog Posts",
      singularName: "Blog Post",
      slug: "post",
      fields: [
        { name: "Post Body", type: "RichText" },
        {
          name: "Post Summary",
          type: "PlainText",
          helpText: "A summary of the blog post that appears on blog post grid",
          validations: { singleLine: false },
        },
        { name: "Main Image", type: "ImageRef" },
        {
          name: "Thumbnail image",
          type: "ImageRef",
          helpText:
            "Smaller version of main image that is used on blog post grid",
        },
        { name: "Featured?", type: "Bool" },
        { name: "Color", type: "Color" },
      ],
    },
  },
  {
    title: "Authors",
    collection: {
      name: "Authors",
      pluralName: "Authors",
      singularName: "Author",
      slug: "author",
      fields: [
        { name: "Bio", type: "RichText" },
        {
          name: "Bio Summary",
          type: "PlainText",
          validations: { singleLine: false },
        },
        { name: "Picture", type: "ImageRef" },
        { name: "Email", type: "Email" },
        { name: "Twitter Profile Link", type: "Link" },
        { name: "Facebook Profile Link", type: "Link" },
      ],
    },
  },
  {
    title: "Categories",
    collection: {
      name: "Categories",
      pluralName: "Categories",
      singularName: "Category",
      slug: "category",
      fields: [
        {
          name: "Description",
          type: "PlainText",
          validations: { singleLine: false },
        },
        { name: "Icon", type: "ImageRef" },
        { name: "Color", type: "Color" },
      ],
    },
  },
  {
    title: "Projects",
    collection: {
      name: "Projects",
      pluralName: "Projects",
      singularName: "Project",
      slug: "project",
      fields: [
        { name: "Project Details", type: "RichText" },
        {
          name: "Project Summary",
          type: "PlainText",
          validations: { singleLine: false },
        },
        {
          name: "Main Project Image",
          type: "ImageRef",
          helpText: "Used on project list grid",
        },
        {
          name: "Client",
          type: "PlainText",
          validations: { singleLine: true },
        },
        { name: "Client Logo", type: "ImageRef" },
        { name: "Services Rendered", type: "RichText" },
        { name: "Featured Project?", type: "Bool" },
        { name: "Color", type: "Color" },
      ],
    },
  },
  {
    title: "Clients",
    collection: {
      name: "Clients",
      pluralName: "Clients",
      singularName: "Client",
      slug: "client",
      fields: [
        { name: "Client Logo", type: "ImageRef" },
        { name: "Client Information", type: "RichText" },
        {
          name: "Client Information Summary",
          type: "PlainText",
          validations: { singleLine: false },
        },
        { name: "Website Link", type: "Link" },
        { name: "Twitter Link", type: "Link" },
        { name: "Facebook Link", type: "Link" },
        { name: "Email", type: "Email" },
        { name: "Phone Number", type: "Phone" },
      ],
    },
  },
  {
    title: "Team Members",
    collection: {
      name: "Team Members",
      pluralName: "Team Members",
      singularName: "Team Member",
      slug: "team",
      fields: [
        { name: "Profile Picture", type: "ImageRef" },
        { name: "Bio", type: "RichText" },
        {
          name: "Bio Summary",
          type: "PlainText",
          validations: { singleLine: true },
        },
        {
          name: "Job Title",
          type: "PlainText",
          validations: { singleLine: true },
        },
        { name: "Email", type: "Email" },
        { name: "Phone Number", type: "Phone" },
        { name: "Twitter Link", type: "Link" },
        { name: "Facebook Link", type: "Link" },
      ],
    },
  },
  {
    title: "Listings",
    collection: {
      name: "Listings",
      pluralName: "Listings",
      singularName: "Listing",
      slug: "listing",
      fields: [
        // {name: "Location", type: "Map"},
        {
          name: "Listing Type",
          type: "PlainText",
          helpText: "Rent or Sale?",
          validations: { singleLine: true },
        },
        { name: "Rent or Sale Price", type: "Number" },
        { name: "Available?", type: "Bool" },
        { name: "Number of Rooms", type: "Number" },
        { name: "Number of Baths", type: "Number" },
        { name: "Square Feet", type: "Number" },
        { name: "Floorplan", type: "ImageRef" },
        { name: "Property Description", type: "RichText" },
        {
          name: "Short Description",
          type: "PlainText",
          validations: { singleLine: false },
        },
        { name: "Image 1", type: "ImageRef" },
        { name: "Image 2", type: "ImageRef" },
        { name: "Image 3", type: "ImageRef" },
        {
          name: "Agent Contact Info",
          type: "PlainText",
          validations: { singleLine: true },
        }, // email
      ],
    },
  },
  {
    title: "Events",
    collection: {
      name: "Events",
      pluralName: "Events",
      singularName: "Event",
      slug: "event",
      fields: [
        { name: "Start Date/Time", type: "Date" }, // time
        { name: "End Date/Time", type: "Date" }, // time
        {
          name: "Location",
          type: "PlainText",
          validations: { singleLine: true },
        },
        { name: "Description", type: "RichText" },
        {
          name: "Short Description",
          type: "PlainText",
          helpText: "Used on event lists",
          validations: { singleLine: true },
        },
        { name: "Image", type: "ImageRef" },
        { name: "RSVP Link", type: "Link" },
      ],
    },
  },
  {
    title: "Menu Items",
    collection: {
      name: "Menu Items",
      pluralName: "Menu Items",
      singularName: "Menu Item",
      slug: "menu",
      fields: [
        {
          name: "Ingredients",
          type: "PlainText",
          validations: { singleLine: true },
        },
        { name: "Image", type: "ImageRef" },
        {
          name: "Thumbnail image",
          type: "ImageRef",
          helpText: "Smaller version of main image that is used in grid views",
        },
        { name: "Calories", type: "Number" },
        { name: "Price", type: "Number" },
        { name: "Spicy?", type: "Bool" },
        { name: "Vegetarian?", type: "Bool" },
        { name: "Vegan?", type: "Bool" },
      ],
    },
  },
  {
    title: "Songs",
    collection: {
      name: "Songs",
      pluralName: "Songs",
      singularName: "Song",
      slug: "song",
      fields: [
        { name: "Album", type: "PlainText", validations: { singleLine: true } },
        { name: "Album Image", type: "ImageRef" },
        { name: "Song Description", type: "RichText" },
        { name: "Lyrics", type: "RichText" },
        { name: "Video", type: "Video" },
        { name: "Date Recorded", type: "Date" },
      ],
    },
  },
  {
    title: "Shows",
    collection: {
      name: "Shows",
      pluralName: "Shows",
      singularName: "Show",
      slug: "show",
      fields: [
        { name: "Date and Time", type: "Date" }, // time
        { name: "City", type: "PlainText", validations: { singleLine: true } },
        {
          name: "Country",
          type: "PlainText",
          validations: { singleLine: true },
        },
        {
          name: "Location",
          type: "PlainText",
          validations: { singleLine: true },
        },
        { name: "Tickets Link", type: "Link" },
        { name: "Venue", type: "PlainText", validations: { singleLine: true } },
        { name: "Description", type: "RichText" },
        {
          name: "Short Description",
          type: "PlainText",
          validations: { singleLine: false },
        },
        { name: "Image", type: "ImageRef" },
      ],
    },
  },
  {
    title: "Recipes",
    collection: {
      name: "Recipes",
      pluralName: "Recipes",
      singularName: "Recipe",
      slug: "recipe",
      fields: [
        { name: "Ingredients", type: "RichText" },
        { name: "Directions", type: "RichText" },
        { name: "Recipe History", type: "RichText" },
        { name: "Main Image", type: "ImageRef" },
        {
          name: "Thumbnail Image",
          type: "ImageRef",
          helpText: "Used on Recipe list grid",
        },
        { name: "Featured Recipe?", type: "Bool" },
        {
          name: "Color",
          type: "Color",
          helpText:
            "This color will be used for some text and buttons on the Recipe page",
        },
      ],
    },
  },
];

const collectionPresets = webflowCollectionPresets.map((preset) => ({
  ...preset, // Spread the rest of the preset properties
  collection: {
    ...preset.collection, // Spread the existing collection properties
    fields: preset.collection.fields.map((field) => {
      // Directly modify and return the new field object
      const { name, validations, ...rest } = field; // Remove name and validations
      return {
        ...rest, // Spread the remaining properties
        displayName: field.name, // Add new displayName property using the original name
      };
    }),
  },
}));

export default collectionPresets;
