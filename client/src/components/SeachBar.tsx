type SearchBarProps = {
  search: string;
  onSearchChange: (newSearch: string) => void;
};

export default function SearchBar({ search, onSearchChange }: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher des ingredients..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
