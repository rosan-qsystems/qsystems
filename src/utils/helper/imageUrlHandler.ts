import placeholderImg from '../../assets/images/placeholder.jpg';
import { BASE_URL, IMAGE_URL } from '../../config/baseURL';

/**
 * Returns the correct image URL
 */
export const getImageUrl = (img: string | undefined) => {
  if (!img) return placeholderImg;
  if (img.includes('http')) return img;
  return `${IMAGE_URL}/${img}`;
};

/**
 * Returns the correct video stream URL
 */
export const getVideoStreaming = (video: string | undefined) => {
  if (!video) return '';
  if (video.includes('http')) return video;
  return `${BASE_URL}/file/stream/${video}`;
};

/**
 * Returns the correct video file URL
 */
export const getVideoUrl = (video: string | undefined) => {
  if (!video) return '';
  if (video.includes('http')) return video;
  return `${BASE_URL}/${video}`;
};

/**
 * Removes base image path to store only relative file name
 */
export const getImageLink = (img: string | undefined) => {
  if (!img) return '';
  return img.includes(IMAGE_URL) ? img.replace(IMAGE_URL, '') : img;
};

/**
 * Handles image load failure by replacing with placeholder
 */
export const onErrorImage = (event: any) => {
  event.target.src = placeholderImg;
};
