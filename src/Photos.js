// export const photos = [
//   {
//     id: 42,
//     eventId: 42,
//     src: "http://res.cloudinary.com/doolally/image/upload/v1672117076/events/gtxxjbels41tcpvddc38.png",
//     attachmentType: 1,
//     lowResImage: null,
//   },
//   {
//     src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
//     width: 1,
//     height: 1,
//   },
//   {
//     src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
//     width: 3,
//     height: 4,
//   },
//   {
//     src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
//     width: 3,
//     height: 4,
//   },
//   {
//     src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
//     width: 3,
//     height: 4,
//   },
//   {
//     src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
//     width: 4,
//     height: 3,
//   },
//   {
//     src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
//     width: 3,
//     height: 4,
//   },
//   {
//     src: "https://source.unsplash.com/PpOHJezOalU/800x599",
//     width: 4,
//     height: 3,
//   },
//   {
//     src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
//     width: 4,
//     height: 3,
//   },
// ];

import React, { useEffect, useState, useCallback } from "react";
import { apiBaseUrl } from "./config/constant";
import { makeStyles } from "@material-ui/core/styles";

import { showCorrectImage, numberWithCommas } from "./utils/Common";
import axios from "axios";

import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const Photos = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const [galleryPic, setGalleryPic] = useState([]);
  const [galleryPic2, setGalleryPic2] = useState([]);
  useEffect(() => {
    const getDataa = async () => {
      let result = await axios.get(apiBaseUrl + "events/getEventImage");

      if (result) {
        setGalleryPic(
          ...galleryPic,
          result.data.response.result.eventimagelist
        );
      }
    };
    getDataa();
  }, []);

  const fun = (e) => {
    setGalleryPic2(galleryPic[e].imageList);
    setViewerIsOpen(true);
  };
  const photos = galleryPic2;

  return (
    <>
      {viewerIsOpen == true ? (
        <div className="row">
          <div className="col-6">
            <Gallery photos={photos} />
          </div>
        </div>
      ) : (
        ""
      )}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                // srcset: x.srcSet,
                // caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <div className="row g-4">
        {galleryPic.map((item, index) => (
          <div className="col-6">
            <div className="d_product_box" key={index}>
              <figure className="d_product_img mb-0" onClick={() => fun(index)}>
                <img src={showCorrectImage(item.filename)} alt="" />
              </figure>

              {/* <a className="d_overlay">
                            <p>Explore more</p>
                          </a> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Photos;
