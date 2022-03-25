const OpenAI = require('openai-api')

async function sendQuery(query) {

  const openai = new OpenAI(process.env.OPENAI_API_KEY);

  const gptResponse = await openai.complete({
    engine: 'curie',
    prompt: query,
    maxTokens: 128,
    temperature: 1.0,
    topP: 1.0,
    presencePenalty: 1,
    frequencyPenalty: 1,
    bestOf: 1,
    n: 1,
    stream: false,
    stop: ["6"]
  });

  return gptResponse.data.choices[0].text;

}

export default async function handler(req, res) {

  //Check the request has a supplied query
  if(!req.body.value){
    res.status(400).json({error: 'No value supplied'})
  }

  //Prompt String passed to the model for completion
  const prompt_string = `This is a list of startup ideas:
1. [Tag: Internet] A website that lets you post articles you've written, and other people can help you edit them.
2. [Tag: Home] A website that lets you share a photo of something broken in your house, and then local people can offer to fix it for you.
3. [Tag: Children] An online service that teaches children how to code.
4. [Tag: Financial] An online service that allows people to rent out their unused durable goods to people who need them.
5. [Tag: ${req.body.value}] `;
  
  //Send request to OpenAI API
  try{
    const response = await sendQuery(prompt_string);
    res.status(200).json({data: response})  
  }catch(error){
    res.status(500).json({error: error.message})
  }

}
