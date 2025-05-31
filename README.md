# InstaSearch AI

This [Next.js](https://nextjs.org/) module is the deliverable of the assignment provided by [Instinctive Studio](https://www.instinctive.studio/) for their **Full Stack MERN Developer** role. The answers for the descriptive questions are at the bottom of this documentation.

### Configuration Steps

1. Clone the repository.

```
git clone git@github.com:arkachego/instasearch-ai.git
```

2. Get inside the module folder.

```
cd instasearch-ai
```

3. Install the dependencies.

```
npm install
```

4. Launch the MongoDB docker container.

```
npm run db:up
```

> This step assumes that, the Docker Daemon service is up and running in the host system.

5. Seed the dummy data into the database.

```
npm run db:seed
```

6. Finally launch the module.

```
npm run dev
```

7. Press `Ctrl/Cmd + X` to stop the module.

8. Stop the MongoDB docker container.

```
npm run db:down
```

### Descriptive Answers

#### Answer (1.a)

I shall be using **Anthropic's Claude 3 Sonnet Generative AI** model behind analysing the search string provided by the users. As I shall be deploying this app in **AWS Amplify**, connecting with the **Amazon Bedrock Client Runtime** will be fairly easy using the [@aws-sdk/client-bedrock-runtime](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-bedrock-runtime/) package.

The most important part is to develop the prompt for the model. Before starting the development of the coding assignment, I was exploring the possibilities embedding the aforementioned **Generative AI** model into the application stack. I was using **Amazon Bedrock Single Prompt** window to test the same with the following parameters:

##### System Prompts

```
You are a MongoDB query generator. Your only task is to extract search filters and category from a user’s natural language query and return a JSON object in the format below.

Format: {
  "category": "string",
  "filters": {
    "price": {
      "$lt" | "$lte" | "$gt" | "$gte" | "$eq": number
    }
  }
}

Please ingest the MongoDB data models before providing the output.

Category: {
  name: { type: String, required: true },
  slug: { type: String, required: true },
  attributeSchema: [
    {
      name: { type: String, required: true },
      label: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
}

Listing: {
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  thumbnail: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  attributes: [
    {
      key: { type: String, required: true },
      value: { type: Schema.Types.Mixed },
    },
  ],
}

Never provide any explanations, markdown, or repeated text. Only return the raw JSON object.

```

##### Other Parameters


| Parameter      | Value |
| -------------- | ----- |
| Temperature    | `0.1` |
| Top P          | `0.9` |
| Top K          | `250` |
| Maximum Length | `500` |
| Stop Sequences | `}`   |

#### Answer (1.b)

When the system cannot confidently classify part of the query (e.g. ambiguous attribute or missing value), I implement a fallback that:
- Returns a partial filter with only the confidently extracted fields.
- Flags uncertain parts in a `missing` or `ambiguous` array in the response.
- Prompts the user for clarification via the UI (“Did you mean...?”) or suggests some popular filters.
- Logs ambiguous queries for continuous improvement and prompt tuning.

This ensures graceful degradation and a feedback loop for improving intent extraction.

#### Answer (2.a)

I would adopt a **document-oriented (NoSQL, e.g., MongoDB)** model with a flexible `attributes` array for category-specific fields. Each listing stores its custom attributes as key-value pairs, e.g.:

```js
attributes: [
  { key: "Size", value: 9 },
  { key: "Color", value: "Red" },
  { key: "Energy Rating", value: "5 Star" }
]
```

This approach allows merchandisers to add new attributes (like "Energy Rating" for ACs) without schema migrations or downtime. The `attributeSchema` in the Category model defines which attributes are valid for each category, supporting validation and UI generation.

#### Answer (2.b)

This document model supports fast multi-attribute filtering and existence queries by:
- Creating **compound indexes** on `attributes.key` and `attributes.value` for commonly filtered attributes.
- Using MongoDB’s `$elemMatch` and `$exists` operators to efficiently filter listings with specific attribute values or check for the presence of an attribute.
- Avoiding costly joins or schema changes, enabling rapid iteration and scalability as new attributes are introduced.

#### Answer (3.a) (Optional)

**Dynamic Facet API Contract Example:**

```http
GET /api/search/facets?category=shoes&filters[price][$lt]=2000&filters[color]=red
```

**Response:**
```json
{
  "facets": [
    {
      "key": "brand",
      "label": "Brand",
      "type": "string",
      "options": [
        { "value": "Nike", "count": 12 },
        { "value": "Adidas", "count": 8 }
      ]
    },
    {
      "key": "size",
      "label": "Size",
      "type": "number",
      "options": [
        { "value": 8, "count": 5 },
        { "value": 9, "count": 7 }
      ]
    },
    {
      "key": "color",
      "label": "Color",
      "type": "string",
      "options": [
        { "value": "Red", "count": 3 },
        { "value": "Blue", "count": 6 }
      ]
    }
  ]
}
```

This contract allows the frontend to dynamically render available filters (facets) and their counts after any search, supporting a responsive and faceted search experience.

### API Documentation

1. `GET /categories`:

Retrieves the product categories stored in the database.

2. `GET /filters?category=<CATEGORY_SLUG>`:

Filter options are being returned based on the provided category.

3. `GET /count?q=<SEARCH_STRING>&category=<CATEGORY_SLUG>&filters=<STRINGIFIED_JSON>`:

Total count of the matched documents for the supplied category, filters and the query string are returned.

4. `GET /search?q=<SEARCH_STRING>&category=<CATEGORY_SLUG>&filters=<STRINGIFIED_JSON>&page=<PAGE_NUMBER>&item=<ITEMS_COUNT>`:

This API returns the filtered products for the supplied criteria. It also includes pagination and by default the first 20 matched items are being returned if the `page` and `item` attributes are not provided.
