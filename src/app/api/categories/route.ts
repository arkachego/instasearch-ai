// Models
import Category from '@/models/category';

// Utilities
import { connect } from '@/lib/db';

export async function GET(request: Request) {
  try {
    await connect();
    const categories = await Category.find({}, {
      _id: 0,
      attributeSchema: 0,
      __v: 0,
    });

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new Response('Failed to fetch listings', { status: 500 });
  }
};
