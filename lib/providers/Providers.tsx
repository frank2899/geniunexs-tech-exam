'use client'

import { ThemeProvider } from 'styled-components'
import theme from '@/lib/theme'
import { ChakraProvider, createSystem, defineConfig, defaultConfig } from '@chakra-ui/react'
import StyledComponentsRegistry from './registry'
import ReduxProvider from './Redux'
import { Toaster } from '@/components/Toaster'

const config = defineConfig({
    globalCss: {
        'html, body': {
            margin: 0,
            padding: 0,
            background: '#fafafa',
        },
    },
})
const system = createSystem(defaultConfig, config)

const Providers = (props: React.PropsWithChildren) => {
    return (
        <StyledComponentsRegistry>
            <ReduxProvider>
                <ThemeProvider theme={theme}>
                    <ChakraProvider value={system}>
                        {props.children}
                        <Toaster />
                    </ChakraProvider>
                </ThemeProvider>
            </ReduxProvider>
        </StyledComponentsRegistry>
    )
}

export default Providers
