

const extractRealImageUrl = (photoUrl) => {
  try {
    const url = new URL(photoUrl);
    const realImgUrl = url.searchParams.get("imgurl");
    return realImgUrl ? decodeURIComponent(realImgUrl) : photoUrl;
  } catch (err) {
    console.error("Invalid URL:", photoUrl,err.message);
    return photoUrl;
  }
};

const RealImage = ({ src, alt = "image", ...props }) => {
  const cleanUrl = extractRealImageUrl(src);

  return <img src={cleanUrl} alt={alt} {...props} />;
};

export default RealImage;