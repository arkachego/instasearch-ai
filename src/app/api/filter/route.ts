// Models
import Category from '@/models/category';

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
    const filters = await Category.aggregate([
      {
        $match: {
          $expr: {
            $eq: [ '$slug', category ]
          },
        },
      },
      {
        $lookup: {
          from: 'listings',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'listings',
        },
      },
      {
        $unwind: '$attributeSchema',
      },
      {
        $unwind: '$listings',
      },
      {
        $unwind: '$listings.attributes',
      },
      {
        $match: {
          $expr: {
            $eq: [ '$attributeSchema.name', '$listings.attributes.key' ],
          },
        },
      },
      {
        $facet: {
          location: [
            {
              $group: {
                _id: null,
                values: {
                  $addToSet: '$listings.location',
                },
              },
            },
            {
              $addFields: {
                name: 'location',
                type: 'checkbox',
                label: 'Location',
              }
            },
            {
              $project: {
                _id: 0,
              },
            },
          ],
          price: [
            {
              $group: {
                _id: null,
                minimum: {
                  $min: '$listings.price',
                },
                maximum: {
                  $max: '$listings.price',
                },
              },
            },
            {
              $addFields: {
                name: 'price',
                type: 'slider',
                label: 'Price Range',
              }
            },
            {
              $project: {
                _id: 0,
              },
            },
          ],
          checkbox: [
            {
              $match: {
                $expr: {
                  $eq: [ '$attributeSchema.type', 'checkbox' ],
                },
              },
            },
            {
              $group: {
                _id: '$attributeSchema.name',
                name: {
                  $first: '$attributeSchema.name',
                },
                type: {
                  $first: '$attributeSchema.type',
                },
                label: {
                  $first: '$attributeSchema.label',
                },
                values: {
                  $addToSet: '$listings.attributes.value',
                },
              },
            },
            {
              $sort: {
                label: 1,
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
          ],
          slider: [
            {
              $match: {
                $expr: {
                  $eq: [ '$attributeSchema.type', 'slider' ],
                },
              },
            },
            {
              $group: {
                _id: '$attributeSchema.name',
                name: {
                  $first: '$attributeSchema.name',
                },
                type: {
                  $first: '$attributeSchema.type',
                },
                label: {
                  $first: '$attributeSchema.label',
                },
                minimum: {
                  $min: '$listings.attributes.value',
                },
                maximum: {
                  $max: '$listings.attributes.value',
                },
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
          ],
        },
      },
    ]);

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
