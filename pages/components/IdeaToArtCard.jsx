import { Center, Paper, Input, Text, Button, Divider, Skeleton } from '@mantine/core';
import { useState } from 'react';

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

export default function BrainstormCard({sendPrompt}){

    const [data, setData] = useState(sectors)
    const [selected, setSelected] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(false)

    var prompt = `
    ***
    The following are futuristic gpt-3 tools:
    ###
    A tool that creates Unit Code tests for code snippets.
    ###
    A tool that helps people build their resume and cover letters.
    ###
    A tool that suggests content ideas for social media, blogs, and other platforms.
    ###
    A tool that automatically documents code snippets.
    ###
    A tool that generates UML diagrams based on Code
    ###
    `;

    function handleSubmit(){
        setLoading(true)
        if(selected.length > 0){
          sendPrompt('brainstorm', prompt).then(res => res.json()).then(res => {setResponse(res.data);setLoading(false)})
        }else{
          setLoading(false)
          setError('Please select a business sector or enter your own if you do not see it in the list')
        }
    }

    return(
        <Center style={{height:'60vh', width:'80vw'}}>
            <Paper radius='xl' py='xs' px='xl'>
                <Center>
                    <Input
                        data={data}
                        value={selected}
                        onChange={(value) => setSelected(value)}
                        variant="unstyled"
                        placeholder="Write a description about what you would like to see"
                        size='xl'
                        mx='sm'
                        style={{borderBottom: '1px solid #e0e0e0', width: '600px'}}
                    />
                </Center>
                {response && 
                    <>
                        <Divider my='xl' mx={'200px'}/>
                          <Center mx='150px'>
                            <Skeleton visible={loading}>
                              <Text size='xl' style={{textAlign: 'center'}} id='response'>
                                {response}
                              </Text>
                            </Skeleton>
                          </Center>
                        <Divider my='xl' mx={'200px'}/>
                    </>
                }
                <Center mt={'40px'}>
                    <Button size='lg' variant='gradient' gradient={{ from: 'cyan', to: 'blue', deg: 65 }} onClick={handleSubmit} loading={loading} disabled>Coming Soon</Button>
                </Center>
            </Paper>
        </Center>
    );
}