import { Container } from './styles.js'
import { FiPlus, FiX } from 'react-icons/fi'

export function NoteItem({ isNew, value, onClick, ...rest }) {
  return (
    <Container $isnew={isNew}>
      <input type="text" value={value} readOnly={!isNew} {...rest} />
      <button type="button" onClick={onClick}> {isNew ? <FiPlus /> : < FiX />}</button>
    </Container>
  )
}