"use client";

interface Props {
  images: string[];
}

const ImageItemComponent = (props: Props) => {
  const { images } = props;

  return (
    <div className="flex w-full justify-between mt-4">
      {images.map((item: string) => (
        <img src={item} alt="" width={90} height={120} />
      ))}
    </div>
  );
};

export default ImageItemComponent;
