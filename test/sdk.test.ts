import { SharpAISdk } from '../src';
import { api } from './setupTest';
import {
  mockCompletionResponse,
  mockChatCompletionResponse,
  mockEmbeddingsResponse,
  mockOllamaCompletionResponse,
  mockOllamaChatCompletionResponse,
  mockModelListResponse,
  mockModelInformationResponse,
  mockPullModelResponse,
  mockOllamaEmbeddingsResponse,
  mockFrontend,
  mockFrontendListResponse,
  mockBackend,
  mockBackendListResponse,
  mockBackendHealth,
  mockBackendHealthListResponse,
} from './mockData';
import { getServer } from './server';
import { handlers } from './handlers';

const server = getServer(handlers);

describe('SharpAISdk', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  describe('sdk', () => {
    it('should validate connectivity', async () => {
      const response = await api.validateConnectivity();
      expect(response).toBe(true);
    });
  });

  describe('OpenAI', () => {
    it('should generate a completion', async () => {
      const response = await api.OpenAI.generateCompletion({
        model: 'llama3.1:latest',
        prompt: 'Once upon a time, in a distant galaxy,',
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.9,
        top_k: 50,
        n: 1,
        stream: false,
        logprobs: null,
        echo: false,
        stop: ['<|endoftext|>', '<|im_end|>'],
        presence_penalty: 0.0,
        frequency_penalty: 0.0,
        repetition_penalty: 1.0,
      });
      expect(response).toEqual(mockCompletionResponse);
    });

    it('should generate a chat completion', async () => {
      const response = await api.OpenAI.generateChatCompletion({
        model: 'llama3.1:latest',
        messages: [{ role: 'user', content: 'Hello, how are you?' }],
        temperature: 0.7,
      });
      expect(response).toEqual(mockChatCompletionResponse);
    });

    it('should generate embeddings', async () => {
      const response = await api.OpenAI.generateEmbeddings({
        model: 'llama3.1:latest',
        input: 'Hello world',
      });
      expect(response).toEqual(mockEmbeddingsResponse);
    });
  });

  describe('Ollama', () => {
    it('should generate a completion', async () => {
      const response = await api.Ollama.generateCompletion({
        model: 'llama3.1:latest',
        prompt: 'Once upon a time',
        stream: false,
      });
      expect(response).toEqual(mockOllamaCompletionResponse);
    });

    it('should generate a chat completion', async () => {
      const response = await api.Ollama.generateChatCompletion({
        model: 'llama3.1:latest',
        messages: [{ role: 'user', content: 'Hello!' }],
        stream: false,
      });
      expect(response).toEqual(mockOllamaChatCompletionResponse);
    });

    it('should list local models', async () => {
      const response = await api.Ollama.listLocalModel();
      expect(response).toEqual(mockModelListResponse);
    });

    it('should pull a model', async () => {
      const response = await api.Ollama.pullModel({ name: 'llama3.1:latest' });
      expect(response).toEqual(mockPullModelResponse);
    });

    it('should generate embeddings', async () => {
      const response = await api.Ollama.generateEmbeddings({
        model: 'llama3.1:latest',
        input: 'Hello world',
      });
      expect(response).toEqual(mockOllamaEmbeddingsResponse);
    });

    it('should delete a model', async () => {
      const response = await api.Ollama.deleteModel({ name: 'llama3.1:latest' });
      expect(response).toBe(true);
    });
  });

  describe('Null Exception Tests', () => {
    describe('OpenAI', () => {
      it('should throw ArgumentNullException when generateCompletion request is null', async () => {
        await expect(api.OpenAI.generateCompletion(null as any)).rejects.toThrow(
          'ArgumentNullException: request is null or empty'
        );
      });

      it('should throw ArgumentNullException when generateChatCompletion request is null', async () => {
        await expect(api.OpenAI.generateChatCompletion(null as any)).rejects.toThrow(
          'ArgumentNullException: request is null or empty'
        );
      });

      it('should throw ArgumentNullException when generateEmbeddings request is null', async () => {
        await expect(api.OpenAI.generateEmbeddings(null as any)).rejects.toThrow(
          'ArgumentNullException: request is null or empty'
        );
      });
    });

    describe('Ollama', () => {
      it('should throw ArgumentNullException when generateCompletion request is null', async () => {
        await expect(api.Ollama.generateCompletion(null as any)).rejects.toThrow(
          'ArgumentNullException: request is null or empty'
        );
      });

      it('should throw ArgumentNullException when generateChatCompletion request is null', async () => {
        await expect(api.Ollama.generateChatCompletion(null as any)).rejects.toThrow(
          'ArgumentNullException: request is null or empty'
        );
      });

      it('should throw ArgumentNullException when pullModel request is null', async () => {
        await expect(api.Ollama.pullModel(null as any)).rejects.toThrow(
          'ArgumentNullException: request is null or empty'
        );
      });

      it('should throw ArgumentNullException when deleteModel request is null', async () => {
        await expect(api.Ollama.deleteModel(null as any)).rejects.toThrow(
          'ArgumentNullException: request is null or empty'
        );
      });

      it('should throw ArgumentNullException when generateEmbeddings request is null', async () => {
        await expect(api.Ollama.generateEmbeddings(null as any)).rejects.toThrow(
          'ArgumentNullException: request is null or empty'
        );
      });
    });
  });
});
