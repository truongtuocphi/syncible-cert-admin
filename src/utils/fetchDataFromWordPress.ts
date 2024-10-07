import axios from 'axios';

const WP_BASE_URL = 'https://admin.syncible.io/wp-json/wp/v2';

// 1. Fetch posts with pagination
export const fetchPaginatedDataFromWP = async (url: string) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const totalPages = response.headers['x-wp-totalpages'];


    return { data, totalPages };
  } catch (error) {
    console.error('Error while fetching data:', error);
    throw error;
  }
};

// 2. Fetch posts without any optional parameters
export const fetchDataFromWP = async (url: string) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error while fetching data:', error);
    throw error;
  }
}

// 3. Fetch categories
export const fetchCategories = async () => {
  const url = `${WP_BASE_URL}/categories`;
  try {
    const categories = await fetchPaginatedDataFromWP(url);
    return categories;
  } catch (error) {
    console.error('Error while fetching categories:', error);
    throw error;
  }
};

// 4. Fetch posts with pagination and optional category filter
export const fetchPosts = async (page: number, postsPerPage: number, categoryId: number | null, tagId: number) => {
  let url = `${WP_BASE_URL}/posts?page=${page}&per_page=${postsPerPage}&tags=${tagId}`;
  
  // If categoryId is provided, add the filter
  if (categoryId) {
    url += `&categories=${categoryId}`;
  }

  try {
    const posts = await fetchPaginatedDataFromWP(url);
    return posts;
  } catch (error) {
    console.error('Error while fetching posts:', error);
    throw error;
  }
};

// 5. Fetch post by slug
export const fetchPostBySlug = async (slug: string) => {
  const url = `${WP_BASE_URL}/posts?slug=${slug}&_embed`; // using embed to get author, media, category details 
  try {
    const post = await fetchDataFromWP(url);
    return post.length > 0 ? post[0] : null; // Return the first post that matches the slug or null if not found
  } catch (error) {
    console.error('Error while fetching post by slug:', error);
    throw error;
  }
};

// 6. Fetch media (featured image or media by ID)
export const fetchMediaById = async (mediaId: number) => {
  const url = `${WP_BASE_URL}/media/${mediaId}`;
  try {
    const media = await fetchDataFromWP(url);
    return media;
  } catch (error) {
    console.error('Error while fetching media:', error);
    throw error;
  }
};

// 7. Fetch author details by ID
export const fetchAuthorById = async (authorId: number) => {
  const url = `${WP_BASE_URL}/users/${authorId}`;
  try {
    const author = await fetchDataFromWP(url);
    return author;
  } catch (error) {
    console.error('Error while fetching author details:', error);
    throw error;
  }
};