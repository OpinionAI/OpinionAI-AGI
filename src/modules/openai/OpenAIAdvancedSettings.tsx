import * as React from 'react';
import { shallow } from 'zustand/shallow';

import { Box, FormControl, FormHelperText, FormLabel, Input, Slider, Stack } from '@mui/joy';

import { Brand } from '@/common/brand';
import { Link } from '@/common/components/Link';
import { Section } from '@/common/components/Section';
import { settingsCol1Width, settingsGap, settingsMaxWidth } from '@/common/theme';
import { useSettingsStore } from '@/common/state/store-settings';


export function OpenAIAdvancedSettings() {
  // external state
  const { apiOrganizationId, setApiOrganizationId, apiHost, setApiHost, heliconeKey, setHeliconeKey, modelTemperature, setModelTemperature, modelMaxResponseTokens, setModelMaxResponseTokens } = useSettingsStore(state => ({
    apiOrganizationId: state.apiOrganizationId, setApiOrganizationId: state.setApiOrganizationId,
    apiHost: state.apiHost, setApiHost: state.setApiHost,
    heliconeKey: state.heliconeKey, setHeliconeKey: state.setHeliconeKey,
    modelTemperature: state.modelTemperature, setModelTemperature: state.setModelTemperature,
    modelMaxResponseTokens: state.modelMaxResponseTokens, setModelMaxResponseTokens: state.setModelMaxResponseTokens,
  }), shallow);

  const handleTemperatureChange = (event: Event, newValue: number | number[]) => setModelTemperature(newValue as number);

  const handleMaxTokensChange = (event: Event, newValue: number | number[]) => setModelMaxResponseTokens(newValue as number);

  const handleApiOrganizationIdChange = (e: React.ChangeEvent) => setApiOrganizationId((e.target as HTMLInputElement).value);

  const handleApiHostChange = (e: React.ChangeEvent) => setApiHost((e.target as HTMLInputElement).value);

  const handleHeliconeKeyChange = (e: React.ChangeEvent) => setHeliconeKey((e.target as HTMLInputElement).value);

  return (
    <Section title='Advanced AI settings'
             collapsible collapsed
             disclaimer='Adjust only if you are familiar with these terms'
             sx={{ mt: 2 }}>
      <Stack direction='column' sx={{ gap: settingsGap, mt: -0.8, maxWidth: settingsMaxWidth }}>

        <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ minWidth: settingsCol1Width }}>
            <FormLabel>Temperature</FormLabel>
            <FormHelperText>{modelTemperature < 0.33 ? 'More strict' : modelTemperature > 0.67 ? 'Larger freedom' : 'Creativity'}</FormHelperText>
          </Box>
          <Slider
            aria-label='Model Temperature' color='neutral'
            min={0} max={1} step={0.1} defaultValue={0.5}
            value={modelTemperature} onChange={handleTemperatureChange}
            valueLabelDisplay='auto'
            sx={{ py: 1, mt: 1.1 }}
          />
        </FormControl>

        <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ minWidth: settingsCol1Width }}>
            <FormLabel>Max Tokens</FormLabel>
            <FormHelperText>Response size</FormHelperText>
          </Box>
          <Slider
            aria-label='Model Max Tokens' color='neutral'
            min={256} max={4096} step={256} defaultValue={1024}
            value={modelMaxResponseTokens} onChange={handleMaxTokensChange}
            valueLabelDisplay='auto'
            sx={{ py: 1, mt: 1.1 }}
          />
        </FormControl>

        <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ minWidth: settingsCol1Width }}>
            <FormLabel>
              API Host
              {/*<Tooltip title='Change API host for compatibility with services like Helicone' variant='solid'>*/}
              {/*  <InfoIcon sx={{ ml: 1, cursor: 'pointer' }} />*/}
              {/*</Tooltip>*/}
            </FormLabel>
            <FormHelperText sx={{ display: 'block' }}>
              <Link level='body2' href='https://github.com/go-skynet/LocalAI' target='_blank'>LocalAI</Link>
              , <Link level='body2' href='https://www.helicone.ai' target='_blank'>Helicone</Link>
              , ...
            </FormHelperText>
          </Box>
          <Input
            variant='outlined' placeholder='e.g., oai.hconeai.com'
            value={apiHost} onChange={handleApiHostChange}
            sx={{ flexGrow: 1 }}
          />
        </FormControl>

        <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ minWidth: settingsCol1Width }}>
            <FormLabel>
              Organization ID
            </FormLabel>
            <FormHelperText sx={{ display: 'block' }}>
              <Link level='body2' href={`${Brand.URIs.OpenRepo}/issues/63`} target='_blank'>What is this</Link>
            </FormHelperText>
          </Box>
          <Input
            variant='outlined' placeholder='Optional, for org users'
            value={apiOrganizationId} onChange={handleApiOrganizationIdChange}
            sx={{ flexGrow: 1 }}
          />
        </FormControl>

        <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ minWidth: settingsCol1Width }}>
            <FormLabel>
              Helicone Key
            </FormLabel>
            <FormHelperText sx={{ display: 'block' }}>
              Generate <Link level='body2' href='https://www.helicone.ai/keys' target='_blank'>here</Link>
            </FormHelperText>
          </Box>
          <Input
            variant='outlined' placeholder='sk-...'
            value={heliconeKey} onChange={handleHeliconeKeyChange}
            sx={{ flexGrow: 1 }}
          />
        </FormControl>

      </Stack>
    </Section>
  );
}