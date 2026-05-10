# PDF RAG

## What does it do?

The PDF RAG system allows a user to upload a PDF document and then ask questions regarding the document. The system utilizes an LLM to generte answers from the uploaded PDF itself.

## How does it work?

### The upload phase

- The user uploads the document on the frontend.
- The frontend sends a POST request to the upload/ API endpoint.
- The API stores the file in the backend server and enters it into a job queue.
- A background worker moniters this job queue.
- Any new file that is sent into the job queue, is taken by worker and split into chunks.
- The chunks are then embedded into vectors and stored in a vector database.

### The embedding phase

- The system uses Ollama to run embedding models locally.

## How can you see the existing collections in the vector DB?

Simply visit "localhost:6333/dashboard/#collections".

## How to pull the models for Ollama?

Simply pull the models by entering the following commands into your terminal:

```
ollama pull nomic-embed-text
```

## Tech stack

- Backend: Express.js
- Frontend: Next.js
- Frontend library: ShadCN
- Queue: BullMQ
- Key-value store: Valkey
- Vector DB: Qdrant
- Embeddings model: nomic-embed-text
- Embeddings model orchestration: Ollama
- LLM orchestration: Langchain
- LLM: llama-3.1-8b-instant on Groq API with Langchain

## How to start the projects

- Install the dependencies for bnth server and client folders.
- Install Ollama and pull the nomic-embed-text model.

You will have to start the following services:

- The main server

```

cd server
npx nodemon index.js

```

- The frontend server

```

cd client
npm run dev

```

- The background worker (worker.js)

```

cd server
npm run dev:worker

```

- The Docker compose file environment

```

docker compose up -d

```
