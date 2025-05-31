# InstaSearch AI

This Next.js module is the deliverable for the assignment provided by Instinctive Studio for the Full Stack MERN Developer role.

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