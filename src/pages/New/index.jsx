import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { Container, Form } from './styles'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Input } from '../../components/InputText'
import { Textarea } from '../../components/Textarea'
import { Section } from '../../components/Section'
import { NoteItem } from '../../components/NoteItem'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'

export function New() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState('')
  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink])
    setNewLink('')
  }
  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted))
  }
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  function handleAddTag() {
    setTags(prevState => [...prevState, newTag])
    setNewTag('')
  }
  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }
  function handleBack() {
    navigate(-1)
  }

  async function handleNewNote() {
    if (!title || !description) {
      return toast.warning('titulo ou observação ainda não preenchido !')
    }
    if (newTag || newLink) {
      return toast.warning('você deixou uma tag ou link no campo para adicionar, mas não clicou em adicionar !')
    }
    await api.post('/notes', {
      title,
      description,
      tags,
      links
    }).then((response) => {
      toast.success('nota criada com sucesso !')
      console.log(response)
      setTimeout(() => {
        handleBack()
      }, 1000)
    })
  }
  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title='voltar' onClick={handleBack} />
          </header>
          <Input placeholder="Título" onChange={e => setTitle(e.target.value)}></Input>
          <Textarea placeholder="Observações" onChange={e => setDescription(e.target.value)} />
          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem key={String(index)} value={link} onClick={() => { handleRemoveLink(link) }} />

              ))
            }
            <NoteItem isNew placeholder="Adcionar novo link" value={newLink} onChange={e => setNewLink(e.target.value)} onClick={handleAddLink} />
          </Section>
          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem key={String(index)} value={tag} onClick={() => { handleRemoveTag(tag) }} />
                ))
              }
              <NoteItem isNew placeholder="Nova tag" value={newTag} onChange={e => setNewTag(e.target.value)} onClick={handleAddTag} />
            </div>
          </Section>
          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
      <Toaster position="top-center" richColors toastOptions={{ style: { padding: '20px', } }} />
    </Container>
  )
}