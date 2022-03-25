import Head from 'next/head'
import { Center, Paper, Select, Text, Button, Divider, Skeleton, Tabs, Alert, Grid, Textarea, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri'
import { useState } from 'react';
import { FaHeartBroken, FaSpaceShuttle, FaFileImport } from 'react-icons/fa';

const sectors = [
  {value: 'Aerospace and aviation ', label: 'Aerospace and aviation '},
  {value: 'Agriculture ', label: 'Agriculture '},
  {value: 'Appliances ', label: 'Appliances '},
  {value: 'Automotive ', label: 'Automotive '},
  {value: 'Banking and financial services', label: 'Banking and financial services'},
  {value: 'Biometrics', label: 'Biometrics'},
  {value: 'CSR and governance ', label: 'CSR and governance '},
  {value: 'Construction and building ', label: 'Construction and building '},
  {value: 'Customer service ', label: 'Customer service'},
  {value: 'Data protection', label: 'Data protection'},
  {value: 'Electrical and electronic', label: 'Electrical and electronic'},
  {value: 'Energy and utilities', label: 'Energy and utilities'},
  {value: 'Engineering', label: 'Engineering'},
  {value: 'Environmental management and sustainability', label: 'Environmental management and sustainability'},
  {value: 'Facilities management', label: 'Facilities management'},
  {value: 'Fire', label: 'Fire'},
  {value: 'Food and drink ', label: 'Food and drink '},
  {value: 'Graphic Technology', label: 'Graphic Technology'},
  {value: 'Healthcare', label: 'Healthcare'},
  {value: 'Health and safety', label: 'Health and safety'},
  {value: 'ICT and telecoms', label: 'ICT and telecoms'},
  {value: 'Import export', label: 'Import export'},
  {value: 'Information management', label: 'Information management'},
  {value: 'Innovation and design', label: 'Innovation and design'},
  {value: 'Internet of Things', label: 'Internet of Things'},
  {value: 'Lighting', label: 'Lighting'},
  {value: 'Manufacturing and processing', label: 'Manufacturing and processing'},
  {value: 'Measurement and metrology', label: 'Measurement and metrology'},
  {value: 'Medical devices', label: 'Medical devices'},
  {value: 'Mining and materials', label: 'Mining and materials'},
  {value: 'Nanotechnology ', label: 'Nanotechnology '},
  {value: 'Pressure vessels', label: 'Pressure vessels'},
  {value: 'Quality and business improvement', label: 'Quality and business improvement'},
  {value: 'Risk', label: 'Risk'},
  {value: 'Security', label: 'Security'},
  {value: 'Transport and logistics', label: 'Transport and logistics'},
  {value: 'Waste and recycling', label: 'Waste and recycling'},
  {value: 'Welding', label: 'Welding'},
]

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

export default function Home() {

  const [data, setData] = useState(sectors)
  const [languages, setLanguage] = useState(programmingLanguages)
  const [error, setError] = useState(false)
  const [selected, setSelected] = useState('')
  const [languageA, setLanguageA] = useState('')
  const [languageB, setLanguageB] = useState('')
  const [loading, setLoading] = useState(false)
  const [transpiling, setTranspiling] = useState(false)
  const [transpileResponse, setTranspileResponse] = useState(false)
  const [response, setResponse] = useState(false)

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  function handleSubmit(){
    setLoading(true)
    if(selected.length > 0){
      fetch('api/handleRequest', {method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({"value": selected})}).then(res => res.json()).then(res => {
        setResponse(res.data)
        setLoading(false)
      })
    }else{
      setLoading(false)
      setError('Please select a business sector or enter your own if you do not see it in the list')
    }
  }

  return (
    <div>
      {/* Metadata */}
      <Head>
        <title>GPT 3 Toolkit</title>
        <meta name="description" content="A web app tool for generating elevator pitches, new business ideas, and/or helping refine company messages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar/Header  */}
      <Paper shadow='sm' style={{width:'100vw', borderRadius:'0px', height: '80px', marginTop: '-20px', position: 'absolute', top: 0, left: 0}}>
        <Center>
          <div>
            <h2>GPT 3 Toolkit</h2>
          </div>
        </Center>
      </Paper>
      <div style={{height:'80px'}}></div>
      {/* Main Content */}
      <Center mt={'50px'}>
        <div>
          <Paper radius='md' shadow='xl' style={{height: '70vh', width:'80vw'}} withBorder>
            <Tabs grow>
              <Tabs.Tab label="Brainstorm an Idea" active>
                <Center style={{height:'60vh', width:'80vw'}}>
                  <Paper radius='xl' py='xs' px='xl'>
                    <Center>
                      <Text size='xl'>
                        <b>Brainstorm my next cool project in </b>
                      </Text>
                      <Select 
                        data={data}
                        value={selected}
                        onChange={(value) => setSelected(value)}
                        variant="unstyled"
                        placeholder=""
                        size='xl'
                        mx='sm'
                        searchable
                        creatable
                        clearable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onCreate={(query) => setData((current) => [...current, query])}
                        style={{borderBottom: '1px solid #e0e0e0', width: '400px'}}
                      />
                    </Center>
                    {response && 
                      <>
                        <Divider my='xl' mx={'200px'}/>
                          <Center mx='150px'>
                            <Skeleton visible={loading}>
                              <Text size='xl' style={{textAlign: 'center'}}>
                                {response}
                              </Text>
                            </Skeleton>
                          </Center>
                        <Divider my='xl' mx={'200px'}/>
                      </>
                    }
                    <Center mt={'40px'}>
                      <Button size='lg' variant='gradient' gradient={{ from: 'grape', to: 'pink', deg: 35 }} onClick={handleSubmit} loading={loading}>Brainstorm</Button>
                    </Center>
                  </Paper>
                </Center>
              </Tabs.Tab>
              <Tabs.Tab label="Prompt Editor">
              </Tabs.Tab>
              <Tabs.Tab label="Idea to Code">
              <Center style={{height:'60vh'}}>
                <div style={{width:'70vw'}}>
                  <Grid grow justify="space-between" gutter='xl' mt='xl'>
                    <Grid.Col span={4} style={{height: '45vh'}}>
                      <Center style={{marginTop: '-10px'}}>
                        <Text>
                          <h3>Describe the code you would like</h3>
                        </Text>
                      </Center>
                      <Textarea
                        placeholder="Enter as much information as you can about the code you are trying to generate..."
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
                        <FaFileImport color='gray' size={32} style={{marginTop: '10px', marginBottom: '10px'}}/>
                      </Center>
                      <Center style={{height:'45%'}}>
                        <Divider orientation='vertical'/>
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Center>
                      <Select 
                        data={languages}
                        value={languageB}
                        onChange={(value) => setLanguageB(value)}
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
                    <Button size='lg' variant='gradient' onClick={() => {setTranspiling(true); setLoading(true);}} loading={loading}>Generate Code</Button>
                  </Center>
                </div>
               </Center>
              </Tabs.Tab>
              <Tabs.Tab label="Code Transpiler">
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
                        <FaFileImport color='gray' size={32} style={{marginTop: '10px', marginBottom: '10px'}}/>
                      </Center>
                      <Center style={{height:'45%'}}>
                        <Divider orientation='vertical'/>
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Center>
                      <Select 
                        data={languages}
                        value={languageB}
                        onChange={(value) => setLanguageB(value)}
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
                    <Button size='lg' variant='gradient' onClick={() => {setTranspiling(true); setLoading(true);}} loading={loading}>Translate Code</Button>
                  </Center>
                </div>
               </Center>
              </Tabs.Tab>
              <Tabs.Tab label="Code Optimizer">
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
                        <FaSpaceShuttle color='gray' size={32} style={{marginTop: '10px', marginBottom: '10px'}}/>
                      </Center>
                      <Center style={{height:'45%'}}>
                        <Divider orientation='vertical'/>
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Center my={'-5px'}>
                         <h2>Optimized Code</h2> 
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
                    <Button size='lg' variant='gradient' mb='lg' gradient={{ from: 'teal', to: 'blue', deg: 60 }} onClick={() => {setTranspiling(true); setLoading(true);}} loading={loading}>Optimize Code</Button>
                  </Center>
                </div>
               </Center>
              </Tabs.Tab>
            </Tabs>
            {error && 
              <Center>
                <Alert icon={<FaHeartBroken size={16}/>} title="Oops!" color="red" radius="md" withCloseButton onClose={() => setError(false)} variant="filled" m='xl' mt={'-60px'} style={{width:'35%'}}>
                  {error}
                </Alert>
              </Center>
            }
        </Paper>

        <Center mt='xl' mx='xl'>
        <div style={{textAlign: 'center'}}>
          <h5>GPT 3 Toolkit is a web application for easy access to the useful developer and productivty use cases of OpenAI's GPT 3</h5>
        </div>
        </Center>
        </div>
        
        {/* Light/Dark Mode Toggle */}
        <div style={{position: 'absolute', right: '25px', bottom: '25px', zIndex: 2}}>
          <Paper shadow='xl' radius='xl'>
          <ActionIcon size={'50px'} radius='xl' onClick={() => toggleColorScheme()} variant='filled' color={dark ? 'yellow' : 'violet'}>
            {dark ? <RiSunFill color='yellow' size={32} /> : <RiMoonClearFill color='yellow' size={32} />}
          </ActionIcon>
          </Paper>
        </div>

      </Center>
    </div>
  )
}
 




 

 
 
 


 
 
 
 
 
 
 
 
 
 
 
 
 

 
 
 
 

 

