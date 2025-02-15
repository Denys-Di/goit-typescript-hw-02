import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchImages } from "../../services/api";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import "./App.css";

export interface UrlItem {
  small: string;
  regular: string;
}
export interface User {
  name: string;
}
export interface Image {
  urls: UrlItem;
  likes: number;
  alt_description: string;
  user: User;
  id: number;
}

export interface ImageResult {
  results: Image[];
  total_pages: number;
}

type State = boolean;

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loader, setLoader] = useState<State>(false);
  const [messageError, setMessageError] = useState<State>(false);
  const [modalIsOpen, setIsOpen] = useState<State>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Image | null>(null);
  const [loadMore, setLoadMore] = useState<State>(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const onLoadMore = () => setPage((prev) => prev + 1);

  const fetchImagesData = async (query: string, page = 1) => {
    try {
      setLoader(true);
      setMessageError(false);
      const { results, total_pages } = await fetchImages<ImageResult>("/search/photos", {
        query,
        page,
      });

      setImages((prev) => (page === 1 ? results : [...prev, ...results]));
      setLoadMore(total_pages > page);

      if (results.length < 1) toast.error("Not found any matches");
    } catch (err) {
      setMessageError(true);
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (!search) return;
    fetchImagesData(search, page);
    if (page > 1) setTimeout(() => scrollBy({ behavior: "smooth", top: 580 }), 50);
  }, [search, page]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleClick: (e: Event, item: Partial<Image>) => void = (e, item) => {
    e.preventDefault();
    setSelectedPhoto(item as Image);
    openModal();
  };

  return (
    <>
      <Header>
        <SearchBar onSubmit={handleSubmit} />
      </Header>
      <main>
        <Loader visible={loader} />
        <ImageGallery images={images} onClick={(e, item) => handleClick(e as unknown as Event, item)} />
        <Toaster position="top-right" />
        <ImageModal
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          alt={selectedPhoto?.alt_description ?? "No description available"}
          image={selectedPhoto?.urls?.regular ?? ""}
        />
        <ErrorMessage messageError={messageError} />
        {loadMore && <LoadMoreBtn onClick={onLoadMore} />}
      </main>
    </>
  );
}

export default App;
