import { Center, Select, Text, Button, Divider, Skeleton, Grid, Textarea } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { GiBlackHoleBolas } from 'react-icons/gi'
import { useState } from 'react';
import { RichTextEditor } from '@mantine/rte'

export default function PromptCard(){
    const [error, setError] = useState(false)
    const [selected, setSelected] = useState('')
    const [loading, setLoading] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState(false)

    return (
        <Center style={{height:'60vh'}}>
                <div style={{width:'70vw'}}>
                  <Grid grow justify="space-between" gutter='xl' mt='xl'>
                    <Grid.Col span={4} style={{height: '45vh'}}>
                      <Center>
                        <RichTextEditor
                          placeholder="Write your prompt here..."
                          value={prompt}
                          onChange={(value) => {
                            setPrompt(value)
                          }}
                        />
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <Center style={{height:'45%', marginTop:'15px'}}>
                        <Divider orientation='vertical'/>
                      </Center>
                      <Center>
                        <GiBlackHoleBolas color='black' size={32} style={{marginTop: '10px', marginBottom: '10px'}}/>
                      </Center>
                      <Center style={{height:'45%'}}>
                        <Divider orientation='vertical'/>
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Center style={{marginTop: '-10px'}}>
                        <Text>
                          <h3>Prompt Response</h3>
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
                    <Button size='lg' variant='gradient' mb='lg' gradient={{ from: 'grape', to: 'pink', deg: 75 }} onClick={() => {setTranspiling(true); setLoading(true);}} loading={loading}>Send Prompt</Button>
                  </Center>
                </div>
               </Center>
    )
}