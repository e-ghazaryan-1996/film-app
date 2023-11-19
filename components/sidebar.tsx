import { sidebarLinks } from "@/utils/constant";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="fixed bg-dark-black w-[157px] hover:absolute hover:inset-0 hover:z-10 hover:w-full h-screen flex justify-center items-center group/item hover:justify-start hover:pl-[38px] hover:hover-gradient hover:opacity-80">
      <div className="flex flex-col gap-9">
        {sidebarLinks.map((item) => {
          return (
            <button
              key={item.label}
              className="rounded-full w-[82px] h-[82px] group-hover/item:w-[312px] group/button group-hover/item:h-[72px] group-hover/item:pl-6 hover:rounded-xl group-hover/item:justify-start  group-hover/item:gap-[52px] flex justify-center items-center hover:bg-dark-slate-blue"
            >
              <Image
                alt="link-image"
                src={item.img}
                priority
                width={27}
                height={27}
                className="w-[27px] h-[27px] object-contain"
              />
              <p className="group/edit hidden text-4xl font-normal group-hover/item:block group-hover/button:font-bold text-light-gray">
                {item.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
