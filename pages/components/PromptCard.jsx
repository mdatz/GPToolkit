import { Center, Select, Text, Button, Divider, Skeleton, Grid, Textarea, useMantineColorScheme } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { GiBlackHoleBolas } from 'react-icons/gi'
import { useState } from 'react';

export default function PromptCard({sendPrompt}){
 
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState(false)

    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    function handleSubmit() {
      setLoading(true)
      if(prompt.length > 0){
        sendPrompt('sandbox', prompt).then(res => res.json()).then(res => {setResponse(res.data);setLoading(false);})
      }else{
        setLoading(false)
      }
    }

    return (
        <Center style={{height:'60vh'}}>
                <div style={{width:'70vw'}}>
                  <Grid grow justify="space-between" gutter='xs' mt='xl' columns={10}>
                    <Grid.Col span={4}>
                      <Center>
                        <Text>
                          <h3>Prompt Draft</h3>
                        </Text>
                      </Center>
                      <Center>
                        <Textarea
                          placeholder="Enter Prompt Here..."
                          size='md'
                          m='sm'
                          required
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          style={{width: '100%'}}
                          minRows={16}
                          maxRows={16}
                        />
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={2} style={{marginRight: '-150px', marginLeft: '-150px'}}>
                      <Center style={{height:'30%', marginTop:'25%'}}>
                        <Divider orientation='vertical'/>
                      </Center>
                      <Center>
                        <GiBlackHoleBolas color={dark ? 'white' : 'black'} size={'10%'} style={{marginTop: '25px', marginBottom: '25px'}}/>
                      </Center>
                      <Center style={{height:'30%'}}>
                        <Divider orientation='vertical'/>
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Center>
                        <Text>
                          <h3>Response</h3>
                        </Text>
                      </Center>
                      <Skeleton m='sm' height='80%' visible={loading || !response} animate={loading}>
                      <Center style={{height:'446px', overflow:'scroll'}}>
                      <Text>
                        {response ? response : 'No Response'}
                      </Text>
                      </Center>
                      </Skeleton>
                    </Grid.Col>
                  </Grid>
                  <Center mt={'25px'}>
                    <Button size='lg' variant='gradient' mb='lg' gradient={{ from: 'grape', to: 'pink', deg: 75 }} onClick={() => {handleSubmit();}} loading={loading}>Send Prompt</Button>
                  </Center>
                </div>
               </Center>
    )
}