// Models
import Listing from '@/models/listing';

// Pipelines
import { getProductPipeline } from '@/pipelines/SearchPipeline';

// Utilities
import { connect } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const filters = JSON.parse(searchParams.get('filters') || '{}');
    const { price, location, ...attributes } = filters;

    await connect();
    const pipeline = getProductPipeline(keyword, category, price, location, attributes);
    const listings = await Listing.aggregate(pipeline);

    return new Response(JSON.stringify(listings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new Response('Failed to fetch listings', { status: 500 });
  }
};
