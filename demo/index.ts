import { SharpAISdk } from 'sharpai-sdk';

var api = new SharpAISdk({ endpoint: 'http://view.homedns.org:11434/', bearerToken: 'sharpaiadmin' });

//region OpenAI
const generateCompletionOpenAI = async () => {
  try {
    const response = await api.OpenAI.generateCompletion(
      {
        model: 'qwen2.5:7b',
        prompt: 'Once upon a time, in a distant galaxy,',
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.9,
        top_k: 50,
        n: 1,
        stream: true,
        logprobs: null,
        echo: false,
        stop: ['<|endoftext|>', '<|im_end|>'],
        presence_penalty: 0.0,
        frequency_penalty: 0.0,
        repetition_penalty: 1.0,
        best_of: 1,
        logit_bias: {},
        seed: null,
        suffix: null,
        use_beam_search: false,
        length_penalty: 1.0,
        early_stopping: false,
        skip_special_tokens: true,
        spaces_between_special_tokens: true,
        include_stop_str_in_output: false,
        ignore_eos: false,
        min_tokens: 0,
        stop_token_ids: [],
        bad_words: [],
        response_format: {
          type: 'text',
        },
        guided_json: null,
        guided_regex: null,
        guided_choice: null,
        guided_grammar: null,
        guided_decoding_backend: null,
        guided_whitespace_pattern: null,
      },
      (token) => {
        console.log(token, 'token');
      }
    );
    console.log(response, 'response');
  } catch (error) {
    console.log(error, 'error');
  }
};

// generateCompletionOpenAI();

const generateChatCompletionOpenAIFlow = async () => {
  try {
    const response = await api.OpenAI.generateChatCompletion({
      model: 'llama3.1:latest',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: 'Hello, how can you help me today?',
        },
      ],
      temperature: 0.7,
      top_p: 0.9,
      top_k: 50,
      max_tokens: 512,
      stream: false,
      stop: ['<|endoftext|>', '<|im_end|>'],
      presence_penalty: 0.0,
      frequency_penalty: 0.0,
      repetition_penalty: 1.0,
      n: 1,
      best_of: 1,
      logit_bias: {},
      logprobs: null,
      top_logprobs: null,
      seed: null,
      use_beam_search: false,
      length_penalty: 1.0,
      early_stopping: false,
      skip_special_tokens: true,
      spaces_between_special_tokens: true,
      include_stop_str_in_output: false,
      ignore_eos: false,
      min_tokens: 0,
      stop_token_ids: [],
      bad_words: [],
      response_format: {
        type: 'text',
      },
      guided_json: null,
      guided_regex: null,
      guided_choice: null,
      guided_grammar: null,
      guided_decoding_backend: null,
      guided_whitespace_pattern: null,
    });
    console.log(response, 'response');
  } catch (error) {
    console.log(error, 'error');
  }
};

// generateChatCompletionOpenAIFlow();

const generatEmbeddingsOpenAIFlow = async () => {
  try {
    const response = await api.OpenAI.generateEmbeddings({
      model: 'llama3.1:latest',
      input: 'The quick brown fox jumps over the lazy dog',
      encoding_format: 'float',
      dimensions: null,
      user: null,
    });
    console.log(response, 'response');
  } catch (error) {
    console.log(error, 'error');
  }
};

// generatEmbeddingsOpenAIFlow();

//endregion

//region Ollama

const generateCompletionOllama = async () => {
  try {
    const response = await api.Ollama.generateCompletion({
      model: 'llama3.1:latest',
      prompt:
        'system: you are a helpful AI assistant, always be nice.\nuser: give me a very long overview of the C programming language.\nassistant:',
      stream: false,
      options: {
        num_predict: 1000,
        temperature: 0.8,
        top_p: 0.9,
        repeat_penalty: 1.1,
        stop: ['\nuser:'],
        num_ctx: 2048,
        num_batch: 512,
      },
    });
    console.log(response, 'response');
  } catch (error) {
    console.log(error, 'error');
  }
};

// generateCompletionOllama();

const generateChatCompletionOllama = async () => {
  try {
    const response = await api.Ollama.generateChatCompletion({
      model: 'llama3.1:latest',
      stream: false,
      messages: [
        {
          role: 'system',
          content: 'you are a helpful AI assistant.  be nice',
        },
        {
          role: 'user',
          content: 'what can you tell me about botox',
        },
      ],
      options: {
        num_keep: 5,
        seed: 42,
        num_predict: 100,
        top_k: 20,
        top_p: 0.9,
        min_p: 0,
        tfs_z: 0.5,
        typical_p: 0.7,
        repeat_last_n: 33,
        temperature: 0.8,
        repeat_penalty: 1.2,
        presence_penalty: 1.5,
        frequency_penalty: 1,
        mirostat: 1,
        mirostat_tau: 0.8,
        mirostat_eta: 0.6,
        penalize_newline: true,
        numa: false,
        num_ctx: 1024,
        num_batch: 2,
        num_gpu: 1,
        main_gpu: 0,
        low_vram: false,
        f16_kv: true,
        vocab_only: false,
        use_mmap: true,
        use_mlock: false,
        num_thread: 8,
      },
    });
    console.log(response, 'response');
  } catch (error) {
    console.log(error, 'error');
  }
};

// generateChatCompletionOllama();

const pullModel = async () => {
  try {
    const response = await api.Ollama.pullModel({ name: 'llama3.1' }, (token) => {
      console.log(token);
    });
    console.log(response, 'response');
  } catch (error) {
    console.log(error, 'error');
  }
};

// pullModel();

const deleteModel = async () => {
  try {
    const response = await api.Ollama.deleteModel({ name: 'llama3.1:latest' });
    console.log(response, 'response');
  } catch (error) {
    console.log(error, 'error');
  }
};

// deleteModel();

const listLocalModel = async () => {
  try {
    const response = await api.Ollama.listLocalModel();
    console.log(response, 'response');
  } catch (error) {
    console.log(error, 'error');
  }
};

// listLocalModel();

const generateEmbeddingsOllama = async () => {
  try {
    const response = await api.Ollama.generateEmbeddings({
      model: 'all-minilm',
      input: 'asdf',
    });
    console.log(response, 'response');
  } catch (error) {
    console.log(error, 'error');
  }
};

generateEmbeddingsOllama();
//endregion
