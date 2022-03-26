import { Center, Select, Text, Button, Divider, Skeleton, Grid, Textarea } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { GiCycle } from 'react-icons/gi'
import { useState } from 'react';

const programmingLanguages = [
    {value: 'C', label: 'C'},
    {value: 'C++', label: 'C++'},
    {value: 'C#', label: 'C#'},
    {value: 'Java', label: 'Java'},
    {value: 'JavaScript', label: 'JavaScript'},
    {value: 'Python', label: 'Python'},
    {value: 'Ruby', label: 'Ruby'},
    {value: 'Swift', label: 'Swift'},
    {value: 'TypeScript', label: 'TypeScript'}
]

export default function IdeaToCodeCard(){

    const [languages, setLanguage] = useState(programmingLanguages)
    const [languageA, setLanguageA] = useState('')
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState('')
    const [response, setResponse] = useState(false)

    var prompt = `Create a code snippet using ${languageA} that meets these requirements: ${input}`;

    function handleSubmit() {
        setLoading(true)
        if(input.length > 0 && languageA.length > 0){
          fetch('api/handleRequest', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({operation:"ideaToCode", prompt: prompt})}).then(res => res.json()).then(res => {
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
                      <Center style={{marginTop: '-10px'}}>
                        <Text>
                          <h3>Describe the code you are looking for</h3>
                        </Text>
                      </Center>
                      <Textarea
                        placeholder="Enter as much information as you can about the code you are trying to generate..."
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
                        <GiCycle color='black' size={32} style={{marginTop: '10px', marginBottom: '10px'}}/>
                      </Center>
                      <Center style={{height:'45%'}}>
                        <Divider orientation='vertical'/>
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Center>
                      <Select 
                        data={languages}
                        value={languageA}
                        onChange={(value) => setLanguageA(value)}
                        variant="unstyled"
                        placeholder="Select Target Language"
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
                      <Skeleton m='sm' height='446px' visible={!response || loading}>
                      <div style={{height:'446px'}}>
                      <Prism style={{width:'100%'}}>
                        {response ? response : 'No Response Yet...'}
                      </Prism>
                      </div>
                      </Skeleton>
                    </Grid.Col>
                  </Grid>
                  <Center mt={'35px'}>
                    <Button size='lg' variant='gradient' gradient={{ from: 'grape', to: 'pink', deg: 115 }} onClick={() => {setLoading(true); handleSubmit()}} loading={loading}>Generate Code</Button>
                  </Center>
                </div>
               </Center>
    )

}