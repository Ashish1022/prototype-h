import { Categories } from "../categories"
import { SearchInput } from "./search-input"

export const SearchFilters = () => {
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: "#f5f5f5" }}>
            <SearchInput />
            <div className="hidden lg:block">
                {/* <Categories data={data} /> */}
            </div>
        </div>
    )
};

export const SearchFiltersSkeleton = () => {
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: "#f5f5f5" }}>
            <SearchInput disabled />
            <div className="hidden lg:block">
                <div className="h-11" />
            </div>
        </div>
    )
};