import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://thatdevsherry.pk/",
  author: "Shehriyar Qureshi",
  desc: "Personal website and blog",
  title: "thatdevsherry",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/thatdevsherry",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/thatdevsherry/",
    linkTitle: `${SITE.title} on Instagram`,
    active: false,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/thatdevsherry/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:thatdevsherry@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/thatdevsherry",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@thatdevsherry",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
];
