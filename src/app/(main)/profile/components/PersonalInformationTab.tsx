"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Setting5 } from "iconsax-react";

const PersonalInformationTab = () => {
  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Search"
          onChange={(val) => console.log(val.target.value)}
        />
        <Select>
          <SelectTrigger className="w-max bg-black">
            <div className="flex text-white gap-x-2 items-center px-2">
              Filter <Setting5 className="rotate-90" size={16} />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PersonalInformationTab;
