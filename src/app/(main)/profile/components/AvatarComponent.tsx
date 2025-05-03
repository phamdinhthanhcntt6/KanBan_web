import { Avatar, AvatarImage } from "@/components/ui/avatar";

const AvatarComponent = () => {
  return (
    <div className="flex justify-start w-full py-3 px-3 gap-x-2 items-center text-black border-b-[1px] border-gray-200 bg-white">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
      </Avatar>
      <div className="flex flex-col justify-between">
        <div>Hello</div>
        {/* <div className="font-bold ">
          {auth.firstname} {auth.lastname}
        </div> */}
      </div>
    </div>
  );
};

export default AvatarComponent;
