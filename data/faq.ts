export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faq: readonly FaqItem[] = [
  {
    id: "reservation",
    question: "Do I need a reservation?",
    answer:
      "Walk-ins are welcome, but we recommend booking a table during peak dinner hours, especially on weekends.",
  },
  {
    id: "vegetarian",
    question: "Do you have vegetarian and vegan options?",
    answer:
      "Yes. Most of our curries can be prepared vegetarian, and several dishes are vegan by default. Please tell our staff about any dietary requirements.",
  },
  {
    id: "spice",
    question: "How spicy is the food? Can I adjust spice levels?",
    answer:
      "Every dish is prepared to a medium heat by default. We are happy to make it milder or hotter on request.",
  },
  {
    id: "hours",
    question: "What are your opening hours?",
    answer: "We are open daily from 11:00 to 23:00.",
  },
  {
    id: "location",
    question: "Where exactly are you located?",
    answer:
      "Our address and directions are on the Location page. You can open Google Maps directly from there.",
  },
  {
    id: "delivery",
    question: "Do you offer delivery?",
    answer:
      "Yes, we are available on major delivery platforms. Message us on WhatsApp and we will point you to the right one.",
  },
] as const;
