export enum SortOption {
  NAME_AZ = 'az',
  NAME_ZA = 'za',
  PRICE_LOW_HIGH = 'lohi',
  PRICE_HIGH_LOW = 'hilo',
}

export const SortOptionLabel: Record<SortOption, string> = {
  [SortOption.NAME_AZ]: 'Name (A to Z)',
  [SortOption.NAME_ZA]: 'Name (Z to A)',
  [SortOption.PRICE_LOW_HIGH]: 'Price (low to high)',
  [SortOption.PRICE_HIGH_LOW]: 'Price (high to low)',
};
