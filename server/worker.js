import { Worker } from 'bullmq';
import { QdrantVectorStore } from "@langchain/qdrant";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const worker = new Worker(
    'file-upload-queue',
    async (job) => {
        console.log(`Job:`, job.data);
        const data = JSON.parse(job.data);
        /*
        Path: data.path
        read the pdf from path,
        chunk the pdf,
        call the openai embedding model for every chunk,
        store the chunk in qdrant db
        */

        // Load the PDF
        const loader = new PDFLoader(data.path);
        const docs = await loader.load();
        console.log('DOCS:', docs);

        // const splitter = new RecursiveCharacterTextSplitter({
        //     chunkSize: 100,
        //     chunkOverlap: 0
        // });
        // const texts = splitter.splitText(docs);
        // console.log(texts);

        const embedings = new OllamaEmbeddings({
            model: "nomic-embed-text",
        });

        // Use the embeddings with Qdrant
        const vectorStore = await QdrantVectorStore.fromDocuments(
            docs,
            embedings,
            {
                url: "http://localhost:6333",
                collectionName: "pdf-docs",
            }
        );

        console.log('sdvdvv');
    },
    { concurrency: 100, connection: {
        host: 'localhost',
        port: '6379'
    } }
);