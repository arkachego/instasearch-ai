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
    
    const { price, location, ...attributes } = filters;
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
    const firstConditions: any[] = [
      { $eq: [ "$category.slug", category ] },
      { $gte: [ "$price", price[0] ] },
      { $lte: [ "$price", price[1] ] },
    ];
    if (location) {
      firstConditions.push({
        $in: [ "$location", location ]
      });
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
            $and: firstConditions,
          },
        },
      },
    ]);
    const secondConditions: any = Object.entries(attributes).map(([key, values]) => ({
      attributes: {
        $elemMatch: {
          key,
          value: { $in: values },
        },
      },
    }));
    if (secondConditions.length) {
      pipeline = pipeline.concat([
        {
          $match: {
            $and: secondConditions,
          },
        },
      ]);
    }
    pipeline = pipeline.concat([
      {
        $project: {
          category: 0,
          categoryId: 0,
          __v: 0,
        },
      },
    ]);
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
