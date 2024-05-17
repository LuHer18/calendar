import { useCalendarStore } from '../../hooks'

export const FabDelete = () => {
    const {starDeletingEvent, hasActiveEvent} = useCalendarStore();
    const handleDelete = () => {
        starDeletingEvent();

    }

    return (
        <button 
            aria-label='btn-delete'
            onClick={handleDelete} 
            className='btn btn-danger fab-danger'
            style={{display: hasActiveEvent? '': 'none' }}
        >
            <i className='fas fa-trash-alt'></i>
        </button>
    )
}
