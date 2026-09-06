import { dummyPosts } from './dummyData';

export const getPosts = () => {
  const saved = localStorage.getItem('semicolon_posts');
  if (saved) {
    return JSON.parse(saved);
  }
  // שמירה ראשונית של נתוני הדמה אם הזיכרון ריק
  localStorage.setItem('semicolon_posts', JSON.stringify(dummyPosts));
  return dummyPosts;
};

export const saveNewPost = (newPost) => {
  const currentPosts = getPosts();
  const updatedPosts = [{ id: Date.now(), ...newPost }, ...currentPosts];
  localStorage.setItem('semicolon_posts', JSON.stringify(updatedPosts));
  return updatedPosts;
};