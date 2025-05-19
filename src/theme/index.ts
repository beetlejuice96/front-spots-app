import { extendTheme } from '@chakra-ui/react'

// Definimos los colores de nuestra aplicación
const colors = {
  brand: {
    primary: '#ff3e3e',
    secondary: '#ffde59',
    accent: '#00c6ff',
    success: '#00ff66',
    warning: '#ff9100',
    background: '#f0f0f0',
    text: '#000000',
    border: '#000000',
    card: '#ffffff',
  },
}

// Definimos los estilos globales
const styles = {
  global: () => ({
    body: {
      bg: 'brand.background',
      color: 'brand.text',
      fontFamily: 'Work Sans, sans-serif',
    },
  }),
}

// Definimos los componentes personalizados
const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      fontFamily: 'Space Mono, monospace',
      textTransform: 'uppercase',
      borderRadius: '0',
      position: 'relative',
      transition: 'all 0.2s ease',
      _hover: {
        transform: 'translate(2px, 2px)',
      },
      _active: {
        transform: 'translate(5px, 5px)',
        boxShadow: '0px 0px 0px var(--chakra-colors-brand-border) !important',
      },
    },
    variants: {
      neobrutalism: {
        bg: 'brand.card',
        border: '3px solid',
        borderColor: 'brand.border',
        boxShadow: '5px 5px 0px var(--chakra-colors-brand-border)',
      },
      primary: {
        bg: 'brand.primary',
        color: 'white',
        border: '3px solid',
        borderColor: 'brand.border',
        boxShadow: '5px 5px 0px var(--chakra-colors-brand-border)',
      },
      secondary: {
        bg: 'brand.secondary',
        color: 'black',
        border: '3px solid',
        borderColor: 'brand.border',
        boxShadow: '5px 5px 0px var(--chakra-colors-brand-border)',
      },
      accent: {
        bg: 'brand.accent',
        color: 'black',
        border: '3px solid',
        borderColor: 'brand.border',
        boxShadow: '5px 5px 0px var(--chakra-colors-brand-border)',
      },
    },
    defaultProps: {
      variant: 'neobrutalism',
    },
  },
  Box: {
    variants: {
      card: {
        bg: 'brand.card',
        border: '3px solid',
        borderColor: 'brand.border',
        boxShadow: '8px 8px 0px var(--chakra-colors-brand-border)',
        p: 4,
      },
    },
  },
  Input: {
    variants: {
      neobrutalism: {
        field: {
          bg: 'white',
          border: '3px solid',
          borderColor: 'brand.border',
          borderRadius: '0',
          fontFamily: 'Space Mono, monospace',
          _focus: {
            borderColor: 'brand.accent',
            boxShadow: 'none',
          },
        },
      },
    },
    defaultProps: {
      variant: 'neobrutalism',
    },
  },
  Select: {
    variants: {
      neobrutalism: {
        field: {
          bg: 'white',
          border: '3px solid',
          borderColor: 'brand.border',
          borderRadius: '0',
          fontFamily: 'Space Mono, monospace',
          _focus: {
            borderColor: 'brand.accent',
            boxShadow: 'none',
          },
        },
      },
    },
    defaultProps: {
      variant: 'neobrutalism',
    },
  },
  Checkbox: {
    variants: {
      neobrutalism: {
        control: {
          w: '1.5rem',
          h: '1.5rem',
          border: '3px solid',
          borderColor: 'brand.border',
          borderRadius: '0',
          bg: 'white',
          _checked: {
            bg: 'brand.accent',
            borderColor: 'brand.border',
            color: 'black',
          },
        },
      },
    },
    defaultProps: {
      variant: 'neobrutalism',
    },
  },
  Badge: {
    variants: {
      neobrutalism: {
        bg: 'brand.secondary',
        border: '2px solid',
        borderColor: 'brand.border',
        borderRadius: '0',
        fontFamily: 'Space Mono, monospace',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        px: 2,
        py: 1,
      },
      primary: {
        bg: 'brand.primary',
        color: 'white',
        border: '2px solid',
        borderColor: 'brand.border',
        borderRadius: '0',
        fontFamily: 'Space Mono, monospace',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      secondary: {
        bg: 'brand.secondary',
        color: 'black',
        border: '2px solid',
        borderColor: 'brand.border',
        borderRadius: '0',
        fontFamily: 'Space Mono, monospace',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      accent: {
        bg: 'brand.accent',
        color: 'black',
        border: '2px solid',
        borderColor: 'brand.border',
        borderRadius: '0',
        fontFamily: 'Space Mono, monospace',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      success: {
        bg: 'brand.success',
        color: 'black',
        border: '2px solid',
        borderColor: 'brand.border',
        borderRadius: '0',
        fontFamily: 'Space Mono, monospace',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      warning: {
        bg: 'brand.warning',
        color: 'black',
        border: '2px solid',
        borderColor: 'brand.border',
        borderRadius: '0',
        fontFamily: 'Space Mono, monospace',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
    },
    defaultProps: {
      variant: 'neobrutalism',
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: 'Space Mono, monospace',
      letterSpacing: '-0.5px',
    },
  },
}

// Definimos las fuentes
const fonts = {
  heading: 'Space Mono, monospace',
  body: 'Work Sans, sans-serif',
}

// Creamos el tema
const theme = extendTheme({
  colors,
  styles,
  components,
  fonts,
})

export default theme
