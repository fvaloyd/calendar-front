import { useCalendarStore, useUiStore } from '../../hooks'

export const FabDelete = () => {
  const { deleteEvent, hasEventSelected, activeEvent } = useCalendarStore()
  const { isDateModalOpen } = useUiStore()

  const handleDelete = () => {
    deleteEvent()
  }

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{
        display:
          hasEventSelected && !isDateModalOpen && !!activeEvent._id
            ? ''
            : 'none',
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
