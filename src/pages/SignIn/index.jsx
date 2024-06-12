
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import { Container, Form, Background } from './styles'
import { useAuth } from '../../hooks/auth'
import { Input } from '../../components/InputText'
import { Button } from '../../components/Button'
import { Toaster } from 'sonner'
// import { MessageAlert } from '../../components/MessageAlert'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [messageAlert, setMessageAlert] = useState(false)
  const { signIn } = useAuth()
  function handleSingnIn() {
    signIn({ email, password })
  }
  return (
    <Container>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salver e gerenciar seus links úteis.</p>
        <h2>Faça seu login</h2>
        <Input placeholder="E-mail" type="text" icon={FiMail} onChange={e => setEmail(e.target.value)}></Input>
        <Input placeholder="Senha" type="password" autoComplete="on" icon={FiLock} onChange={e => setPassword(e.target.value)}></Input>
        <Button title="Entrar" onClick={handleSingnIn}></Button>

        <Link to="/register">Criar conta</Link>
      </Form>
      <Background></Background>
      <Toaster position="top-center" richColors toastOptions={{ style: { padding: '20px', } }} />
    </Container>
  )
}