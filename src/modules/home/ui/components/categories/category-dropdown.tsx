"use client"

import { useDropdownPosition } from "@/hooks/use-dropdown-position";
import { useRef, useState } from "react";

export const CategoryDropdown = ({ category, isActive, isNavigationHovered }: { category: any; isActive: boolean; isNavigationHovered: boolean }) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { getDropdownPosition } = useDropdownPosition(dropdownRef);

    const onMouseEnter = () => {
        if (category.subcategories) setIsOpen(true);
    };

    const onMouseLeave = () => setIsOpen(false);

    const dropdownPosition = getDropdownPosition();

    return (
        <div>

        </div>
    )
}