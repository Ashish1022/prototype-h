import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface NavbarItem {
    href: string;
    children: React.ReactNode;
}

interface Props {
    items: NavbarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, onOpenChange, open }: Props) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="p-0 transition-none">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Menu
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-auto h-full pb-2">
                    {items.map((item) => (
                        <Link
                            href={item.href} className="w-full text-left p-4 hover:bg-black hover:text-white font-medium flex items-center text-base"
                            onClick={() => onOpenChange(false)}
                            key={item.href}
                        >
                            {item.children}
                        </Link>
                    ))}
                    <div className="border-t">
                        <Link
                            className="w-full text-left p-4 hover:bg-black hover:text-white font-medium flex items-center text-base"
                            href={"/login"}
                            onClick={() => onOpenChange(false)}
                        >
                            Login
                        </Link>
                        <Link className="w-full text-left p-4 hover:bg-black hover:text-white font-medium flex items-center text-base" href={"/signup"} onClick={() => onOpenChange(false)}>
                            Start Selling
                        </Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}