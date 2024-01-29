export const translateKeyToCN = (
  map: Partial<Record<string, string>>,
  updatedStrategyList: string[]
) =>
  updatedStrategyList.map((item) =>
    [map[item.split('_')[0]], ...item.split('_').slice(1)].join('_')
  )
