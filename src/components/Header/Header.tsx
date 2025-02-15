import s from "./Header.module.css";

type HeaderProps = {
  children: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <>
      <header className={s.headerPage}> {children}</header>
    </>
  );
}