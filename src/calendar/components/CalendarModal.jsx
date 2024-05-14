import { addHours, differenceInSeconds } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'
import ReactDatePicker,{ registerLocale }  from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useCalendarStore, useUiStore } from '../../hooks/';


registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const {activeEvent, starSavigEvent} = useCalendarStore()

    const {isDateModalOpen, closeDateModal} = useUiStore();

    const [formSubmitted, setformSubmitted] = useState(false)

    const [formValue, setformValue] = useState({
        title: 'Luis',
        notes: 'Herrera',
        start: new Date(),
        end:   addHours( new Date(), 1),
    })

    const titleClass = useMemo(() => {

        if(!formSubmitted)return '';

        return (formValue.title.length > 0)
                ? ''
                :'is-invalid'

    }, [formValue.title, formSubmitted])

    useEffect(() => {
        if( activeEvent !==null){
            setformValue({...activeEvent});
        }
    
    
    }, [activeEvent])
    

    const onImputChange = ({target}) => {
        setformValue({
            ...formValue,
            [target.name]: target.value,
        })
    }

    const onDateChange = (event, changing) => {
        setformValue({
            ...formValue,
            [changing]: event,
        })
    }

    const onCloseModal = () => {
        return closeDateModal();
    }

    const onSubmit = async (e)=> {
        e.preventDefault();
        setformSubmitted(true)
        const difference = differenceInSeconds(formValue.end, formValue.start)
        if( isNaN(difference) || difference <= 0){
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return; 
        }
        if (formValue.title.length <= 0) return;

        await starSavigEvent(formValue);
        closeDateModal();
        setformSubmitted(false)
    }
    

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1>Nuevo evento</h1>
            <hr />
            <form onSubmit={onSubmit} className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio </label>
                    <ReactDatePicker 
                        selected={formValue.start}
                        onChange={(event)=>onDateChange(event, 'start')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <ReactDatePicker
                        minDate={formValue.start}
                        selected={formValue.end}
                        onChange={(event)=>onDateChange(event, 'end')}
                        className="form-control"
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValue.title}
                        onChange={onImputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValue.notes}
                        onChange={onImputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
