import { NavigationContainer } from '@react-navigation/native';
import ScreensNav from './components/nav/ScreensNav';
import { AuthProvider } from './context/auth';



export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
         <ScreensNav />
      </AuthProvider>
    </NavigationContainer>
  )
}
