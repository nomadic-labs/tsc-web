export const MAXIMUM_IMAGE_SIZE = 2 * 1024 * 1024; //less than 2MB in bytes

export const NOTIFICATION_MESSAGES = {
  'contact-form-success': "Thanks for your message, we'll get back to you soon!",
  'project-form-success': "Thanks for submitting your project! We will review it before publishing it on the website."
}

export const CONTENT_MAP = {
  header: { type: "header", content: { text: "Header" } },
  paragraph: { type: "paragraph", content: { text: "Paragraph" } },
  image: { type: "image" },
  embeddedIframe: { type: "embeddedIframe" },
}

export const PAGE_TYPES = [
  { label: "Recipe Page", value: { type: "recipe_page", template: "recipe-page.js" } },
];

export const DEFAULT_COMPONENT_CONTENT = {
  "testimonials": {
    "testimonial-quote": { "text": "Quote" },
    "testimonial-name": { "text": "Name" },
    "testimonial-title": { "text": "Title" }
  },
  "partner-logos": {
    "partner-image": { "imageSrc": "https://www.nomadiclabs.ca/img/logo-03.png", "caption": "" },
  },
  "cafe-photos": {
    "cafe-image": { "imageSrc": "https://www.nomadiclabs.ca/img/logo-03.png", "caption": "" },
  },
  "board-members": {
    "board-member-bio": { "text": "Short bio" },
    "board-member-name": { "text": "Name" },
    "board-member-title": { "text": "Board Position" }
  },
}