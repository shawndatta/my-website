export type Project = {
  title: string;
  blurb: string;
  href: string;          // repo or live link
  tags?: string[];
  image?: string;        // e.g. "/projects/eyegaze.jpg" (place under /public/projects/)
};
