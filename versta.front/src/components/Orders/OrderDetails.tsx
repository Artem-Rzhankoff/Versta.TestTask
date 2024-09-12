import React, {useEffect, useState} from 'react';
import {Configuration, OrderApi, OrderViewModel} from "../../api";
import {useParams} from "react-router-dom";
import {Grid2, Paper, Typography} from "@mui/material";

function Pa() {
    return null;
}

const OrderDetails: React.FC = () => {
    const [order, setOrder] = useState<OrderViewModel>()
    const [isLoaded, setIsLoaded] = useState(false);
    const { orderId } = useParams()

    useEffect(() => {
        getOrderData()
    }, []);
    
    const getOrderData = async () => {
        const orderApi = new OrderApi(new Configuration({
            basePath: "http://localhost:5186"
        }))
        
        const response = await orderApi.apiOrderCourseIdGet(Number.parseInt(orderId!));
        setOrder(response)
        setIsLoaded(true)
    }
    
    const formatData = (date: Date) => {
        return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium'}).format(new Date(date))
    }
    
    const removeCity = (address: string) => {
        return address.replace(/^[^,]+,\s*/, '');
    }
    
    return (
        <Grid2 container justifyContent='center' alignItems='center' direction='column' sx={{width: '100%'}} style={{padding: '10px'}}>
            <Typography variant='h6' style={{ marginBottom: '10px', textAlign: 'center'}}>
                {`Заказ №${orderId}`}
            </Typography>
            {isLoaded && (
                <Paper sx={{width: '80%'}} style={{padding: '20px', margin: '20px', borderRadius: '6px'}}>
                    <Typography variant='h6'>Информация об отправителе</Typography>
                    <Typography variant='body1' sx={{marginBottom: 1}}><strong>Город:</strong> {order?.senderCity}</Typography>
                    <Typography variant='body1' sx={{marginBottom: 1}}><strong>Адрес:</strong> {removeCity(order?.senderAddress!)}</Typography>
                    <Typography variant='h6'>Информация о получателе</Typography>
                    <Typography variant='body1' sx={{marginBottom: 1}}><strong>Город:</strong> {order?.receiverCity}</Typography>
                    <Typography variant='body1' sx={{marginBottom: 1}}><strong>Адрес:</strong> {removeCity(order?.receiverAddress!)}</Typography>
                    <Typography variant='h6'>Прочее</Typography>
                    <Typography variant='body1' sx={{marginBottom: 1}}><strong>Вес:</strong> {order?.weightCargo}</Typography>
                    <Typography variant='body1' sx={{marginBottom: 1}}><strong>Дата забора:</strong> {formatData(order?.dateOfCargoPickup!)}</Typography>
                </Paper>)}
        </Grid2>
    );
}

export default OrderDetails;