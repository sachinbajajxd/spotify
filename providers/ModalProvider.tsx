"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/Modal";
import AuthModal from "@/components/AuthModal";
// import SubscribeModal from "@/components/SubscribeModal";
import UploadModal from "@/components/UploadModal";
// import { ProductWithPrice } from "@/types";

// interface ModalProviderProps {
// //   products: ProductWithPrice[];
// }

const ModalProvider = ({
//   products
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      {/*
      <SubscribeModal products={products} />
       */}
    </>
  );
}

export default ModalProvider;