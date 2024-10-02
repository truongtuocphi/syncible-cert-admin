interface IChildren {
  children?: React.ReactNode;
}

interface ArticleEntry {
  title: string;
  link: string;
  bannerImg: string;
  author: {
    name: string;
    avatar: string;
    position: string;
  };
}

interface Author {
  name: string;
  avatar: string;
  position: string;
}

interface BlogPost {
  title: { rendered: string };
  content: { rendered: string };
  author: number;
  categories: number[];
  date: string;
  featured_media?: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}