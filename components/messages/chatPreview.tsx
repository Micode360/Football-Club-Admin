interface chatPreviewProperties {
  name: string;
  image: string;
  text: string;
  time: string;
  searchValue: string;
}

export default function ChatPreviewContainer({
  name,
  image,
  text,
  time,
  searchValue,
}: chatPreviewProperties) {
  return (
    <div className="flex items-start justify-between cursor-pointer border-b py-3 px-4">
      <div className="flex items-start cursor-pointer">
        {true ? (
          <img
            src={image}
            className="rounded-full object-cover object-center w-12 h-12"
            alt="profile photo"
          />
        ) : (
          <div className="w-10 h-10 bg-red-500 flex items-center justify-center mr-4 text-white rounded-full">
            K
          </div>
        )}

        <div className="mx-2">
          <h4 className="lg-[text-[1rem]] font-[600] mb-1">{name}</h4>
          <p className="text-xs">{text.slice(0, 15) + " ..."}</p>
        </div>
      </div>
      <div className="flex flex-col items-end h-full">
        <p className="mb-2 text-xs">{time}</p>
        <span className="py-1 px-2 text-xs bg-custom_orange rounded-full text-white">
          14
        </span>
      </div>
    </div>
  );
}
