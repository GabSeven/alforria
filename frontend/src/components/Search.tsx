<form
  role="search"
  onSubmit={(e) => {
    e.preventDefault();
    // Sua lógica de busca
  }}
  className="caixa-busca"
>
  <label htmlFor="busca-professores" className="sr-only">
    Buscar professores, disciplinas ou cursos
  </label>
  <input
    id="busca-professores"
    type="search"
    placeholder="Buscar professores, disciplinas ou cursos..."
    // value={termoBusca}
    // onChange={(e) => setTermoBusca(e.target.value)}
  />
  <button type="submit">🔍</button>
</form>;
