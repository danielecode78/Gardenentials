import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function CarouselImages({ imagesArray = [] }) {
  if (!imagesArray || imagesArray.length === 0) {
    return (
      <Typography variant="body" sx={{ pl: 2, pb: 2, opacity: 0.4 }}>
        Nessuna immagine presente.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        p: 2,
        "& .swiper": {
          width: "100% !important",
          maxWidth: "100% !important",
        },
        "& .swiper-wrapper": {
          width: "100% !important",
        },
        "& .swiper-slide": {
          width: "100% !important",
          display: "flex !important",
          justifyContent: "center !important",
          alignItems: "center !important",
          height: "500px",
        },
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        slidesPerView={1}
        spaceBetween={0}
      >
        {imagesArray.map((src, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={src}
              alt={`Slide ${index + 1}`}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                objectFit: "contain",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default CarouselImages;
