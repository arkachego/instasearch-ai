// Models
import Category from '@/models/category';

// Pipelines
import { getFilterPipeline } from '@/pipelines/SearchPipeline';

// Utilities
import { connect } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';
    if (!category) {
      return new Response('Category is not present', { status: 400 });
    }

    await connect();
    const pipeline = getFilterPipeline(category);
    const filters = await Category.aggregate(pipeline);

    const formattedFilters = [
      ...filters[0].price,
      ...filters[0].location,
      ...filters[0].slider,
      ...filters[0].checkbox,
    ].map((filter) => {
      if (filter.type === "checkbox") {
        filter.value = [];
        filter.values = filter.values.sort();
      }
      else {
        filter.minimum =  Math.trunc(filter.minimum / 1000) * 1000;
        filter.maximum = (Math.trunc(filter.maximum / 1000) + 1) * 1000;
        filter.value = [ filter.minimum, filter.maximum ];
      }
      return filter;
    });

    return new Response(JSON.stringify(formattedFilters), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new Response('Failed to fetch listings', { status: 500 });
  }
};
