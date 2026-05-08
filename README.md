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

## Tech stack

- Backend: Express.js
- Frontend: Next.js
- Vector DB: Qdrant
- Embeddings model: nomic-embed-text
- Embeddings model orchestration: Ollama
- LLM: Langchain

## How to start the projects

- Install the dependencies for bnth server and client folders.
- Install Ollama and pull the nomic-embed-text model.

You will have to start the following services:

- The main server
- The frontend server
- The background worker (worker.js)
- The Docker compose file environment
