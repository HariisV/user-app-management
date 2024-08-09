import { SERVER_URL } from '@/const';

export const imageLink = (image: string) => {
  if (!image) return '';
  if (image.includes('http')) return image;
  return `${SERVER_URL}/${image}`;
};
