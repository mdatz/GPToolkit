import { Center, Select, Text, Button, Divider, Skeleton, Grid, Textarea } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { useState } from 'react';
import { FaSpaceShuttle } from 'react-icons/fa';

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

export default function OptimizerCard(){
 
    const [languages, setLanguage] = useState(programmingLanguages)
    const [error, setError] = useState(false)
    const [selected, setSelected] = useState('')
    const [languageA, setLanguageA] = useState('')
    const [languageB, setLanguageB] = useState('')
    const [loading, setLoading] = useState(false)
    const [transpiling, setTranspiling] = useState(false)
    const [transpileResponse, setTranspileResponse] = useState(false)
    const [response, setResponse] = useState(false)

    return (
        <Center style={{height:'60vh'}}>
                <div style={{width:'70vw'}}>
                  <Grid grow justify="space-between" gutter='xl' mt='xl'>
                    <Grid.Col span={4} style={{height: '45vh'}}>
                      <Center>
                      <Select 
                        data={languages}
                        value={languageA}
                        onChange={(value) => setLanguageA(value)}
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
                      <Skeleton m='sm' height='446px' visible={transpiling || !transpileResponse}>
                      <div style={{height:'446px'}}>
                      <Prism>
                        {transpileResponse ? transpileResponse : 'No Response'}
                      </Prism>
                      </div>
                      </Skeleton>
                    </Grid.Col>
                  </Grid>
                  <Center mt={'35px'}>
                    <Button size='lg' variant='gradient' mb='lg' gradient={{ from: 'grape', to: 'pink', deg: 195 }} onClick={() => {setTranspiling(true); setLoading(true);}} loading={loading}>Optimize Code</Button>
                  </Center>
                </div>
               </Center>
    )
}