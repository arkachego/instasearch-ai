// Models
import Listing from '@/models/listing';

// Utilities
import { connect } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const filters = JSON.parse(searchParams.get('filters') || '{}');

    console.log('Keyword:', keyword);
    console.log('Category:', category);
    console.log('Filters:', filters);

    await connect();

    let pipeline: any[] = [];
    if (keyword) {
      pipeline = pipeline.concat([
        {
          $match: {
            $text: { $search: keyword }
          }
        },
        {
          $addFields: {
            score: { $meta: 'textScore' }
          }
        },
      ]);
    }
    pipeline = pipeline.concat([
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [ "$category.slug", category ] },
            ],
          },
        },
      },
    ]);
    // if (Object.keys(filters).length > 0) {
    //   const conditions: any = {};
      
    //   pipeline = pipeline.concat([
    //     {
    //       $match: conditions,
    //     },
    //   ]);
    // }
    pipeline = pipeline.concat([
      {
        $project: {
          categoryId: 0,
          __v: 0,
        },
      },
    ]);
    console.log(pipeline);
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
