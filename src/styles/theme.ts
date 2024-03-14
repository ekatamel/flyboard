import { extendTheme } from '@chakra-ui/react'

const customTheme = {
  components: {
    Tooltip: {
      baseStyle: {
        bg: 'black',
        border: '1px solid rgba(255, 234, 0, 1)',
        font: 'Roboto',
        padding: '10px 20px',
      },
    },
    Modal: {
      parts: ['overlay', 'dialog', 'header', 'closeButton', 'body', 'footer'],
      baseStyle: () => ({
        dialog: {
          bg: 'black',
        },
      }),
    },
    Popover: {
      parts: ['content', 'arrow', 'closeButton'],
      baseStyle: {
        content: {
          bg: 'black',
          color: 'white',
          maxWidth: '300px',
          height: 'auto',
          fontWeight: 'normal',
          fontSize: '12px',
          whiteSpace: 'normal',
          borderRadius: '0px',
          border: '1px solid #ffea00 !important',
          letterSpacing: 'normal',
        },
      },
    },
  },
  colors: {
    yellow: {
      45: 'rgba(255, 234, 0, 0.45)',
      100: 'rgba(255, 234, 0, 1)',
    },
    gray: {
      50: 'rgba(210, 210, 210, 0.4)',
      900: '#171923',
    },
  },
}

const theme = extendTheme(customTheme)
export default theme
