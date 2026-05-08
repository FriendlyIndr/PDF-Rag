import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Queue } from 'bullmq';
import { QdrantVectorStore } from "@langchain/qdrant";
import { OllamaEmbeddings } from "@langchain/ollama";

const queue = new Queue('file-upload-queue');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  return res.json({ status: "All good!" });
});

app.post('/upload/pdf', upload.single('pdf'), async (req, res) => {
  // Add job
  await queue.add(
    'file-ready', 
    JSON.stringify({
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
    }
  ));
  return res.json({ message: 'uploaded' });
});

app.get('/chat', async (req, res) => {
  const userQuery = "What are the references used in this document?";

  const embedings = new OllamaEmbeddings({
    model: "nomic-embed-text",
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embedings,
    {
      url: "http://localhost:6333",
      collectionName: "pdf-docs",
    }
  );

  const ret = vectorStore.asRetriever({
    k: 2,
  });

  const result = await ret.invoke(userQuery);

  const SYSTEM_PROMPT = `
    You are a helpful AI Assistant who answers the user query based on the available context from PDF file.
    Context:
    ${JSON.stringify(result)}
  `;

  return res.json({ result });
});

app.listen(8000, () => console.log(`Server started on PORT:${8000}`));