import { photos } from "./photos";

const PhotoGallery = () => {
  return (
    <div className="container mx-auto mb-20">
      <h1 className="font-poppins font-semibold md:text-4xl mb-10 text-center">
        Our Fitness Community
      </h1>
      {/* First Row - 5 Photos */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
        {photos.slice(0, 5).map((photo, index) => (
          <img
            key={index}
            src={photo.src}
            // alt={photo.alt}
            className={`w-full h-auto ${
              index === 0
                ? "rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none"
                : "" /* First image gets top-left rounded */
            } ${
              index === 4
                ? "md:rounded-tr-2xl"
                : "" /* Last image gets top-right rounded */
            }
            `}
          />
        ))}
      </div>

      {/* Second Row - 4 Photos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
        {photos.slice(5, 9).map((photo, index) => (
          <img
            key={index}
            src={photo.src}
            // alt={photo.alt}
            className="w-full h-auto"
          />
        ))}
      </div>

      {/* Third Row - 1 Photo */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        <img
          src={photos[9].src}
          //   alt={photos[9].alt}
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Fourth Row - 3 Photos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {photos.slice(10, 13).map((photo, index) => (
          <img
            key={index}
            src={photo.src}
            // alt={photo.alt}
            className={`w-full h-auto ${
              index === 0
                ? "md:rounded-bl-2xl"
                : "" /* First image gets bottom-left rounded */
            } ${
              index === 2
                ? "rounded-br-2xl rounded-bl-2xl md:rounded-bl-none"
                : "" /* Last image gets bottom-right rounded */
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
