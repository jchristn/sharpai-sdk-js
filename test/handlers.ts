import { http, HttpResponse } from 'msw';
import { mockEndpoint } from './setupTest';
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

export const handlers = [
  // Connectivity check
  http.head(mockEndpoint, ({ request, params, cookies }) => {
    return HttpResponse.text('Hello'); // Simulating connectivity exists
  }),

  // OpenAI endpoints
  http.post(mockEndpoint + 'v1/completions', ({ request, params, cookies }) => {
    return HttpResponse.json(mockCompletionResponse);
  }),

  http.post(mockEndpoint + 'v1/chat/completions', ({ request, params, cookies }) => {
    return HttpResponse.json(mockChatCompletionResponse);
  }),

  http.post(mockEndpoint + 'v1/embeddings', ({ request, params, cookies }) => {
    return HttpResponse.json(mockEmbeddingsResponse);
  }),

  // Ollama endpoints
  http.post(mockEndpoint + 'api/generate', ({ request, params, cookies }) => {
    return HttpResponse.json(mockOllamaCompletionResponse);
  }),

  http.post(mockEndpoint + 'api/chat', ({ request, params, cookies }) => {
    return HttpResponse.json(mockOllamaChatCompletionResponse);
  }),

  http.get(mockEndpoint + 'api/tags', ({ request, params, cookies }) => {
    return HttpResponse.json(mockModelListResponse);
  }),

  http.get(mockEndpoint + 'api/ps', ({ request, params, cookies }) => {
    return HttpResponse.json(mockModelListResponse);
  }),

  http.post(mockEndpoint + 'api/show', ({ request, params, cookies }) => {
    return HttpResponse.json(mockModelInformationResponse);
  }),

  http.post(mockEndpoint + 'api/pull', ({ request, params, cookies }) => {
    return HttpResponse.json(mockPullModelResponse);
  }),

  http.post(mockEndpoint + 'api/embed', ({ request, params, cookies }) => {
    return HttpResponse.json(mockOllamaEmbeddingsResponse);
  }),

  http.delete(mockEndpoint + 'api/delete', ({ request, params, cookies }) => {
    return HttpResponse.json({ success: true });
  }),
];
