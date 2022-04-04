const OpenAI = require('openai-api')

async function sendQuery(operation, prompt, key) {

  //Create a new OpenAi instance with provided key but default to env for development
  const openai = new OpenAI(key ? key : process.env.OPENAI_API_KEY);
  var gptResponse;

  switch(operation) {
    
    // [Brainstorm] Model for generating an elevator pitch or new business idea
    case 'brainstorm':
      gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: prompt,
        maxTokens: 70,
        temperature: 0.85,
        topP: 1.0,
        presencePenalty: 1,
        frequencyPenalty: 1,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["###"]
      });
      break;

    // [Sandbox] Model for testing out new sandbox prompts 
    case 'sandbox':
      gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: prompt,
        maxTokens: 100,
        temperature: 0.0,
        topP: 1.0,
        presencePenalty: 1,
        frequencyPenalty: 1,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["###"]
      });
      break;
    
    // [Idea To Code] Model for generating code from a rough text description
    case 'ideaToCode':
      gptResponse = await openai.complete({
        engine: 'code-davinci-002',
        prompt: prompt,
        maxTokens: 256,
        temperature: 0.1,
        topP: 1.0,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["# Create"]
      });
      break;
    
    // [Transpiler] Model for translating a code snippet into a different language
    case 'transpileCode':
      gptResponse = await openai.complete({
        engine: 'code-davinci-002',
        prompt: prompt,
        maxTokens: 256,
        temperature: 0,
        topP: 1.0,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["# Convert"]
      });
      break;
    
    // [Optimizer] Model for optimizing a code snippet
    case 'optimizeCode':
      gptResponse = await openai.complete({
        engine: 'code-davinci-002',
        prompt: prompt,
        maxTokens: 256,
        temperature: 0,
        topP: 1.0,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["# End"]
      });
      break;
    
    default:
      throw new Error('Invalid operation');
  }

  return gptResponse.data.choices[0].text;
}

export default async function handler(req, res) {

  //Check the request has specified an operation
  if (!req.body.operation) {
    res.status(400).send('No operation specified');
    return;
  }

  console.log('Request received: [' + req.body.operation + '] - (' + new Date() + ')');

  //Check the request has specified an API key
  if (!req.body.key && process.env.OPENAI_API_KEY === undefined) {
    res.status(400).send('No API key specified');
    return;
  }

  //Check key is valid
  if (!req.body.key === null && process.env.OPENAI_API_KEY === undefined) {
    res.status(400).send('Invalid API key');
    return;
  }

  //Check the request has specified a prompt
  if(!req.body.prompt){
    res.status(400).json({error: 'No prompt supplied'})
    return;
  }

  //Prompt String passed to the model for completion
  const prompt_string = req.body.prompt;
  const operation = req.body.operation;
  const key = req.body.key;

  //Send request to OpenAI API
  try{
    const response = await sendQuery(operation, prompt_string, key);
    res.status(200).json({data: response})  
  }catch(error){
    res.status(500).json({error: error.message})
  }

}
