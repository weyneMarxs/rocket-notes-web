import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles.js'
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api.js'
import avatarUser from '../../assets/avatar_placeholder.svg'
import { useNavigate } from 'react-router-dom'
export function Header() {
  const { signOut, user } = useAuth()
  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarUser
  const navigate = useNavigate()
  function handleSignOut() {

    signOut()
    navigate('/')
  }
  return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt={user.name} />
        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}