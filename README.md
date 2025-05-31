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

##### Temperature

```
0.1
```

##### Top P

```
0.9
```

##### Top K

```
250
```

##### Maximum Length

```
500
```

##### Stop Sequences

```
}
```