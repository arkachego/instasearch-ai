// Models
import Listing from '@/models/listing';

// Pipelines
import { getCountPipeline } from '@/pipelines/SearchPipeline';

// Utilities
import { connect } from '@/lib/db';
import { parseUrlParams } from '../helpers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const {
      keyword,
      category,
      price,
      location,
      attributes,
    } = parseUrlParams(searchParams);

    await connect();
    const pipeline = getCountPipeline(keyword, category, price, location, attributes);
    const result = await Listing.aggregate(pipeline);

    return new Response(JSON.stringify({
      count: result[0].count,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new Response('Failed to fetch listings', { status: 500 });
  }
};
