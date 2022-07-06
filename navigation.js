import { NavigationContainer } from '@react-navigation/native';
import ScreensNav from './components/nav/ScreensNav';
import { AuthProvider } from './context/auth';
import { LinkProvider } from './context/link';



export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
         <LinkProvider>
            <ScreensNav />
         </LinkProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
