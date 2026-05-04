function DynamicImage() {
  const imageUrl = "https://placehold.co/150";
  const altText = "サンプル画像";
  const baseWidth = 150;
  const isLarge = true;
  const actualWidth = isLarge ? baseWidth * 2 : baseWidth;

  return (
    <div>
      <img
        src={imageUrl}
        alt={altText}
        width={actualWidth}
        data-size={isLarge ? "large" : "small"}
      />
    </div>
  );
}

export default DynamicImage;
