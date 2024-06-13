type SearchBarProps = {
  search: string;
  onSearchChange: (newSearch: string) => void;
  onSearchSubmit: () => void;
};

export default function SearchBar({ search, onSearchChange, onSearchSubmit }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit();
  };
  return (
    <form className='d-flex' onSubmit={handleSubmit}>
      <input
        className='form-control me-2'
        type='search'
        placeholder='Rechercher des ingredients...'
        aria-label='Rechercher'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </form>
  );
}
