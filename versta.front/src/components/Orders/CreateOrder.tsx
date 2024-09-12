import React, {useEffect} from 'react';
import { useState } from 'react';
import {Alert, Box, Grid2, Paper, Snackbar, TextField, Typography} from "@mui/material";
import 'react-dadata/dist/react-dadata.css';
import {AddressSuggestions, DaDataAddress, DaDataSuggestion} from 'react-dadata';
import Button from '@mui/material/Button';
import {AddressApi, Configuration, DadataParams, OrderApi} from "../../api";

type dadataSuggestion = DaDataSuggestion<DaDataAddress> | undefined;

interface ICreateOrderState {
    senderCity: dadataSuggestion;
    senderAddress: dadataSuggestion;
    receiverCity: dadataSuggestion;
    receiverAddress: dadataSuggestion;
    weightCargo: string;
    dateOfCargoPickup: Date;
}

interface ISuggestionProps {
    label: string;
    filterToBound: 'city' | 'settlement' | 'street' | 'house';
    filterFromBound: 'city' | 'settlement' | 'street' | 'house';
    side: 'sender' | 'receiver';
    value : dadataSuggestion;
    expression?: (suggestion?: dadataSuggestion) => void;
}

const CreateOrder: React.FC = () => {
    const today = new Date();
    const [apiToken, setApiToken] = useState<string>("");
    
    const defaultOrder : ICreateOrderState = {
        senderCity: undefined,
        senderAddress: undefined,
        receiverCity: undefined,
        receiverAddress: undefined,
        weightCargo: "",
        dateOfCargoPickup: today
    }
    
    const [order, setOrder] = useState<ICreateOrderState>(defaultOrder)
    const [errorDate, setErrorDate] = useState(false);
    const [errorWeight, setErrorWeight] = useState(false);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        getDadataInfo();
    }, [])
    
    
    const getDadataInfo = async () => {
        const addressApi = new AddressApi(new Configuration({
            basePath: "http://localhost:5186"
        }));

        const params : DadataParams = await addressApi.apiAddressGetDaDataParamsGet();
        setApiToken(params.apiToken!);
    }
    
    // TODO: refactoring
    const suggestion = (props : ISuggestionProps) => {
        return (
            <Box sx={{width: 250}}>
                {<AddressSuggestions
                        token={apiToken}
                        value={props.value ? props.value : (props.side == 'sender' ? order.senderCity : order.receiverCity)}
                        onChange={props.expression}
                        filterFromBound={props.filterFromBound}
                        filterToBound={props.filterToBound}
                        selectOnBlur={true}
                        inputProps={{
                            placeholder: props.label,
                            style: {height: 50}
                        }}
                    />}
            </Box>
        )
    }
    
    const handleButtonClick = async () => {
        const orderApi = new OrderApi(new Configuration({
            basePath: "http://localhost:5186"
        })) 
        
        await orderApi.apiOrderCreatePost({
            senderCity: order.senderCity?.value,
            senderAddress: order.senderAddress?.value,
            receiverCity: order.receiverCity?.value,
            receiverAddress: order.receiverAddress?.value,
            weightCargo: Number.parseFloat(order.weightCargo),
            dateOfCargoPickup: order.dateOfCargoPickup
        })
        
        setOpen(true)
        setOrder(defaultOrder)
    }
    
    const checkCityEquality = (first: dadataSuggestion, second: dadataSuggestion) => {
        if (!first || !second) {
            return false
        }
        
        return first.data.city == second.data.city;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    
    return (
        <Paper elevation={3} style={{padding: '20px', margin: '20px', borderRadius: '6px', maxWidth: '350px'}}>
            <Typography variant='h5' style={{ marginBottom: '20px', textAlign: 'center'}}>
                Оформить новый заказ
            </Typography>
            <Snackbar open={open} autoHideDuration={5000} onClose={_ => setOpen(false)}>
                <Alert>
                    {"Сохранение завершилось успешно"}
                </Alert>
            </Snackbar>
            <Grid2 container spacing={2} direction="column">
                <Grid2>
                    {suggestion({
                        label: 'Город отправителя',
                        filterToBound: 'city',
                        filterFromBound: 'city',
                        side: 'sender',
                        value: order.senderCity,
                        expression: suggestion => {
                            setOrder(prevState => ({...prevState, senderCity: suggestion, senderAddress: suggestion}))
                        }
                    })}
                </Grid2>
                <Grid2 >
                    {suggestion({
                        label: 'Адрес отправителя',
                        filterToBound: 'house',
                        filterFromBound: 'street',
                        side: 'sender',
                        value: order.senderAddress,
                        expression: suggestion => {
                            setOrder(prevState => ({...prevState, senderAddress: suggestion}))
                        }
                    })}
                </Grid2>
                <Grid2>
                    {suggestion({
                        label: 'Город получателя',
                        filterToBound: 'city',
                        filterFromBound: 'city',
                        side: 'receiver',
                        value: order.receiverCity,
                        expression: suggestion => {
                            setOrder(prevState => ({...prevState, receiverCity: suggestion, receiverAddress: suggestion}))
                        }
                    })}
                </Grid2>
                <Grid2 >
                    {suggestion({
                        label: 'Адрес получателя',
                        filterToBound: 'house',
                        filterFromBound: 'street',
                        side: 'receiver',
                        value: order.receiverAddress,
                        expression: suggestion => {
                            setOrder(prevState => ({...prevState, receiverAddress: suggestion}))
                        }
                    })}
                </Grid2>
                <Grid2>
                    <TextField
                        required
                        label="Вес груза"
                        type='number'
                        value={order.weightCargo}
                        inputProps={{
                            min: 0,
                            step: 0.1
                        }}
                        onBlur={() => {
                            const number = parseFloat(order.weightCargo);
                            if (isNaN(number) || number <= 0) {
                                setOrder((prevState) => ({
                                    ...prevState,
                                    weightCargo: ""
                                }))
                                setErrorWeight(true);
                            } else { setErrorWeight(false) }
                            
                        }}
                        onChange={(e) => {
                            setOrder((prevState) => ({
                                ...prevState,
                                weightCargo: e.target.value
                            }))
                        }}
                        error={errorWeight}
                        helperText={errorWeight ? 'Некорректный вес груза' : ''}
                        
                    />
                </Grid2>
                <Grid2 container direction='row' justifyContent='space-between' alignItems='center'>
                    <TextField
                        label="Дата забора груза"
                        type="date"
                        value={new Date(order.dateOfCargoPickup).toISOString().split('T')[0]}
                        variant='outlined'
                        onChange={(e) => {
                            setOrder(prevState => ({
                                ...prevState,
                                dateOfCargoPickup: (datePattern.test(e.target.value) ? new Date(e.target.value) : today)
                            }))
                        }}
                        onBlur={() => {
                                const selectedDate = new Date(order.dateOfCargoPickup);
                                if (selectedDate.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
                                    setErrorDate(true)
                                    setOrder(prevState => ({
                                        ...prevState,
                                        dateOfCargoPickup: today
                                    }))
                                } else { setErrorDate(false)}
                        }}
                        error={errorDate}
                        helperText={errorDate ? 'Дата не может быть меньше текущей' : ''}
                        inputProps={{
                            min: new Date(Date.now()).toISOString().split('T')[0]
                        }}
                    />
                    <Button variant='contained'
                            disabled={errorWeight || errorDate || 
                                [order.senderAddress, order.senderCity, order.receiverAddress, order.receiverCity].some(v => v == undefined) ||
                                order.weightCargo == '' ||
                                !checkCityEquality(order.senderCity, order.senderAddress) ||
                                !checkCityEquality(order.receiverCity, order.receiverAddress)
                            }
                            onClick={handleButtonClick}
                    >
                        Готово
                    </Button>
                </Grid2>
            </Grid2>
        </Paper>
    )
}

export default CreateOrder;