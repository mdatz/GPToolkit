import Head from 'next/head'
import { Center, Paper, Text, Tabs, Alert, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri'
import { SiBuymeacoffee } from 'react-icons/si'
import { GiToolbox } from 'react-icons/gi'
import { useState } from 'react';
import { FaHeartBroken } from 'react-icons/fa';
import BrainstormCard from './components/BrainstormCard';
import PromptCard from './components/PromptCard';
import IdeaToCodeCard from './components/IdeaToCodeCard';
import TranspilerCard from './components/TranspilerCard';
import OptimizerCard from './components/OptimizerCard';

export default function Home() {

  const [error, setError] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <div>

      {/* Metadata */}
      <Head>
        <title>GPToolkit</title>
        <meta name="description" content="A web app tool for generating elevator pitches, new business ideas, and/or helping refine company messages" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar/Header  */}
      <Paper shadow='sm' style={{width:'100vw', borderRadius:'0px', height: '80px', position: 'absolute', top: 0, left: 0}}>
        <Center>
          <div style={{height:'80px', display:'flex', alignItems:'center'}}>
            <GiToolbox style={{fontSize: '45px', marginRight: '15px'}} color='#C74BC6'/>
            <Text style={{fontSize: '30px'}}><b>GPToolkit</b></Text>
          </div>
        </Center>
      </Paper>
      <div style={{height:'80px'}}></div>

      {/* Main Content */}
      <Center mt={'50px'}>
        <div>
          <Paper radius='md' shadow='xl' style={{height: '70vh', width:'80vw'}} withBorder>
            <Tabs grow variant='outline'>
              <Tabs.Tab label="Brainstorm an Idea" active>
                <BrainstormCard />
              </Tabs.Tab>
              <Tabs.Tab label="Prompt Editor" disabled>
                <PromptCard />
              </Tabs.Tab>
              <Tabs.Tab label="Idea to Code">
                <IdeaToCodeCard />
              </Tabs.Tab>
              <Tabs.Tab label="Code Transpiler">
                <TranspilerCard />
              </Tabs.Tab>
              <Tabs.Tab label="Code Optimizer">
                <OptimizerCard />
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
        
        {/* Footer Text */}
        <Center mt='xl' mx='xl'>
        <div style={{textAlign: 'center'}}>
          <h5>GPToolkit is a web application for easy access to the useful developer and productivty use cases of OpenAI's GPT 3</h5>
        </div>
        </Center>
        </div>
        
        {/* Light/Dark Mode Toggle */}
        <div style={{position: 'absolute', right: '50px', bottom: '40px', display: 'flex', zIndex: 2}}>
          <Paper shadow='xl' radius='xl' mr='xs'>
            <ActionIcon size={'50px'} radius='xl' onClick={() => toggleColorScheme()} variant='filled' color={dark ? 'yellow' : 'pink'}>
              <SiBuymeacoffee color='white' size={32} />
            </ActionIcon>
          </Paper>
          <Paper shadow='xl' radius='xl'>
          <ActionIcon size={'50px'} radius='xl' onClick={() => toggleColorScheme()} variant='filled' color={dark ? 'blue' : 'violet'}>
            {dark ? <RiSunFill color='yellow' size={32} /> : <RiMoonClearFill color='yellow' size={32} />}
          </ActionIcon>
          </Paper>
        </div>

      </Center>
    </div>
  )
}
 




 

 
 
 


 
 
 
 
 
 
 
 
 
 
 
 
 

 
 
 
 

 

