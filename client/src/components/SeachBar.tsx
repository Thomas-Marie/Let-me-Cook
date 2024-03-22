import {Input} from "./forms/Input";

type SearchBarProps = {
    search: string;
    onSearchChange: (newSearch: string) => void
} 

export default function SearchBar({search, onSearchChange}: SearchBarProps) {
    return <div>
        <div className="mb-3">
            <Input placeholder="Rechercher un ingrédient.." value={search} onChange={onSearchChange}/>
        </div>
    </div>
}