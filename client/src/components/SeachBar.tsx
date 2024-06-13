type SearchBarProps = {
  search: string;
  onSearchChange: (newSearch: string) => void;
};

export default function SearchBar({ search, onSearchChange }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
