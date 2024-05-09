import React, { useState } from 'react'
import { Button, Modal as AntModal, Input, InputNumber } from 'antd';
import { useAppDispatch } from '../../store/store';
import { createMarker } from '../../store/slices/markersSlice';

interface IModalProps {
    showModal: boolean
    onModalClose: () => void
}

const Modal = (props: IModalProps) => {
    const { showModal, onModalClose } = props
    const [name, setName] = useState('')
    // Широта
    const [latitude, setLatitude] = useState<number | null>(null)
    // Долгота
    const [longitude, setLongitude] = useState<number | null>(null)

    const dispatch = useAppDispatch()

    const addButton = () => {
        const handleAddPoint = () => {
            if (name && latitude && longitude && (latitude > 0 && latitude < 90) && (longitude > 0 && longitude < 180)) {
                dispatch(createMarker({ name, coordinates: [longitude, latitude] }))
            }
            onModalClose()
        }

        return <Button type='primary' onClick={handleAddPoint}>Добавить</Button>
    }
    return (
        <AntModal title="Добавление новой точки" open={showModal} onCancel={onModalClose} footer={addButton}>
            <p>Название точки</p>
            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Название" />
            <p>Широта</p>
            <InputNumber type='number' value={latitude} onChange={(value) => setLatitude(value)} placeholder="Широта" />
            <p>Долгота</p>
            <InputNumber type='number' value={longitude} onChange={(value) => setLongitude(value)} placeholder="Долгота" />
        </AntModal>
    )
}

export default Modal