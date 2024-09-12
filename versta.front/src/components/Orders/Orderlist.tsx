import React, {useEffect, useState} from 'react';
import {
    Grid,
    Grid2, Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Configuration, OrderApi, OrderViewModel} from "../../api";
import {useNavigate} from "react-router-dom";

const OrderList: React.FC = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<OrderViewModel[]>([])
    
    useEffect(() => {
        getOrdersInfo()
    }, []);
    
    const getOrdersInfo = async () => {
        const orderApi = new OrderApi(new Configuration({
            basePath: "http://localhost:5186"
        }))
        
        setOrders(await orderApi.apiOrderGet());
    }
    
    const handleOrderClick = (id: number) => {
        navigate(`/orders/${id}`)
    }
    
    return (
        <Grid2 container justifyContent='center' alignItems='center' direction='column' sx={{width: '100%'}} style={{padding: '10px'}}>
            <Grid2 sx={{width: '80%'}} justifyContent='flex-end'>
                <Typography variant='body1'>
                    <Link href="/orders/create">
                        Оформить новый заказ
                    </Link>
                </Typography>
            </Grid2>
            <Paper sx={{width: '80%'}} style={{padding: '20px', margin: '20px', borderRadius: '6px'}}>
                <Typography variant='h6' style={{ marginBottom: '15px', textAlign: 'center'}}>
                    Заказы
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Номер заказа</TableCell>
                                <TableCell>Город отправителя</TableCell>
                                <TableCell>Город получателя</TableCell>
                                <TableCell>Вес груза</TableCell>
                                <TableCell>Дата забора</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} hover onClick={() => handleOrderClick(order.id!)} style={{cursor: 'pointer'}}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.senderCity}</TableCell>
                                    <TableCell>{order.receiverCity}</TableCell>
                                    <TableCell>{order.weightCargo}</TableCell>
                                    <TableCell>{new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium'}).format(new Date(order.dateOfCargoPickup!))}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid2>
)
}

export default OrderList;