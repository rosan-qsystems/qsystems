import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

export const BaseTheme = (props: any) => {
  return (
    <MantineProvider
      cssVariablesSelector="html"
      theme={{
        primaryColor: 'primary',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        radius: {
          xs: '6px',
          sm: '8px',
          md: '12px',
          lg: '16px',
          xl: '20px'
        },
        defaultRadius: 'md', // sets default for all components
        spacing: {
          xs: '8px',
          sm: '16px',
          md: '24px',
          lg: '32px',
          xl: '40px'
        },
        colors: {
          dark: [
            '#D5D7E0',
            '#ACAEAF',
            '#8C8FA3',
            '#666980',
            '#4D4F66',
            '#34354A',
            '#2B2C3D',
            '#1D1E30',
            '#0C0D21',
            '#01010A'
          ],
          primary: [
            '#FFF4E5',
            '#FFE4C2',
            '#FFD199',
            '#FFBC70',
            '#FFA74A',
            '#FF9325',
            '#FF7F11',
            '#E86F0D',
            '#C25B0B',
            '#9B4708'
          ], // Gradient shades of your primary color
          secondary: [
            '#e9e9e9',
            '#d3d3d3',
            '#bebebd',
            '#9d9d9c',
            '#929291',
            '#757574',
            '#585857',
            '#494949',
            '#2c2c2b',
            '#1d1d1d'
          ]
        }
      }}
    >
      <ModalsProvider>
        {/*<NavigationProgress />*/}
        <Notifications />
        {props.children}
      </ModalsProvider>
    </MantineProvider>
  );
};
