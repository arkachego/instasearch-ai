export const parseUrlParams = (params: URLSearchParams) => {
  const keyword = params.get('q') || '';
  const category = params.get('category') || '';
  const filters = JSON.parse(params.get('filters') || '{}');
  const page = parseInt(params.get('page') || '1');
  const item = parseInt(params.get('item') || '20');
  const { price, location, ...attributes } = filters;
  return {
    keyword,
    category,
    price,
    location,
    attributes,
    page,
    item,
  };
};
