import { Image } from "../App/App";
import ImageCard, { ImageCardProps } from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";



function ImageGallery({ images, onClick }:{images:Image[], onClick:ImageCardProps["onClick"]}) {
  return (
    <ul className={s.galleryList}>
      {images.map(({ id, ...image }) => (
        <li className={s.imageItem} key={id}>
          <ImageCard {...image} onClick={onClick} />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;