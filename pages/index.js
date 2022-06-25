import Head from 'next/head'
import { showNotification } from '@mantine/notifications';
import { Center, Button, Paper, Text, Tabs, Alert, ActionIcon, Modal, PasswordInput, useMantineColorScheme } from '@mantine/core';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri'
import { AiOutlineKey } from 'react-icons/ai'
import { SiBuymeacoffee } from 'react-icons/si'
import { GiToolbox, GiBrainstorm, GiComputing, GiBriefcase, GiBookCover, GiPalette } from 'react-icons/gi'
import { useState } from 'react';
import { FaHeartBroken } from 'react-icons/fa';
import BrainstormCard from './components/BrainstormCard';
//import PromptCard from './components/PromptCard';
import IdeaToCodeCard from './components/IdeaToCodeCard';
import TranspilerCard from './components/TranspilerCard';
import OptimizerCard from './components/OptimizerCard';
import IdeaToArtCard from './components/IdeaToArtCard';

export default function Home() {

  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [mode, setMode] = useState(0);
  const [modal, setModal] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  // Function for generic prompt sending
  async function sendPrompt(operation, prompt) {
    if(key === ''){
      showNotification({
        autoClose: 6000,
        title: 'Oops! Your API key is missing',
        message: 'Try entering your api key by opening the key icon in the bottom right!',
        color: 'pink'
      })
    }
    return fetch('api/handleRequest', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({operation: operation, key: key ? key : null, prompt: prompt})})
  }

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
      <Center mt={'50px'} ml={'-100px'}>
        <div>
        <Center>
        <Tabs grow orientation='vertical' active={mode} onTabChange={(active) => {setMode(active)}}>
          <Tabs.Tab label='Brainstorming Tools' icon={<GiBrainstorm size={24} />} color='grape' active/>
          <Tabs.Tab label='Programming Tools' icon={<GiComputing size={24} />} color='teal' />
          <Tabs.Tab label='Image/Art Tools' icon={<GiPalette size={24} />} color='cyan' />
          <Tabs.Tab label='Business Tools' icon={<GiBriefcase size={24} />} disabled />
          <Tabs.Tab label='Writing Tools' icon={<GiBookCover size={24} />} disabled />          
        </Tabs>

            {mode === 0 &&
            <Paper radius='md' shadow='xl' style={{height: '70vh', width:'80vw'}} withBorder>
              <Tabs grow variant='outline'>
              <Tabs.Tab label="Brainstorm an Idea" active>
                <BrainstormCard sendPrompt={sendPrompt}/>
              </Tabs.Tab>
              {/* <Tabs.Tab label="Prompt Editor" aria-disabled>
                <PromptCard sendPrompt={sendPrompt}/>
              </Tabs.Tab> */}
              </Tabs>
            </Paper>
            }

          {mode === 1 && 
            <Paper radius='md' shadow='xl' style={{height: '70vh', width:'80vw'}} withBorder>
              <Tabs grow variant='outline'>
              <Tabs.Tab label="Idea to Code" active>
                <IdeaToCodeCard sendPrompt={sendPrompt}/>
              </Tabs.Tab>
              <Tabs.Tab label="Code Transpiler">
                <TranspilerCard sendPrompt={sendPrompt}/>
              </Tabs.Tab>
              <Tabs.Tab label="Code Optimizer">
                <OptimizerCard sendPrompt={sendPrompt}/>
              </Tabs.Tab>
              </Tabs>
            </Paper>
            }

          {mode === 2 && 
            <Paper radius='md' shadow='xl' style={{height: '70vh', width:'80vw'}} withBorder>
              <Tabs grow variant='outline'>
              <Tabs.Tab label="Idea to Art" active>
                <IdeaToArtCard sendPrompt={sendPrompt}/>
              </Tabs.Tab>
              </Tabs>
            </Paper>
            }

            {error && 
              <Center>
                <Alert icon={<FaHeartBroken size={16}/>} title="Oops!" color="red" radius="md" withCloseButton onClose={() => setError(false)} variant="filled" m='xl' mt={'-60px'} style={{width:'35%'}}>
                  {error}
                </Alert>
              </Center>
            }
        </Center>
        {/* Footer Text */}
        <Center mt='xl' mx='xl' ml={'100px'}>
        <div style={{textAlign: 'center'}}>
          <h5>GPToolkit is a web application for easy access to the useful developer and productivty use cases of OpenAI's GPT 3</h5>
        </div>
        </Center>
      </div>
        
        {/* Light/Dark Mode Toggle */}
        <div style={{position: 'absolute', right: '50px', bottom: '40px', display: 'flex', zIndex: 2}}>
          <Paper shadow='xl' radius='xl' mr='xs'>
            <a href='https://www.buymeacoffee.com/mdatz' target='_blank'>
            <ActionIcon size={'50px'} radius='xl' variant='filled' color='orange'>
              <SiBuymeacoffee color='white' size={32} />
            </ActionIcon>
            </a>
          </Paper>
          <Paper shadow='xl' radius='xl' mr='xs'>
          <ActionIcon size={'50px'} radius='xl' onClick={() => setModal(true)} variant='filled' color={dark ? 'pink' : 'violet'}>
            <AiOutlineKey color='gold' size={32} />
          </ActionIcon>
          </Paper>
          <Paper shadow='xl' radius='xl'>
          <ActionIcon size={'50px'} radius='xl' onClick={() => toggleColorScheme()} variant='filled' color={dark ? 'cyan' : 'dark'}>
            {dark ? <RiSunFill color='yellow' size={32} /> : <RiMoonClearFill color='white' size={32} />}
          </ActionIcon>
          </Paper>
        </div>
      </Center>

      {/* Modal Popup */}
      <Modal opened={modal} onClose={() => setModal(false)} title="Add an OpenAI API Key" centered>
        <Text>
          <p>
            To use the GPToolkit, you must first add your OpenAI API Key.
          </p>
          <p>
            You can find your API Key on the <a href='https://dashboard.openai.com/account' target='_blank'>OpenAI Dashboard</a>.
          </p>
          <p>
            Once you have your API Key, you can use the <b>Brainstorm an Idea</b> tab to generate a new idea.
          </p>
        </Text>
        <PasswordInput placeholder='API Key' label='OpenAI API Key' value={key} onChange={(event) => setKey(event.currentTarget.value)}/>
        <Center>
          <Button mt='xl' onClick={() => {setModal(false)}}>
            Add API Key
          </Button>
        </Center>
      </Modal>
    </div>
  )
}
 




 

 
 
 


 
 
 
 
 
 
 
 
 
 
 
 
 

 
 
 
 

 

