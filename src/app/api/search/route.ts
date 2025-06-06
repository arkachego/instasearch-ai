// Models
import Listing from '@/models/listing';

// Pipelines
import { getListingPipeline } from '@/pipelines/SearchPipeline';

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
      page,
      item,
    } = parseUrlParams(searchParams);

    await connect();
    const pipeline = getListingPipeline(keyword, category, price, location, attributes, page, item);
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
