'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedCurrency: 'TSh', // 'TSh' or 'Fbu'
    symbol: 'TSh ',
    rate: 1, // 1 TSh = 1 TSh, 1 TSh = 1.15 Fbu
    available: ['TSh', 'Fbu']
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            const code = action.payload === 'Fbu' ? 'Fbu' : 'TSh';
            state.selectedCurrency = code;
            state.symbol = code === 'Fbu' ? 'Fbu ' : 'TSh ';
            state.rate = code === 'Fbu' ? 1.15 : 1;
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('doudy_currency', code);
                } catch (e) {}
            }
        },
    }
})

export const { setCurrency } = currencySlice.actions
export default currencySlice.reducer
