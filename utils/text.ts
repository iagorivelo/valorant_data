// Helpers de busca textual, insensíveis a acentos e maiúsculas.

/** Remove acentos e normaliza para minúsculas. */
export const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/**
 * Retorna true se `normalizedQuery` (já normalizada) for vazia ou casar com
 * algum dos `fields`. Campos nulos/indefinidos são ignorados.
 */
export const matchesQuery = (
  normalizedQuery: string,
  ...fields: (string | null | undefined)[]
) =>
  normalizedQuery.length === 0 ||
  fields.some((f) => f && normalize(f).includes(normalizedQuery));
