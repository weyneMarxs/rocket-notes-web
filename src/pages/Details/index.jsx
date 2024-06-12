import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Links, Content } from './styles'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'
import { Button } from '../../components/Button'
import { api } from '../../services/api'

export function Details() {
  const params = useParams()
  const navigation = useNavigate()
  const [data, setData] = useState(null)

  async function handleRemove() {
    const confirm = window.confirm('deseja realmente remover a nota?')
    if (confirm) {
      await api.delete(`/notes/${params.id}`).then((response) => {
        toast.success('Nota deletada com sucesso !')
        setTimeout(() => {
          navigation('/')
        }, 1000)
      })
    }
  }

  function handleBack() {
    navigation(-1)
  }
  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      if (response.status === 201) {
        toast.warning(response.data)
        setTimeout(() => {
          handleBack()
        }, 1000)
      } else {
        setData(response.data)
      }
    }

    fetchNote()
  }, [])
  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <ButtonText title="Excluir Nota" onClick={handleRemove} />
            <h1>{data.title}</h1>
            <p>{data.description}</p>

            {
              data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}><a href={link.url} target='_blank'>{link.url}</a></li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag key={String(tag.id)} title={tag.name}></Tag>
                  ))
                }
              </Section>
            }
            <Button onClick={handleBack} title='voltar' />
          </Content>
        </main>
      }
      <Toaster position="top-center" richColors toastOptions={{ style: { padding: '20px', } }} />
    </Container>

  )
}