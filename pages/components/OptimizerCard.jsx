import { Center, Select, Text, Button, Divider, Skeleton, Grid, Textarea } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { useState } from 'react';
import { FaSpaceShuttle } from 'react-icons/fa';

const programmingLanguages = [
  {value: 'Bash', label: 'Bash'},
  {value: 'C++', label: 'C++'},
  {value: 'JavaScript', label: 'JavaScript'},
  {value: 'TypeScript', label: 'TypeScript'},
  {value: 'React', label: 'React'},
  {value: 'Vue', label: 'Vue'},
  {value: 'Svelte', label: 'Svelte'},
  {value: 'Python', label: 'Python'},
  {value: 'C', label: 'C'},
  {value: 'C#', label: 'C#'},
  {value: 'Java', label: 'Java'},
  {value: 'PHP', label: 'PHP'},
  {value: 'Go', label: 'Go'},
  {value: 'Markdown', label: 'Markdown'},
  {value: 'Swift', label: 'Swift'},
  {value: 'Ruby', label: 'Ruby'},
  {value: 'HTML', label: 'HTML'},
  {value: 'CSS', label: 'CSS'},
  {value: 'SASS', label: 'SASS'},
  {value: 'JSON', label: 'JSON'},
  {value: 'XML', label: 'XML'},
  {value: 'YAML', label: 'YAML'},
  {value: 'SQL', label: 'SQL'},
]

const fileExt = {
'Bash': 'sh',
'C++': 'cpp',
'JavaScript': 'js',
'TypeScript': 'ts',
'React': 'jsx',
'Vue': 'vue',
'Svelte': 'svelte',
'Python': 'py',
'C': 'c',
'C#': 'cs',
'Java': 'java',
'PHP': 'php',
'Go': 'go',
'Markdown': 'md',
'Swift': 'swift',
'Ruby': 'rb',
'HTML': 'html',
'CSS': 'css',
'SASS': 'sass',
'JSON': 'json',
'XML': 'xml',
'YAML': 'yaml',
'SQL': 'sql',
}

export default function OptimizerCard(){
 
    const [languages, setLanguage] = useState(programmingLanguages)
    const [source, setSource] = useState('')
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState('')
    const [response, setResponse] = useState(false)

    var prompt = `
    # Optimze a ${source} code snippet for speed, security, and readability
    # Start Source Code Snippet
    ${input}
    # End Source Code Snippet
    # Start Optimized Code Snippet
    `;

    function handleSubmit() {
        setLoading(true)
        if(input.length > 0 && source.length > 0){
          fetch('api/handleRequest', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({operation:"optimizeCode", prompt: prompt})}).then(res => res.json()).then(res => {
            setResponse(res.data)
            setLoading(false)
          })
        }else{
          setLoading(false)
        }
    }

    return (
        <Center style={{height:'60vh'}}>
                <div style={{width:'70vw'}}>
                  <Grid grow justify="space-between" gutter='xl' mt='xl'>
                    <Grid.Col span={4} style={{height: '45vh'}}>
                      <Center>
                      <Select 
                        data={languages}
                        value={source}
                        onChange={(value) => setSource(value)}
                        variant="unstyled"
                        placeholder="Select Source Language"
                        size='xl'
                        mx='sm'
                        searchable
                        creatable
                        clearable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onCreate={(query) => setData((current) => [...current, query])}
                        style={{borderBottom: '1px solid #e0e0e0', width: '90%'}}
                        required
                      />
                      </Center>
                      <Textarea
                        placeholder="Enter Source Code Here..."
                        size='md'
                        m='sm'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        minRows={17}
                        maxRows={17}
                        autosize
                      />
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <Center style={{height:'45%', marginTop:'15px'}}>
                        <Divider orientation='vertical'/>
                      </Center>
                      <Center>
                        <FaSpaceShuttle color='black' size={32} style={{marginTop: '10px', marginBottom: '10px'}}/>
                      </Center>
                      <Center style={{height:'45%'}}>
                        <Divider orientation='vertical'/>
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Center style={{marginTop: '-10px'}}>
                        <Text>
                          <h3>Code Optimization Output</h3>
                        </Text>
                      </Center>
                      <Skeleton m='sm' height='446px' visible={loading || !response} animate={loading}>
                      <div style={{height:'446px'}}>
                      <Prism style={{height:'446px', width: '520px'}} language={fileExt[source]}>
                        {response ? response : 'Stop Peeking!'}
                      </Prism>
                      </div>
                      </Skeleton>
                    </Grid.Col>
                  </Grid>
                  <Center mt={'35px'}>
                    <Button size='lg' variant='gradient' mb='lg' gradient={{ from: 'grape', to: 'pink', deg: 195 }} onClick={() => {handleSubmit()}} loading={loading}>Optimize Code</Button>
                  </Center>
                </div>
               </Center>
    )
}