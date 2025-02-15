import { Image, UrlItem, User } from "../App/App";
import s from "./ImageCard.module.css";
import { FcLike } from "react-icons/fc";

export interface ImageCardProps {
  onClick: (e: Event, image: Partial<Image>) => void;
  urls: UrlItem;
  likes: number;
  alt_description: string;
  user: User;
}

export default function ImageCard({
  onClick,
  urls,
  likes,
  alt_description,
  user,
}: ImageCardProps) {
  return (
    <>
      <img
        src={urls.small}
        alt={alt_description}
        width={300}
        className={s.imageCard}
        onClick={(e: any) => onClick(e, { urls, alt_description })}
      />
      <div className={s.discrBox}>
        <div className={s.author}>
          <p>
            Author:{" "}
            <span className={s.userName}>{user.name.toLowerCase()}</span>
          </p>
        </div>
        <div className={s.likes}>
          <FcLike />
          <p>{likes}</p>
        </div>
      </div>
    </>
  );
}