import s from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  onClick: () => void;
};

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps) => {
  return (
    <button className={s.loadBtn} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
