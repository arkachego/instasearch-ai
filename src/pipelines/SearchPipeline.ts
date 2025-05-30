import { FilterType } from "@/types/FilterType";
import { PipelineStage } from "mongoose";

export const getFilterPipeline: (category: string) => PipelineStage[] = (category: string) => {
  return [
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
  ] as PipelineStage[];
};

export const getProductPipeline: (
  keyword: string,
  category: string,
  price: number[],
  location: string[],
  attributes: FilterType[]
) => PipelineStage[] = (
  keyword: string,
  category: string,
  price: number[],
  location: string[],
  attributes: FilterType[],
) => {
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
  return pipeline;
};
