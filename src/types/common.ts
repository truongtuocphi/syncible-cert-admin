interface IChildren {
  children?: React.ReactNode;
}

interface ArticleEntry {
  title: string;
  link: string;
  bannerImg: string;
  author: Author;
}

interface Author {
  name: string;
  avatar_url: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Media {
  source_url: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  t: (key: string, params?: any) => string; // Translation function
}