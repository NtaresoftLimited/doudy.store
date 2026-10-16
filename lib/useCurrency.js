'use client'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrency } from './features/currency/currencySlice';
import { useEffect } from 'react';

export function useCurrency() {
    const dispatch = useDispatch();
    const currencyState = useSelector(state => state.currency);

    const selectedCurrency = currencyState?.selectedCurrency || 'TSh';
    const symbol = currencyState?.symbol || 'TSh ';
    const rate = currencyState?.rate || 1;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('doudy_currency');
            if (saved && (saved === 'TSh' || saved === 'Fbu') && saved !== selectedCurrency) {
                dispatch(setCurrency(saved));
            }
        }
    }, [dispatch, selectedCurrency]);

    const formatPrice = (amount) => {
        if (amount === undefined || amount === null || isNaN(amount)) return `${symbol}0`;
        const converted = Math.round(Number(amount) * rate);
        return `${symbol}${converted.toLocaleString()}`;
    };

    const convertPrice = (amount) => {
        if (amount === undefined || amount === null || isNaN(amount)) return 0;
        return Math.round(Number(amount) * rate);
    };

    const changeCurrency = (code) => {
        dispatch(setCurrency(code));
    };

    return {
        selectedCurrency,
        currency: symbol,
        symbol,
        rate,
        formatPrice,
        convertPrice,
        changeCurrency,
    };
}
